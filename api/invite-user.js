// Vercel serverless function. Runs server-side only.
//
// Supabase's own /auth/v1/invite endpoint (used by supabase-js's
// inviteUserByEmail) currently rejects this project's new-format secret key
// with a JWT validation error ("unrecognized JWT kid ... ES256"). Generating
// the link via the admin API works fine with the new key format, so we use
// that instead and send the email ourselves.
//
// Email sends via Gmail SMTP if SMTP_* env vars are present (can send to any
// recipient), falling back to Resend's HTTPS API otherwise (only sends to
// the Resend account's own address until a domain is verified there).
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM (optional)
//   -- or, as a fallback --
//   RESEND_API_KEY, RESEND_FROM (optional)
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

  const { email, fullName, roleKey, department, designation, brands, reportingManager, teamLead, sendEmail } = req.body || {};
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

  // Supabase's auth service intermittently fails admin JWT validation with a
  // "kid unrecognized" error (a key-cache race on their side, not ours) —
  // retrying almost always succeeds within one or two attempts.
  let data, error;
  for (let attempt = 0; attempt < 3; attempt++) {
    ({ data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'invite',
      email,
      options: {
        redirectTo,
        data: { full_name: fullName, role_key: role, department: department || null, designation: designation || null,
          brands: Array.isArray(brands) ? brands : [],
          reporting_manager: reportingManager || null, team_lead: teamLead || null },
      },
    }));
    if (!error || !/unrecognized JWT kid/i.test(error.message || '')) break;
    await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
  }

  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }

  const actionLink = data.properties && data.properties.action_link;
  const userId = data.user ? data.user.id : null;

  // sendEmail:false (the default from "Add user", now that adding a user
  // no longer auto-sends an invite) — the account + activation link above
  // are still created either way, just not emailed. A later explicit "Send
  // invitation" click calls this same endpoint again without the flag.
  if (sendEmail === false) {
    res.status(200).json({ ok: true, userId, emailSent: false, actionLink, skipped: true });
    return;
  }

  const subject = 'You’ve been invited to Beetloop';
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#7A1C46;margin:0 0 12px">Welcome to Beetloop</h2>
      <p>${fullName}, you've been invited as <strong>${ROLE_LABELS[role] || role}</strong>${department ? ` in ${department}` : ''}.</p>
      <p>Click below to set your password and activate your account:</p>
      <p style="margin:24px 0">
        <a href="${actionLink}" style="background:#7A1C46;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Activate your account</a>
      </p>
      <p style="color:#888;font-size:13px">If the button doesn't work, copy this link: ${actionLink}</p>
    </div>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const transporter = nodemailer.createTransport({
      host: smtpHost, port: smtpPort, secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    let mailErr;
    // Transient SMTP hiccups (relay timeout, brief auth blip) are common
    // enough that a single failed attempt shouldn't be reported as
    // permanent — retry twice with backoff before falling through to Resend.
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await transporter.sendMail({ from: process.env.SMTP_FROM || smtpUser, to: email, subject, html });
        res.status(200).json({ ok: true, userId, emailSent: true, via: 'smtp' });
        return;
      } catch (err) {
        mailErr = err;
        if (attempt < 2) await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
      }
    }
    // Fall through to Resend if SMTP failed on every attempt.
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      res.status(200).json({ ok: true, userId, emailSent: false, mailError: mailErr.message, actionLink, via: 'smtp' });
      return;
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    res.status(200).json({
      ok: true, userId, emailSent: false, actionLink,
      missingEnvVars: { SMTP_or_RESEND: true },
    });
    return;
  }

  try {
    const resendResp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.RESEND_FROM || 'Beetloop Marketing Module <onboarding@resend.dev>', to: [email], subject, html }),
    });
    const resendBody = await resendResp.json();
    if (!resendResp.ok) {
      res.status(200).json({ ok: true, userId, emailSent: false, mailError: resendBody.message || JSON.stringify(resendBody), actionLink, via: 'resend' });
      return;
    }
    res.status(200).json({ ok: true, userId, emailSent: true, resendId: resendBody.id, via: 'resend' });
  } catch (mailErr) {
    res.status(200).json({ ok: true, userId, emailSent: false, mailError: mailErr.message, actionLink, via: 'resend' });
  }
}
