import MessageItem from './components/message-item';
import { getMessages } from './data/getMessages';

export default async function Inbox() {
  const messages = await getMessages();
  console.log('messages', messages);

  return (
    <div className='h-dvh space-y-2 overflow-y-auto p-3 pt-32 sm:pt-14'>
      <div className='flex'>
        <div className='bg-black flex-grow w-4 rounded-full'/>
        <div className='p-3 w-full flex flex-col gap-4'>
          <h2 className='text-xl font-bold'>2024/09/15</h2>
          {messages?.map(message => (
            <MessageItem {...message} />
          ))}
        </div>
      </div>
    </div>
  );
}
