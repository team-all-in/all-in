import { Skeleton } from '~/components/ui/skeleton';
import type { Message } from '~/libs/types/message';
import ItemBackground from './item-background';

const MessageItemSkelton = ({ app }: { app: Message['app'] }) => {
  return (
    <ItemBackground app={app}>
      {/* icon */}
      <Skeleton className='h-10 w-10 rounded-full bg-gray-400/30' />
      <div className='flex flex-grow flex-col gap-3'>
        <div className='flex justify-between'>
          <div className='flex flex-wrap items-center gap-3'>
            <div className='flex flex-col gap-1.5'>
              <div className='flex'>
                {/* server_name */}
                <Skeleton className='h-4 w-12 bg-gray-400/30' />
                <span className='mx-1 text-xs'>/</span>
                {/* channel_name */}
                <Skeleton className='h-4 w-14 bg-gray-400/30' />
              </div>
              {/* sender_name */}
              <Skeleton className='h-5 w-20 bg-gray-400/30' />
            </div>
            {/* priority */}
            <Skeleton className='h-5 w-14 rounded-full bg-gray-400/30' />
            {/* sentimental */}
            <Skeleton className='h-6 w-6 rounded-full bg-gray-400/30' />
          </div>
          {/* send_at */}
          <Skeleton className='mr-2 h-6 w-12 bg-gray-400/30' />
        </div>
        {/* content */}
        <Skeleton className='h-5 w-3/4 bg-gray-400/30' />
      </div>
    </ItemBackground>
  );
};

export default MessageItemSkelton;
