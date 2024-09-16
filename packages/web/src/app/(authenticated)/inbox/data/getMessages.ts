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

    const url = 'http://localhost:8000/messages';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify(transformedData),
    });

    // console.log(await response.json());

    if (response.ok) {
      const responseData = await response.json() as Message[];
      for (const item of responseData) {
        messages.push({
          id: item.id,
          app: item.app,
          sender_image: item.sender_image,
          sender_name: item.sender_name,
          content: item.content,
          message_link: item.message_link,
          sentiment: data.find(d => d.id === item.id)?.sentiment ?? '',
          priority: (data.find(d => d.id === item.id)?.priority as 1 | 2 | 3 | 4 | 5) ?? 1,
          send_at: item.send_at,
        });
      }
    } else {
      console.error('Failed to fetch messages from backend:', response.statusText);
    }
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
      messages.push(...dummyMessages);
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
