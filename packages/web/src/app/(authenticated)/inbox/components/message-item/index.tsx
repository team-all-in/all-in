import { Sparkles } from 'lucide-react';
import { NextPage } from 'next';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import DiscordImg from '../../../../../../public/app-logo/discord.svg';
import Account from './account';
import { AppProps, AppsProps, AppType, ButtonColorClasses, ButtonState } from './app-type';
import Label from './label';
import { LabelType } from './label-type';

type Props = {
  app: AppType,
  user: {
    img: string | StaticImport,
    name: string
  },
  message: string,
  labelType: LabelType
}

const MessageItem: NextPage<Props> = ({app, user, message, labelType}) => {
  const appType: AppProps = AppsProps[app]

  return (
    <div className={'flex flex-col gap-3 h-60 sm:h-56 w-full p-4 pr-8 border rounded-3xl relative overflow-hidden ' + appType.itemClass} >
      {appType.img && (
        <Image
          src={appType.img}
          alt='tool-icon'
          className={'absolute h-56 -right-4 -bottom-4 opacity-30 ' + (appType.hasInvert ? ' filter invert ' : '')}
        />
      )}
      <div className='flex justify-between z-10'>
        <div className='flex gap-2 items-center'>
          <Account appImg={appType.img || DiscordImg} user={user} />
          <Label labelType={labelType}/>
        </div>
        <p>00:00</p>
      </div>
      <div className='ml-8 flex-grow flex flex-col justify-between text-ellipsis overflow-hidden z-10'>
        <p className='line-clamp-2 sm:line-clamp-3'>{message}</p>
        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8'>
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