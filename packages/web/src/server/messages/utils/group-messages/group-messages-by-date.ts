import dayjs from 'dayjs';
import type { Message } from '~/libs/types/message';

export const groupMessagesByDate = (messages: Message[]) => {
  const grouped = messages.reduce(
    (acc, message) => {
      const date = dayjs(message.send_at).format('YYYY/MM/DD');

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(message);

      return acc;
    },
    {} as Record<string, Message[]>,
  );

  return Object.entries(grouped);
};
