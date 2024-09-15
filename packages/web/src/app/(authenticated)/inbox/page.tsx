import dayjs from 'dayjs';
import MessageItem from './components/message-item';
import { getMessages } from './data/getMessages';
import { groupMessagesByDate } from './data/groupMessagesByDate';

export default async function Inbox() {
  const messages = await getMessages()
  const sortedMessages = messages?.sort((a, b) => dayjs(b.send_at).unix() - dayjs(a.send_at).unix()) || [];
  const groupedMessages = (messages ? groupMessagesByDate(sortedMessages) : {});
  console.log('sortedMessages', sortedMessages);

  return (
    <div className='h-dvh space-y-8 overflow-y-auto p-3 pt-32 sm:pt-14'>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className='flex'>
          <div className='w-4 flex-grow rounded-full bg-black' />
          <div className='flex w-full flex-col gap-4 p-3'>
            <h2 className='font-bold text-xl'>{date}</h2>
            {messages.map((message) => (
              <MessageItem key={message.id} {...message} />
            ))}
          </div>
        </div>
    ))}
    </div>
  );
}
