import { Sparkles } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import DiscordImg from '../../../../../../public/app-logo/discord.svg';
import Account from './account';
import { AppProps, AppsProps, ButtonColorClasses, defaultAppProps } from './app-type';
import Label from './label';
import { Message } from '~/libs/types/message';

const MessageItem: NextPage<Message> = ({app, sender_image, sender_name, content, priority}) => {
  const appType: AppProps = AppsProps[app] || defaultAppProps

  return (
    <div className={'flex flex-col gap-3  h-72 sm:h-56  w-full p-4 sm:pr-8 border rounded-3xl relative overflow-hidden ' + appType.itemClass} >
      {appType.img && (
        <Image
          src={appType.img}
          alt='tool-icon'
          className={'absolute h-56 -right-4 -bottom-4 opacity-30 ' + (appType.hasInvert ? ' filter invert ' : '')}
        />
      )}
      <div className='flex flex-col sm:flex-row gap-4 sm:items-center z-10'>
        <Account appImg={appType.img || DiscordImg} sender_image={sender_image} sender_name={sender_name} />
        <div className='flex justify-between items-center w-full'>
          <Label priority={priority}/>
          <p>00:00</p>
        </div>
      </div>
      <div className='sm:ml-4 flex-grow flex flex-col justify-between text-ellipsis overflow-hidden z-10'>
        <p className='line-clamp-2 sm:line-clamp-3'>{content}</p>
        <div className='flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-8'>
          <Button className={'w-fit' + ButtonColorClasses[appType.buttonBackgroundState]}><Sparkles className='mr-2' />完了にする</Button>
          <Link href={'#'} className='underline'>
            元のメッセージを見る
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MessageItem