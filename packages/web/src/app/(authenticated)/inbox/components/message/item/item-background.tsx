import Image from 'next/image';
import React, { type ReactNode } from 'react';
import type { Message } from '~/libs/types/message';
import { AppsProps } from './app-type';

export default function ItemBackground({
  children,
  app,
}: {
  children: ReactNode;
  app: Message['app'];
}) {
  const appVarient = AppsProps[app];
  return (
    <div
      className={`relative flex gap-4 overflow-hidden rounded-xl border p-4 ${appVarient.itemClass}`}
    >
      {children}
      <Image
        className='-bottom-3 absolute right-12 z-0 opacity-50'
        src={appVarient.img}
        width={160}
        height={160}
        alt=''
      />
    </div>
  );
}
