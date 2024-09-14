'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const getToken = async () => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('github_settings')
    .select('encrypt_pat_token')
    .eq('user_id', user.id)
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('error', error);
    }
    return;
  }

  //TODO: トークンを復号化
  const token = data?.encrypt_pat_token;

  return token;
};
