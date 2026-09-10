// Vercel serverless function. Runs server-side only.
//
// Admin-triggered "change this person's email" from User Management. The
// address on file is never updated here — this only records the requested
// new address (profiles.pending_email) behind a one-time token and emails a
// confirmation link to the NEW address. The actual auth email (and
// profiles.email) only change once that link is opened and verified by
// api/verify-email.js — see that file for why.
//
// Reuses the same SMTP/Resend send pipeline as api/invite-user.js and
// api/reset-password.js.
//
// Required Vercel env vars (server-side only, never VITE_-prefixed):
//   SUPABASE_URL, SUPABASE_SECRET_KEY
//   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM (optional)
//   -- or, as a fallback --
//   RESEND_API_KEY, RESEND_FROM (optional)
import { randomBytes } from 'crypto';
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

  const { userId, newEmail } = req.body || {};
  const email = String(newEmail || '').trim().toLowerCase();
  if (!userId || !email) {
    res.status(400).json({ error: 'userId and newEmail are required.' });
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: 'Enter a valid email address.' });
    return;
  }

  const supabaseAdmin = createClient(url, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: existing } = await supabaseAdmin
    .from('profiles').select('id, email').ilike('email', email).maybeSingle();
  if (existing && existing.id !== userId) {
    res.status(400).json({ error: 'That email is already in use by another account.' });
    return;
  }

  const { data: target, error: targetErr } = await supabaseAdmin
    .from('profiles').select('id, full_name, email').eq('id', userId).single();
  if (targetErr || !target) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }
  if (target.email && target.email.toLowerCase() === email) {
    res.status(400).json({ error: 'That is already this person’s current email.' });
    return;
  }

  const token = randomBytes(32).toString('hex');
  const { error: updateErr } = await supabaseAdmin.from('profiles').update({
    pending_email: email,
    pending_email_token: token,
    pending_email_requested_at: new Date().toISOString(),
  }).eq('id', userId);
  if (updateErr) {
    res.status(400).json({ error: updateErr.message });
    return;
  }

  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const actionLink = `${proto}://${host}/verify-email?uid=${encodeURIComponent(userId)}&token=${token}`;

  const subject = 'Confirm your new Beetloop email address';
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px">
      <h2 style="color:#7A1C46;margin:0 0 12px">Confirm your new email</h2>
      <p>${target.full_name || 'Hi'}, an admin requested that your Beetloop account email be changed to this address.</p>
      <p>Click below to confirm — your sign-in email won't change until you do:</p>
      <p style="margin:24px 0">
        <a href="${actionLink}" style="background:#7A1C46;color:#fff;padding:12px 24px;border-radius:10px;text-decoration:none;font-weight:600">Confirm new email</a>
      </p>
      <p style="color:#888;font-size:13px">If the button doesn't work, copy this link: ${actionLink}</p>
      <p style="color:#888;font-size:13px">If you weren't expecting this, you can ignore this email — nothing changes until it's confirmed.</p>
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
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await transporter.sendMail({ from: process.env.SMTP_FROM || smtpUser, to: email, subject, html });
        res.status(200).json({ ok: true, emailSent: true, via: 'smtp' });
        return;
      } catch (err) {
        mailErr = err;
        if (attempt < 2) await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
      }
    }
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      res.status(200).json({ ok: true, emailSent: false, mailError: mailErr.message, actionLink, via: 'smtp' });
      return;
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
