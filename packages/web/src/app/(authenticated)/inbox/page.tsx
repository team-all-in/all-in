import MessageItem from './components/message-item';
import { getMessages } from './data/getMessages';

export default async function Inbox() {
  const messages = await getMessages();
  console.log('messages', messages);

  return (
    <div className='h-dvh space-y-2 overflow-y-auto p-3 pt-32 sm:pt-14'>
      <div className='flex'>
        <div className='w-4 flex-grow rounded-full bg-black' />
        <div className='flex w-full flex-col gap-4 p-3'>
          <h2 className='font-bold text-xl'>2024/09/15</h2>
          {messages?.map(message => (
            <MessageItem key={message.id} {...message} />
          ))}
        </div>
      </div>
    </div>
  );
}
