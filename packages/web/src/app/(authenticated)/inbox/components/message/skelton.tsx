import { Skeleton } from '~/components/ui/skeleton';
import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import MessageList from './message-list';

export default function MessageSkelton() {
  const num = 20;

  return (
    <div className='space-y-3 pt-16'>
      {[...Array(num)].map((n, _i) => (
        <Skeleton key={n} className='h-36 w-full' />
      ))}
    </div>
  );
}

export function AppMessageSkelton({
  messages,
}: {
  messages: (Database['public']['Tables']['messages']['Row'] | Message)[];
}) {
  return <MessageList messages={messages} isPadding />;
}
