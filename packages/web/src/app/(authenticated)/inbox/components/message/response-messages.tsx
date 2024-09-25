import type { Database } from '~/libs/types/database';

import type { Message } from '~/libs/types/message';
import { getMessages } from '../../data/get-messages';
import MessageList from './message-list';

export default async function ResponseMessages({
  databaseMessages,
  githubMessages,
}: {
  databaseMessages: Database['public']['Tables']['messages']['Row'][];
  githubMessages: Message[];
}) {
  const messages = await getMessages({ databaseMessages, githubMessages });
  if (!messages) {
    return <div>no data</div>;
  }

  return <MessageList messages={messages} />;
}
