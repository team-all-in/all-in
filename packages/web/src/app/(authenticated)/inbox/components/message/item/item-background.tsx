import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '~/libs/classes';
import type { Message } from '~/libs/types/message';
import { AppsProps } from './app-type';

export default function ItemBackground({
  children,
  app,
}: {
  children: ReactNode;
  app: Message['app'];
}) {
  const appVariant = AppsProps[app];
  return (
    <div className={cn('relative overflow-hidden rounded-xl border p-4', appVariant.itemClass)}>
      <div className='relative z-10 flex gap-4'>{children}</div>
      <Image
        className='-bottom-3 absolute right-12 opacity-50'
        src={appVariant.img}
        width={160}
        height={160}
        alt=''
      />
    </div>
  );
}
