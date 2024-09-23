'use server';

import { dummyDatabaseMessages, dummyMessageResponse } from '~/__test__/message/fixutures';
import { createClient } from '~/libs/supabase/server';
import type { Database } from '~/libs/types/database';
import type { Message, MessageResponse } from '~/libs/types/message';
import { getSession, getUser } from '~/server/auth/data';
import { getGitHubNotifications } from '~/server/github/getNotifications';

export const getMessages = async ({
  filter = 'all',
  offset = 0,
}: {
  filter?: string;
  offset?: number;
} = {}): Promise<Message[] | undefined> => {
  try {
    const LIMIT = 20;
    const isDummy = process.env.IS_DUMMY?.toLowerCase() === 'true';

    const user = await getUser();
    if (!user) {
      return;
    }

    const databaseMessages: Database['public']['Tables']['messages']['Row'][] = [];
    if (!isDummy) {
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

      if (data) {
        databaseMessages.push(...data);
      }
    } else {
      databaseMessages.push(...dummyDatabaseMessages);
    }

    const responseMessages: MessageResponse[] = [];
    if (databaseMessages) {
      const transformedData = transformData(databaseMessages);

      if (!isDummy) {
        const session = await getSession();
        if (!session?.access_token) {
          return;
        }

        const url = 'https://kctebirgsq.ap-northeast-1.awsapprunner.com/messages';

        // Discord、SlackメッセージId含めたリクエストをバックエンドに送る。
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify(transformedData),
        });

        if (response.ok) {
          const data = await response.json();
          responseMessages.push(...data);
        } else {
          console.error('Failed to fetch messages from backend:', response.statusText);
        }
      } else {
        responseMessages.push(...dummyMessageResponse);
      }
    }

    // Databaseから取得したメッセージとバックエンドから取得したメッセージを統合する。
    const messages: Message[] = databaseMessages.map((dbMessage): Message => {
      const responseMessage = responseMessages.find(msg => msg.id === dbMessage.message_id);

      if (responseMessage) {
        return {
          ...responseMessage,
          send_at: dbMessage.created_at ?? '',
          message_link: dbMessage.message_link ?? '',
          sentiment: dbMessage.sentiment ?? '',
          priority: (dbMessage.priority as 1 | 2 | 3 | 4 | 5) ?? 1,
        };
      }

      return {
        id: dbMessage.id,
        app: dbMessage.app as 'discord' | 'slack' | 'github',
        sender_image: '',
        sender_name: '',
        server_image: '',
        server_name: '',
        channel_name: '',
        content: '',
        message_link: '',
        send_at: dbMessage.created_at,
        sentiment: dbMessage.sentiment ?? '',
        priority: (dbMessage.priority as 1 | 2 | 3 | 4 | 5) ?? 1,
      };
    });

    // DiscordとSlackのメッセージの中で最も古い日付を取得する。
    let earliestMessageDate = new Date(); // 今日の日付
    for (const msg of messages) {
      if (msg.app === 'discord' || msg.app === 'slack') {
        const msgDate = new Date(msg.send_at);
        if (msgDate < earliestMessageDate) {
          earliestMessageDate = msgDate;
        }
      }
    }

    const todayMinusFive = new Date();
    todayMinusFive.setDate(todayMinusFive.getDate() - 5);

    // 5日前の日付と最も古いメッセージの日付を比較して、より古い日付を取得する。
    const startDate = earliestMessageDate < todayMinusFive ? earliestMessageDate : todayMinusFive;

    if (filter === 'all' || filter === 'github') {
      const githubMessages = await getGitHubNotifications(startDate.toISOString());

      // GitHubの通知をメッセージに追加する
      if (githubMessages) {
        messages.push(...githubMessages);
      }
    }

    return messages;
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

function transformData(data: Database['public']['Tables']['messages']['Row'][]) {
  return data.map(item => ({
    app: item.app,
    server_id: item.server_id,
    message_id: item.message_id,
    channel_id: item.channel_id,
  }));
}
