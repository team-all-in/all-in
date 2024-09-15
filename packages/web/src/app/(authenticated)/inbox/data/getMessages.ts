'use server';

import { dummyMessages } from '~/__test__/message/fixutures';
import type { Message } from '~/libs/types/message';
import { getGitHubNotifications } from '~/server/github/getNotifications';

export const getMessages = async ({
  filter = 'all',
  offset = 0,
}: {
  filter?: Message['app'] | 'all';
  offset?: number;
} = {}): Promise<Message[] | undefined> => {
  console.log('getMessages');
  console.log('filter', filter);
  console.log('offset', offset);

  const messages: Message[] = [];

  // TODO: 今日から20件分のDiscord、SlackメッセージIdをSupabaseから取得する。
  messages.push(...dummyMessages);
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
    }
  }

  return messages;
};
