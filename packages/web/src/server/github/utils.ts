'use server';

import { decryptToken } from '~/libs/encryptions/token';
import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const getToken = async () => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  // DBから暗号化されたトークン取得
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

  if (!data || !data?.encrypt_pat_token) {
    console.error('data not found');
    return;
  }

  // トークンを復号化
  const token = decryptToken(data?.encrypt_pat_token);

  return token;
};

export const convertGitHubApiUrlToWebUrl = (apiUrl: string): string => {
  const url = new URL(apiUrl);

  url.hostname = 'github.com';

  const pathParts = url.pathname.split('/').filter(part => part !== 'repos');

  const pullsIndex = pathParts.indexOf('pulls');
  if (pullsIndex !== -1) {
    pathParts[pullsIndex] = 'pull';
  }

  url.pathname = pathParts.join('/');

  return url.toString();
};
