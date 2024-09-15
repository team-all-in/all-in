import dayjs from 'dayjs';
import type { NextPage } from 'next';
import Image from 'next/image';
import { buttonVariants } from '~/components/ui/button';
import { cn } from '~/libs/classes';
import type { Message } from '~/libs/types/message';
import { GenerateMessageDialog } from '../gen-message/dialog';
import Account from './account';
import { type AppProps, AppsProps, defaultAppProps } from './app-type';
import Label from './label';
import MarkAsReadButton from './mark-as-read-button';

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
      className={`relative flex h-80 w-full flex-col gap-5 overflow-hidden rounded-3xl border p-5 sm:h-56 sm:pr-8 ${appType.itemClass}`}
    >
      {appType.img && (
        <Image
          src={appType.img}
          alt='tool-icon'
          className={`-right-4 -bottom-4 absolute h-56 opacity-30 ${
            appType.hasInvert ? ' invert filter ' : ''
          }`}
        />
      )}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <Account app={app} sender_image={sender_image} sender_name={sender_name} />
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-3'>
            {priority && <Label priority={priority} />}
            {sentiment && <span>{sentiment}</span>}
          </div>
          <p>{dayjs(send_at).format('HH:mm')}</p>
        </div>
      </div>
      <div className='z-10 flex flex-grow flex-col justify-between overflow-hidden text-ellipsis sm:ml-4'>
        <p className='line-clamp-2 sm:line-clamp-3'>{content}</p>
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
  );
};

export default MessageItem;
