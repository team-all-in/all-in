import type { Message } from '~/libs/types/message';
import PriorityLabel from './label';
import Names from './names';
import Sentiment from './sentiment';
import Time from './time';

export default function MessageItemHeader({ message }: { message: Message }) {
  const { sender_name, server_name, channel_name, send_at, sentiment, priority } = message;
  return (
    <div className='flex w-full justify-between'>
      <div className='flex flex-wrap items-center gap-3'>
        <Names sender_name={sender_name} server_name={server_name} channel_name={channel_name} />
        {priority && <PriorityLabel priority={priority} />}
        {sentiment && <Sentiment sentiment={sentiment} />}
      </div>
      <Time send_at={send_at} />
    </div>
  );
}
