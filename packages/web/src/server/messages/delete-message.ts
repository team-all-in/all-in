'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '../auth/data';

export const deleteMessage = async (id: string) => {
  const user = await getUser();
  if (!user) {
    return;
  }

  const supabase = createClient();
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) {
    console.error('error', error);
    throw error;
  }

  return;
};
