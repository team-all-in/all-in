'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const saveGithubSettings = async (pat_token: string) => {
  console.log('saveGithubSettings');
  console.log('pat_token', pat_token);

  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  // TODO: pat_tokenを暗号化する
  // https://zenn.dev/nixo/articles/14a6ad953ea2db
  const crypto = require('node:crypto');
  const cipher = crypto.createCipher('aes-256-cbc', 'allinpassword');
  const crypted = cipher.update(pat_token, 'utf-8', 'hex');
  const encrypt_pat_token = crypted + cipher.final('hex');

  console.log(encrypt_pat_token);

  const supabase = createClient();
  const { data, error } = await supabase
    .from('github_settings')
    .insert([{ user_id: user.id, encrypt_pat_token: encrypt_pat_token }]);

  if (error) {
    console.error('Error saving to Supabase:', error);
  } else {
    console.log('Token saved to Supabase:', data);
  }

  // TODO: encrypt_pat_tokenをsupabaseに保存する

  return;
};
