'use server';

import type { Message } from '~/libs/types/message';

export const getGitHubNotifications = async (): Promise<Message[] | undefined> => {
  console.log('getGitHubNotifications');

  return [];
};
