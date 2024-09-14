'use server';

import { createClient } from '~/libs/supabase/server';

export const getUser = async () => {
  const supabase = createClient();

  const getUserRes = await supabase.auth.getUser();

  if (getUserRes.error) {
    return null;
  }

  const data = getUserRes.data;

  return data.user;
};

export const getSession = async () => {
  const supabase = createClient();

  const getSessionRes = await supabase.auth.getSession();

  if (getSessionRes.error) {
    return null;
  }

  const data = getSessionRes.data;

  return data.session;
};
