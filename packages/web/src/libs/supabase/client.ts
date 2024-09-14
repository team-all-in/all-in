import { createBrowserClient } from '@supabase/ssr';
import type { Database } from '~/libs/types/database';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL or Anon Key is not defined.');
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}
