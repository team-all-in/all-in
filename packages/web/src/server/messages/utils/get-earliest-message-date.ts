import type { Database } from '~/libs/types/database';

export function getEarliestMessageDate(
  messages: Database['public']['Tables']['messages']['Row'][],
): Date {
  let earliestMessageDate = new Date();

  for (const msg of messages) {
    if (msg.app === 'discord' || msg.app === 'slack') {
      const msgDate = new Date(msg.send_at ?? '');
      if (msgDate < earliestMessageDate) {
        earliestMessageDate = msgDate;
      }
    }
  }

  return earliestMessageDate;
}
