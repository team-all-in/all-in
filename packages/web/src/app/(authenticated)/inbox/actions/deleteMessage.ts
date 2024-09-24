'use server';

import { revalidatePath } from 'next/cache';
import { deleteMessage } from '~/server/messages/delete-message';

export const deleteMessageAction = async (_previousState: unknown, formData: FormData) => {
  const id = formData.get('id');

  await deleteMessage(id as string);
  revalidatePath('/inbox', 'layout');

  return '';
};
