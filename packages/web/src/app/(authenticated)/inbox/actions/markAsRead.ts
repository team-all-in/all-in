'use server';

import { revalidatePath } from 'next/cache';
import { markAsRead } from '~/server/github/notificationActions';

export const markAsReadAction = async (_previousState: unknown, formData: FormData) => {
  const id = formData.get('id');

  await markAsRead(id as string);
  revalidatePath('/inbox', 'layout');

  return '';
};
