'use server';

import { API_URL, header } from './configs';
import { getToken } from './utils';

// GitHUbの通知を既読にする
export const markAsRead = async (threadId: string): Promise<boolean> => {
  const token = await getToken();

  try {
    const response = await fetch(`${API_URL}/threads/${threadId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        ...header,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.status === 205;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    return false;
  }
};

// GitHUbの通知を完了にする
export const markAsDone = async (threadId: string): Promise<boolean> => {
  const token = await getToken();

  try {
    const response = await fetch(`${API_URL}/threads/${threadId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        ...header,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.status === 204;
  } catch (error) {
    console.error('Error marking notification as done:', error);
    return false;
  }
};
