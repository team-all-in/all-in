'use server';

import { markAsRead } from '~/server/github/notificationActions';

export const markAsReadAction = async (formData: FormData) => {
  const id = formData.get('id');

  try {
    await markAsRead(id as string);
  } catch (error) {
    console.error('Error marking notification as done:', error);
  }
};
