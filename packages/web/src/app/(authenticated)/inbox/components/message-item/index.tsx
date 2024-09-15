import dayjs from 'dayjs';
import type { NextPage } from 'next';
import Image from 'next/image';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/libs/classes';
import type { Message } from '~/libs/types/message';
import { GenerateMessageDialog } from '../gen-message/dialog';
import { type AppProps, AppsProps, defaultAppProps } from './app-type';
import Label from './label';
import MarkAsReadButton from './mark-as-read-button';
import AccountIcon from './account-icon';

const MessageItem: NextPage<Message> = ({
  id,
  app,
  sender_image,
  sender_name,
  content,
  priority,
  sentiment,
  send_at,
  message_link,
}) => {
  const appType: AppProps = AppsProps[app] || defaultAppProps;

  return (
    <div
      className={`relative flex h-72 w-full flex-row gap-5 overflow-hidden border-2 rounded-2xl  p-3 sm:h-40 ${appType.itemClass}`}
    >
      {appType.img && (
        <Image
          src={appType.img}
          alt='tool-icon'
          className={`-right-4 -bottom-8 absolute h-56 opacity-30 ${
            appType.hasInvert ? ' invert filter ' : ''
          }`}
        />
      )}
      <AccountIcon app={app} sender_image={sender_image} className='hidden sm:block' />
      <div className='flex flex-col gap-3 h-full w-full'>
        <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <AccountIcon app={app} sender_image={sender_image} className='sm:hidden' />
            <p className='whitespace-nowrap'>{sender_name}</p>
          </div>
          <div className='flex w-full items-center justify-between'>
            <div className='flex items-center gap-3'>
              {priority && <Label priority={priority} />}
              {sentiment && <span>{sentiment}</span>}
            </div>
            <p>{dayjs(send_at).format('HH:mm')}</p>
          </div>
        </div>
        <div className='z-10 flex flex-grow flex-col justify-between overflow-hidden text-ellipsis'>
          <p className='line-clamp-2 sm:line-clamp-1'>{content}</p>
          <div className='flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3'>
            {app === 'github' ? (
              <MarkAsReadButton id={id} />
            ) : (
              <GenerateMessageDialog message={content} />
            )}
            <a
              href={message_link}
              className={cn(buttonVariants({ variant: 'link' }), appType.itemClass, 'bg-transparent')}
              target='_blank'
              rel='noreferrer'
            >
              元のメッセージを見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
