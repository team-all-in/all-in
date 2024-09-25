'use server';

import type { Message } from '~/libs/types/message';
import { API_URL, header } from './configs';
import type { GitHubNotificationsResponse } from './types';
import { convertGitHubApiUrlToWebUrl, getToken } from './utils';

export const fetchGitHubNotifications = async (
  startDate: string,
): Promise<Message[] | undefined> => {
  // DBからトークン取得
  const token = await getToken();

  try {
    const params = new URLSearchParams({
      all: 'false',
      since: new Date(startDate).toISOString(),
      before: new Date().toISOString(),
      per_page: '50',
    });

    const response = await fetch(`${API_URL}?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        ...header,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const notifications = (await response.json()) as GitHubNotificationsResponse;

    // 通知をメッセージに変換
    const messages: Message[] = await Promise.all(
      notifications.map(async notification => ({
        id: notification.id,
        app: 'github',
        sender_image: notification.repository.owner.avatar_url,
        sender_name: notification.repository.full_name,
        content: `${notification.subject.type}: ${notification.subject.title}`,
        message_link: await convertGitHubApiUrlToWebUrl(notification.subject.url),
        send_at: notification.updated_at,
        server_image: '',
        server_name: '',
        channel_name: '',
      })),
    );

    return messages;
  } catch (error) {
    console.error('Error fetching GitHub notifications:', error);
    return [];
  }
};
