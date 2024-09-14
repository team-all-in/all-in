'use server';

import { dummyMessages } from '~/__test__/message/fixutures';
import type { Message } from '~/libs/types/message';
import { getGitHubNotifications } from '~/server/github/getNotifications';

export const getMessages = async (): Promise<Message[] | undefined> => {
  // console.log('getMessages');

  // TODO: 今日から20件分のDiscord、SlackメッセージIdをSupabaseから取得する。
  const messages = dummyMessages;
  // console.log('messages', messages);

  // TODO: Discord、SlackメッセージId含めたリクエストをバックエンドに送る。

  // TODO: Discord、Slackメッセージの内容をバックエンドから受け取る。

  // TODO: Discord、Slackメッセージの最遅日の日付を取得する。

  // TODO: 最遅日の日付と今日から+5日の日付を比較して、大きい方の日付から今日までのGitHubの通知を取得する。
  const githubMessages = await getGitHubNotifications('2024-09-14T00:00:00Z');
  console.log('githubMessages', githubMessages);

  // TODO: GitHubの通知とDiscord、Slackメッセージの統合する。
  if (!githubMessages) {
    return messages;
  }
  const margeMessages = [...messages, ...githubMessages];

  return margeMessages;
};
