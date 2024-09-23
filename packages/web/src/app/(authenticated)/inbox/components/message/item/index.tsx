import type { NextPage } from 'next';
import { Drawer, DrawerContent, DrawerTrigger } from '~/components/ui/drawer';
import type { Message } from '~/libs/types/message';
import AccountIcon from './account-icon';
import MessageItemContent from './content';
import MessageItemHeader from './header';
import ItemBackground from './item-background';

const Item = ({ message }: { message: Message }) => {
  const { app, sender_image, server_image, content } = message;
  return (
    <ItemBackground app={app}>
      <div>
        <AccountIcon sender_image={sender_image} server_image={server_image} />
      </div>
      <div className='flex-grow space-y-1.5'>
        <MessageItemHeader message={message} />
        <MessageItemContent content={content} />
      </div>
    </ItemBackground>
  );
};

const Mobile = ({ message }: { message: Message }) => {
  return (
    <div className='sm:hidden'>
      <Drawer>
        <DrawerTrigger className='w-full'>
          <Item message={message} />
        </DrawerTrigger>
        <DrawerContent>
          <ul className='p-7 px-6'>
            <li>generate replay</li>
            <li>message link</li>
            <hr />
            <li>delete message</li>
          </ul>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const Desktop = ({ message }: { message: Message }) => {
  return (
    <div className='group relative hidden sm:block'>
      <Item message={message} />
      <div className='-top-2 absolute right-16 z-30 border bg-white p-2 text-black opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
        action
      </div>
    </div>
  );
};

const MessageItem: NextPage<Message> = message => {
  return (
    <>
      <Mobile message={message} />
      <Desktop message={message} />
    </>
  );
};

export default MessageItem;
