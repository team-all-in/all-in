import type { NextPage } from 'next';
import type { Message } from '~/libs/types/message';
import AccountIcon from './account-icon';
import Content from './content';
import Header from './header';
import ItemBackground from './item-background';

const MessageItem: NextPage<Message> = message => {
  const { app, sender_image, server_image, content } = message;
  return (
    <ItemBackground app={app}>
      <div className=''>
        <AccountIcon sender_image={sender_image} server_image={server_image} />
      </div>
      <div className='flex-grow space-y-2 pr-2.5'>
        <Header message={message} />
        <Content content={content} />
      </div>
    </ItemBackground>
  );
};

export default MessageItem;
