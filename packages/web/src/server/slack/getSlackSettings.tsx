'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '../auth/data';
// 連携してるか確認するためにSlack連携情報を取得する
export const getSlackSettings = async () => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  const supabase = createClient();
  const { data, error } = await supabase
    .from('slack_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) {
    console.error(error);
    return;
  }

  return data;
};
