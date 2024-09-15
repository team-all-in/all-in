import dayjs from 'dayjs';
import type { Message } from '~/libs/types/message';
import { groupMessagesByDate } from './groupMessagesByDate';
import { groupMessagesByPriority } from './groupMessagesByPriority';

export const groupMessagesBy = (sort: string, messages: Message[]) => {
  const sortedByTime = messages.sort((a, b) => dayjs(b.send_at).unix() - dayjs(a.send_at).unix());
  if (sort === 'priority') {
    return groupMessagesByPriority(messages)
      .map(([key, value]) => [Number(key), value] as [number, Message[]])
      .sort((a, b) => b[0] - a[0]);
  }
  return groupMessagesByDate(sortedByTime);
};
