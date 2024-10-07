'use server';

import { dummyMessageResponse } from '~/__test__/message/fixutures';
import { IS_DUMMY } from '~/libs/configs';
import type { Database } from '~/libs/types/database';
import type { MessageResponse } from '~/libs/types/message';
import { getSession } from '~/server/auth/data';
import { transformData } from './utils/transform-data';

export const fetchResponseMessages = async (
  databaseMessages: Database['public']['Tables']['messages']['Row'][],
) => {
  const responseMessages: MessageResponse[] = [];
  if (!IS_DUMMY) {
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
      body: JSON.stringify(transformData(databaseMessages)),
    });

    if (response.ok) {
      const data = await response.json();
      responseMessages.push(...data);
    } else {
      console.error('Failed to fetch messages from backend:', response.statusText);
    }
  } else {
    // await new Promise(resolve => setTimeout(resolve, 2000));
    responseMessages.push(...dummyMessageResponse);
  }

  return responseMessages;
};
