// Vercel serverless function. Runs server-side only.
//
// Supabase's own /auth/v1/invite endpoint (used by supabase-js's
// inviteUserByEmail) currently rejects this project's new-format secret key
// with a JWT validation error ("unrecognized JWT kid ... ES256"), and relying
// on Supabase's built-in mailer also means fighting its SMTP config/rate
// limits. Instead: generate the invite link via the admin API (which works
// fine with the new key format) and send the email ourselves over the
// provided Gmail SMTP — full control, no dependency on Supabase's mailer.
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM (optional, defaults to SMTP_USER)
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const ROLE_KEYS = ['admin', 'ceo', 'coo', 'manager', 'team_lead', 'senior', 'junior', 'qc'];
const ROLE_LABELS = {
  admin: 'Admin', ceo: 'CEO', coo: 'COO', manager: 'Manager', team_lead: 'Team Lead',
  senior: 'Senior Executive', junior: 'Junior Executive', qc: 'QC Reviewer',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const url = process.env.SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) {
    res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_SECRET_KEY env vars.' });
    return;
  }

  const { email, fullName, roleKey, department, designation } = req.body || {};
  if (!email || !fullName) {
    res.status(400).json({ error: 'email and fullName are required.' });
    return;
  }
  const role = ROLE_KEYS.includes(roleKey) ? roleKey : 'junior';

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirectTo = `${proto}://${host}/activate`;

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'invite',
    email,
    options: {
      redirectTo,
      data: { full_name: fullName, role_key: role, department: department || null, designation: designation || null },
    },
  });

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  const actionLink = data.properties && data.properties.action_link;
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    // User account is created either way — just flag that the email couldn't be sent.
    res.status(200).json({ ok: true, userId: data.user ? data.user.id : null, emailSent: false, actionLink });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || smtpUser,
      to: email,
      subject: 'You’ve been invited to Beetloop',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
          <h2 style="color:#7A1C46;margin:0 0 12px">Welcome to Beetloop</h2>
          <p>${fullName}, you've been invited as <strong>${ROLE_LABELS[role] || role}</strong>${department ? ` in ${department}` : ''}.</p>
          <p>Click below to set your password and activate your account:</p>
          <p style="margin:24px 0">
            <a href="${actionLink}" style="background:#7A1C46;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Activate your account</a>
          </p>
          <p style="color:#888;font-size:13px">If the button doesn't work, copy this link: ${actionLink}</p>
        </div>
      `,
    });
    res.status(200).json({ ok: true, userId: data.user ? data.user.id : null, emailSent: true });
  } catch (mailErr) {
    res.status(200).json({ ok: true, userId: data.user ? data.user.id : null, emailSent: false, mailError: mailErr.message, actionLink });
  }
}
