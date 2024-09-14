'use server';

import { createClient } from '~/libs/supabase/server';

export const getUser = async () => {
  const supabase = createClient();

  const user = supabase.auth.getUser();

  return user;
};

export const getSession = async () => {
  const supabase = createClient();

  const user = supabase.auth.getSession();

  return user;
};
