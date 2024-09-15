import type { Message } from '~/libs/types/message';
import dayjs from 'dayjs';

export const groupMessagesByDate = (messages: Message[]) => {
  return messages.reduce((acc, message) => {
    const date = dayjs(message.send_at).format('YYYY/MM/DD');

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(message);

    return acc;
  }, {} as Record<string, Message[]>);
};