import { Sparkles } from 'lucide-react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import type { Message } from '~/libs/types/message';
import DiscordImg from '../../../../../../public/app-logo/discord.svg';
import Account from './account';
import { type AppProps, AppsProps, ButtonColorClasses, defaultAppProps } from './app-type';
import Label from './label';

const MessageItem: NextPage<Message> = ({ app, sender_image, sender_name, content, priority }) => {
  const appType: AppProps = AppsProps[app] || defaultAppProps;

  return (
    <div
      className={`relative flex h-72 w-full flex-col gap-3 overflow-hidden rounded-3xl border p-4 sm:h-56 sm:pr-8 ${appType.itemClass}`}
    >
      {appType.img && (
        <Image
          src={appType.img}
          alt='tool-icon'
          className={`-right-4 -bottom-4 absolute h-56 opacity-30 ${appType.hasInvert ? ' invert filter ' : ''}`}
        />
      )}
      <div className='z-10 flex flex-col gap-4 sm:flex-row sm:items-center'>
        <Account
          appImg={appType.img || DiscordImg}
          sender_image={sender_image}
          sender_name={sender_name}
        />
        <div className='flex w-full items-center justify-between'>
          <Label priority={priority} />
          <p>00:00</p>
        </div>
      </div>
      <div className='z-10 flex flex-grow flex-col justify-between overflow-hidden text-ellipsis sm:ml-4'>
        <p className='line-clamp-2 sm:line-clamp-3'>{content}</p>
        <div className='flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-8'>
          <Button className={`w-fit${ButtonColorClasses[appType.buttonBackgroundState]}`}>
            <Sparkles className='mr-2' />
            完了にする
          </Button>
          <Link href={'#'} className='underline'>
            元のメッセージを見る
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
