import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import { fetchResponseMessages } from '~/server/messages/fetch-response-messages';
import { mergeMessages } from '~/server/messages/utils/merge-messages';

export const getMessages = async ({
  databaseMessages,
  githubMessages,
}: {
  databaseMessages: Database['public']['Tables']['messages']['Row'][];
  githubMessages: Message[];
}) => {
  const responseMessages = await fetchResponseMessages(databaseMessages);
  if (!responseMessages) {
    return;
  }
  const messages = mergeMessages(databaseMessages, responseMessages);
  if (githubMessages) {
    messages.push(...githubMessages);
  }

  return messages;
};
