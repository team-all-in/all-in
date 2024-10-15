'use server';

import { dummyDatabaseMessages } from '~/__test__/message/fixutures';
import type { Database } from '~/libs/types/database';
import { getUser } from '~/server/auth/data';

export const fetchDatabaseMessages = async (): Promise<
  Database['public']['Tables']['messages']['Row'][] | undefined
> => {
  const offset = 0;
  const LIMIT = 5;

  const user = await getUser();
  if (!user) {
    return;
  }

  const databaseMessages: Database['public']['Tables']['messages']['Row'][] = [];
  if (false) {
    // // 今日から20件分のDiscord、SlackメッセージIdをSupabaseから取得する。
    // const supabase = createClient();

    // const { data, error } = await supabase
    //   .from('messages')
    //   .select('*')
    //   .eq('user_id', user.id)
    //   .range(offset, offset + LIMIT - 1);

    // if (error) {
    //   console.error('error', error);
    //   return;
    // }

    // if (data) {
    //   databaseMessages.push(...data);
    // }
  } else {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    databaseMessages.push(...dummyDatabaseMessages);
  }

  return databaseMessages;
};
