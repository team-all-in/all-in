import type { Message } from '~/libs/types/message';

export const filterMessagesByApp = (messages: Message[], app: string) => {
  return messages.filter(message => message.app === app);
};