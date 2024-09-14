'use server';

import { createClient } from '~/libs/supabase/server';
import type { Message } from '~/libs/types/message';
import { getUser } from '../auth/data';
import type { GitHubNotificationsResponse } from './types';

export const getGitHubNotifications = async (startDate: string): Promise<Message[] | undefined> => {
  // DBからトークン取得
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

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

  //TODO: トークンを復号化
  const token = data.encrypt_pat_token;

  // GitHub APIで通知取得
  const baseDate = new Date(startDate);
  const fiveDaysLater = new Date(baseDate.getTime() + 5 * 24 * 60 * 60 * 1000);

  try {
    const params = new URLSearchParams({
      all: 'true',
      since: baseDate.toISOString(),
      before: fiveDaysLater.toISOString(),
      per_page: '30',
    });

    const response = await fetch(`https://api.github.com/notifications?${params}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const notifications = (await response.json()) as GitHubNotificationsResponse;

    const messages: Message[] = notifications.map(notification => ({
      id: notification.id,
      app: 'github',
      sender_image: notification.repository.owner.avatar_url,
      sender_name: notification.repository.full_name,
      content: `${notification.subject.type}: ${notification.subject.title}`,
      message_link: notification.subject.url,
      send_at: notification.updated_at,
    }));

    return messages;
  } catch (error) {
    console.error('Error fetching GitHub notifications:', error);
    return [];
  }
};
