import { CircleCheckBig, Sparkles, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/libs/classes';
import type { Message } from '~/libs/types/message';
import { AppsProps } from '../app-type';
import ActionButton from './action-button';

export default function Actions({ app }: { app: Message['app'] }) {
  const appVariant = AppsProps[app];
  return (
    <div
      className={cn(
        '-translate-y-2/3 absolute top-0 right-5 z-30 flex items-center rounded-lg border-2 p-1 px-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
        appVariant.actionClass,
      )}
    >
      {app === 'github' ? (
        <>
          <ActionButton
            Icon={CircleCheckBig}
            text='既読を付ける'
            className='hover:bg-white/10'
            handleClick={() => console.log('read')}
          />
          <ActionButton
            Icon={SquareArrowOutUpRight}
            className='hover:bg-white/10'
            handleClick={() => console.log('read')}
          />
        </>
      ) : (
        <>
          <ActionButton
            Icon={Sparkles}
            text='返信を生成する'
            handleClick={() => console.log('read')}
          />
          <ActionButton
            Icon={SquareArrowOutUpRight}
            className='text-black'
            handleClick={() => console.log('read')}
          />
          <Separator orientation='vertical' className='mx-1 h-5' />
          <ActionButton
            Icon={Trash2}
            className='text-red-500 hover:bg-red-500/15'
            handleClick={() => console.log('read')}
          />
        </>
      )}
    </div>
  );
}
