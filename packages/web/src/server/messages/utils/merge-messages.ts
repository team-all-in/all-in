import type { Database } from '~/libs/types/database';
import type { Message, MessageResponse } from '~/libs/types/message';

export function mergeMessages(
  databaseMessages: Database['public']['Tables']['messages']['Row'][],
  responseMessages: MessageResponse[],
): Message[] {
  return databaseMessages
    .map((dbMessage): Message | undefined => {
      const responseMessage = responseMessages.find(msg => msg.id === dbMessage.message_id);

      if (responseMessage) {
        return {
          ...responseMessage,
          id: dbMessage.id,
          send_at: dbMessage.send_at ?? '',
          message_link: dbMessage.message_link ?? '',
          sentiment: dbMessage.sentiment ?? '',
          priority: (dbMessage.priority as Message['priority']) ?? 1,
        };
      }
      return {
        id: dbMessage.id,
        send_at: dbMessage.send_at ?? '',
        message_link: dbMessage.message_link ?? '',
        sentiment: dbMessage.sentiment ?? '',
        priority: (dbMessage.priority as Message['priority']) ?? 1,
        app: dbMessage.app as Message['app'],
        sender_image: '',
        sender_name: '',
        server_image: '',
        server_name: '',
        channel_name: '',
        content: '',
      };
    })

    .filter((msg): msg is Message => msg !== undefined);
}
