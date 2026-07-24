import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const configured = Boolean(url && anonKey);

if (!configured) {
  // eslint-disable-next-line no-console
  console.error(
    'Supabase env vars are missing (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY). ' +
    'Auth and data persistence are disabled; the demo accounts and local-only ' +
    'features still work. Set these in your deploy platform\'s environment variables.'
  );
}

// createClient() throws synchronously if given an empty URL/key, which would
// crash the entire app at import time (blank page, nothing renders at all).
// Fall back to inert placeholder values so the app still boots — real
// Supabase calls will simply fail (caught by each call's own error handling)
// until the real env vars are configured.
export const supabase = createClient(
  url || 'https://placeholder.supabase.co',
  anonKey || 'placeholder-anon-key'
);
export const supabaseConfigured = configured;
