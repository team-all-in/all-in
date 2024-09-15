'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '../auth/data';

// 既に連携してる場合Slack連携情報を削除
export const deleteSlackSettings = async () => {
  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from('slack_settings').delete().eq('user_id', user.id);

  if (error) {
    console.error(error);
    return;
  }
};
