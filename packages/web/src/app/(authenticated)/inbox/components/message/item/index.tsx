import type { NextPage } from 'next';
import type { Message } from '~/libs/types/message';
import AccountIcon from './account-icon';
import Actions from './actions';
import MessageItemContent from './content';
import MessageItemHeader from './header';
import ItemBackground from './item-background';

const MessageItem: NextPage<Message> = message => {
  const { app, sender_image, server_image, content, message_link, id } = message;
  return (
    <div className='group relative'>
      <Actions app={app} id={id} message_link={message_link} />
      <ItemBackground app={app}>
        <div>
          <AccountIcon sender_image={sender_image} server_image={server_image} />
        </div>
        <div className='flex-grow space-y-1.5 pr-2.5'>
          <MessageItemHeader message={message} />
          <MessageItemContent content={content} message_link={message_link} />
        </div>
      </ItemBackground>
    </div>
  );
};

export default MessageItem;
