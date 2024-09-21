'use client';

import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import { Button, buttonVariants } from '~/components/ui/button';
import useWindowSize from '~/hooks/use-get-window-size';
import BackLink from '../components/back-link';
import AppType from './appType';

export default function Success() {
  const [width, height] = useWindowSize();
  const searchParams = useSearchParams();
  const getAppNameParams = searchParams.get('appName');
  const app = AppType.find(app => app.type === getAppNameParams);

  return app ? (
    <div className={`-mt-14 h-screen ${app.backgroundColorClass}`}>
      <Confetti width={width} height={height} recycle={true} />
      <div className='relative h-full pt-14'>
        <BackLink href='/settings' place='設定' textColor={app.textColor} />
        <div className='-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 flex w-full flex-col items-center'>
          <Image src={app.img} alt='appIcon' height={320} className='h-56 sm:h-80' />
          <p className={`mb-8 text-xl sm:text-5xl text-${app.textColor}`}>
            {app.name}との連携が完了しました
          </p>
          <Button variant={'outline'} className='bg-white hover:bg-gray-200'>
            <Link
              href={'/inbox'}
              className={`${buttonVariants({ variant: 'link' })} hover:no-underline`}
            >
              <span className='text-black'>メッセージ一覧を見る</span>
              <ArrowRightIcon color='black' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h1>認証されたアプリが見つかりません</h1>
    </div>
  );
}
