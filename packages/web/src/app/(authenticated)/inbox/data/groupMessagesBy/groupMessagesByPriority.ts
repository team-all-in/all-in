import type { Message } from '~/libs/types/message';

export const groupMessagesByPriority = (messages: Message[]) => {
  const grouped = messages.reduce((acc, message) => {
    const priority = message.priority;

    if (priority) {
      if (!acc[priority]) {
        acc[priority] = [];
      }

      acc[priority].push(message);
    }

    return (acc);
  }, {} as Record<string, Message[]>);

  return Object.entries(grouped)
};
