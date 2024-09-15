'use server';

import { dummyMessages } from '~/__test__/message/fixutures';
import { createClient } from '~/libs/supabase/server';
import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import { getSession, getUser } from '~/server/auth/data';
import { getGitHubNotifications } from '~/server/github/getNotifications';

export const getMessages = async ({
  filter = 'all',
  offset = 0,
}: {
  filter?: string;
  offset?: number;
} = {}): Promise<Message[] | undefined> => {
  const messages: Message[] = [];

  const LIMIT = 20;

  const user = await getUser();
  if (!user) {
    return;
  }

  // 今日から20件分のDiscord、SlackメッセージIdをSupabaseから取得する。
  const supabase = createClient();

  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('user_id', user.id)
    .range(offset, offset + LIMIT - 1);

  if (error) {
    console.error('error', error);
    return;
  }

  console.log('data', data);

  if (data) {
    const transformedData = transformData(data);

    console.log('transformattedData', transformedData);

    const session = await getSession();
    if (!session?.access_token) {
      return;
    }

    const url = 'https://kctebirgsq.ap-northeast-1.awsapprunner.com/messages';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(transformedData),
    });

    console.log('response', response);
  }

  // console.log('messages', messages);

  // TODO: Discord、SlackメッセージId含めたリクエストをバックエンドに送る。

  // TODO: Discord、Slackメッセージの内容をバックエンドから受け取る。

  // TODO: Discord、Slackメッセージの最遅日の日付を取得する。

  // TODO: 最遅日の日付と今日から+5日の日付を比較して、大きい方の日付から今日までのGitHubの通知を取得する。

  if (filter === 'all' || filter === 'github') {
    const githubMessages = await getGitHubNotifications('2024-09-14T00:00:00Z');

    // TODO: GitHubの通知とDiscord、Slackメッセージの統合する。
    if (githubMessages) {
      messages.push(...githubMessages);
      // messages.push(...dummyMessages);
    }
  }

  return messages;
};

function transformData(data: Database['public']['Tables']['messages']['Row'][]) {
  return data.map(item => ({
    app: item.app,
    server_id: item.server_id,
    message_id: item.message_id,
    channel_id: item.channel_id,
  }));
}
