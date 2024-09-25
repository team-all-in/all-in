'use server';

import { decryptToken } from '~/libs/encryptions/token';
import { createClient } from '~/libs/supabase/server';
import type { Database } from '~/libs/types/database';
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

export async function getStartDate(
  messages: Database['public']['Tables']['messages']['Row'][],
): Promise<string> {
  let earliestMessageDate = new Date(); // 今日の日付
  for (const msg of messages) {
    if (msg.app === 'discord' || msg.app === 'slack') {
      const msgDate = new Date(msg.send_at ?? '');
      if (msgDate < earliestMessageDate) {
        earliestMessageDate = msgDate;
      }
    }
  }

  const todayMinusFive = new Date();
  todayMinusFive.setDate(todayMinusFive.getDate() - 5);

  // 5日前の日付と最も古いメッセージの日付を比較して、より古い日付を取得する。
  const startDate = earliestMessageDate < todayMinusFive ? earliestMessageDate : todayMinusFive;

  return startDate.toISOString();
}
