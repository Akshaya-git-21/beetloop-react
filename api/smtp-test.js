// TEMPORARY diagnostic endpoint — only verifies SMTP login, doesn't send
// anything. Delete once Gmail SMTP setup is confirmed working or abandoned.
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpHost || !smtpUser || !smtpPass) {
    res.status(200).json({
      step: 'env-check',
      ok: false,
      missing: { SMTP_HOST: !smtpHost, SMTP_PORT: !process.env.SMTP_PORT, SMTP_USER: !smtpUser, SMTP_PASS: !smtpPass },
    });
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });
    await transporter.verify();
    res.status(200).json({ step: 'auth-verify', ok: true, message: 'SMTP login succeeded' });
  } catch (err) {
    res.status(200).json({ step: 'auth-verify', ok: false, error: err.message, code: err.code, responseCode: err.responseCode });
  }
}
