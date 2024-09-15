import type { Message } from '~/libs/types/message';
import { groupMessagesByDate } from './groupMessagesByDate';
import { groupMessagesByPriority } from './groupMessagesByPriority';

export const groupMessagesBy = (sort: string, messages: Message[]) => {
  if(sort == 'priority') {
    return groupMessagesByPriority(messages)
  }
  return groupMessagesByDate(messages)
};
