import { getMessages } from '../../data/getMessages';
import MessageList from './list/message-list';

export default async function Messages() {
  const messages = await getMessages();

  return <MessageList messages={messages} />;
}
