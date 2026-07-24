// TEMPORARY diagnostic endpoint — reveals only lengths and first/last
// characters of SMTP env vars (never the full secret), to check exactly
// what Vercel has stored without exposing it. Delete this file once done.
export default async function handler(req, res) {
  const describe = (v) => {
    if (v == null) return { present: false };
    return {
      present: true,
      length: v.length,
      first2: v.slice(0, 2),
      last2: v.slice(-2),
      hasLeadingSpace: v.startsWith(' '),
      hasTrailingSpace: v.endsWith(' '),
      hasNewline: /[\r\n]/.test(v),
    };
  };
  res.status(200).json({
    SMTP_HOST: describe(process.env.SMTP_HOST),
    SMTP_PORT: describe(process.env.SMTP_PORT),
    SMTP_USER: describe(process.env.SMTP_USER),
    SMTP_PASS: describe(process.env.SMTP_PASS),
    SMTP_FROM: describe(process.env.SMTP_FROM),
  });
}
