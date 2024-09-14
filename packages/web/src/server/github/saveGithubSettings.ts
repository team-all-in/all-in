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
  
  const crypto = require('node:crypto');
  const cipher = crypto.createCipher('aes-256-cbc', 'allinpassword');
  const crypted = cipher.update(pat_token, 'utf-8', 'hex');
  const encrypt_pat_token = crypted + cipher.final('hex');

  console.log(encrypt_pat_token);

  const supabase = createClient();
  const { data: github_settings, error: github_settings_error } = await supabase
    .from('github_settings')
    .select('*')
    .eq('user_id', user.id);
  if (github_settings_error) {
    console.error('Error fetching from Supabase:', github_settings_error);
    return;
  }
  // 既に登録されている場合は更新
  if (github_settings.length > 0) {
    const { data, error } = await supabase
      .from('github_settings')
      .update({ encrypt_pat_token: encrypt_pat_token })
      .eq('user_id', user.id);
    if (error) {
      console.error('Error updating to Supabase:', error);
    } else {
      console.log('Token updated to Supabase:', data);
    }
    return;
  }
  // 新規登録
  const { data, error } = await supabase
    .from('github_settings')
    .insert([{ user_id: user.id, encrypt_pat_token: encrypt_pat_token }]);

  if (error) {
    console.error('Error saving to Supabase:', error);
  } else {
    console.log('Token saved to Supabase:', data);
  }

  return;
};
