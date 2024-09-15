'use server';

import { encryptToken } from '~/libs/encryptions/token';
import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const saveGithubSettings = async (pat_token: string) => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  const encrypt_pat_token = encryptToken(pat_token);

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
    const { error } = await supabase
      .from('github_settings')
      .update({ encrypt_pat_token: encrypt_pat_token })
      .eq('user_id', user.id);
    if (error) {
      console.error('Error updating to Supabase:', error);
      throw error;
    }
    return;
  }
  // 新規登録
  const { error } = await supabase
    .from('github_settings')
    .insert([{ user_id: user.id, encrypt_pat_token: encrypt_pat_token }]);

  if (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  }

  return;
};
