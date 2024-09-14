'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const saveGithubSettings = async (pat_token: string) => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  const crypto = require('node:crypto');
  const key = Buffer.from(process.env.KEY || '', 'hex');
  const iv = Buffer.from(process.env.IV || '', 'hex');
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypt_pat_token = cipher.update(pat_token, 'utf8', 'hex');
  encrypt_pat_token += cipher.final('hex');

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
