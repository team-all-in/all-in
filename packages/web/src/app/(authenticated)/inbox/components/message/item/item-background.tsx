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
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border p-4 text-left',
        appVariant.itemClass,
      )}
    >
      <div className='relative z-10 flex gap-4'>{children}</div>
      <Image
        className='-bottom-8 absolute right-12 aspect-square opacity-50'
        src={appVariant.img}
        width={150}
        height={150}
        alt=''
      />
    </div>
  );
}
