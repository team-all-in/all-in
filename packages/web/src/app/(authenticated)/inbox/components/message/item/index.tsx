import type { NextPage } from 'next';
import type { Message } from '~/libs/types/message';
import AccountIcon from './account-icon';
import MessageItemContent from './content';
import MessageItemHeader from './header';
import ItemBackground from './item-background';

const MessageItem: NextPage<Message> = message => {
  const { app, sender_image, server_image, content, message_link } = message;
  return (
    <ItemBackground app={app}>
      <div className=''>
        <AccountIcon sender_image={sender_image} server_image={server_image} />
      </div>
      <div className='flex-grow space-y-1.5 pr-2.5'>
        <MessageItemHeader message={message} />
        <MessageItemContent content={content} message_link={message_link} />
      </div>
    </ItemBackground>
  );
};

export default MessageItem;
