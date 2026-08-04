// Vercel serverless function. Runs server-side only.
//
// Supabase's built-in supabase.auth.resetPasswordForEmail() sends through
// Supabase's own auth email service (Dashboard -> Authentication -> Emails),
// a completely separate channel from the SMTP/Resend config this project
// already uses for invites (see api/invite-user.js) — and it isn't
// configured, so those emails never arrive. This reuses the same
// generateLink + SMTP/Resend pipeline that invites already send reliably,
// just with type:'recovery' instead of type:'invite'.
//
// Used for both:
//   - self-service "Forgot password?" on the login page
//   - Admin-triggered "Reset password" for another user in User Management
// In both cases the affected user gets an email with a link to set their
// own new password — nobody but that user ever sees or sets it directly,
// which is the safer pattern (matches how the invite flow already works).
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM (optional)
//   -- or, as a fallback --
//   RESEND_API_KEY, RESEND_FROM (optional)
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

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

  const { email } = req.body || {};
  if (!email) {
    res.status(400).json({ error: 'email is required.' });
    return;
  }

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirectTo = `${proto}://${host}/activate`;

  let data, error;
  for (let attempt = 0; attempt < 3; attempt++) {
    ({ data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'recovery',
      email,
      options: { redirectTo },
    }));
    if (!error || !/unrecognized JWT kid/i.test(error.message || '')) break;
    await new Promise(r => setTimeout(r, 400 * (attempt + 1)));
  }

  if (error) {
    // Don't reveal whether the account exists — mirrors Supabase's own
    // resetPasswordForEmail behavior, which never errors on unknown emails.
    if (/user not found/i.test(error.message || '')) {
      res.status(200).json({ ok: true, emailSent: false, unknownAccount: true });
      return;
    }
    res.status(400).json({ error: error.message });
    return;
  }

  const actionLink = data.properties && data.properties.action_link;
  const subject = 'Reset your Beetloop password';
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#7A1C46;margin:0 0 12px">Reset your password</h2>
      <p>We received a request to reset the password on your Beetloop account (${email}).</p>
      <p style="margin:24px 0">
        <a href="${actionLink}" style="background:#7A1C46;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Set a new password</a>
      </p>
      <p style="color:#888;font-size:13px">If the button doesn't work, copy this link: ${actionLink}</p>
      <p style="color:#888;font-size:13px">If you didn't request this, you can safely ignore this email.</p>
    </div>
  `;

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const smtpPort = Number(process.env.SMTP_PORT || 465);
      const transporter = nodemailer.createTransport({
        host: smtpHost, port: smtpPort, secure: smtpPort === 465,
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transporter.sendMail({ from: process.env.SMTP_FROM || smtpUser, to: email, subject, html });
      res.status(200).json({ ok: true, emailSent: true, via: 'smtp' });
      return;
    } catch (mailErr) {
      const resendKey = process.env.RESEND_API_KEY;
      if (!resendKey) {
        res.status(200).json({ ok: true, emailSent: false, mailError: mailErr.message, actionLink, via: 'smtp' });
        return;
      }
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    res.status(200).json({ ok: true, emailSent: false, actionLink, missingEnvVars: { SMTP_or_RESEND: true } });
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
      res.status(200).json({ ok: true, emailSent: false, mailError: resendBody.message || JSON.stringify(resendBody), actionLink, via: 'resend' });
      return;
    }
    res.status(200).json({ ok: true, emailSent: true, resendId: resendBody.id, via: 'resend' });
  } catch (mailErr) {
    res.status(200).json({ ok: true, emailSent: false, mailError: mailErr.message, actionLink, via: 'resend' });
  }
}
