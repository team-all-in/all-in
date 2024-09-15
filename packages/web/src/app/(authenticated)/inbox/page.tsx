'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import MessageItem from './components/message-item';
import { getMessages } from './data/getMessages';
import { groupMessagesByDate } from './data/groupMessagesByDate';
import { Message } from '~/libs/types/message';
import { parseAsString, useQueryState } from 'nuqs';
import { filterMessagesByApp } from './data/filterMessageByApp';

export default function Inbox() {
  const [filter] = useQueryState('filter', parseAsString);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [groupedMessages, setGroupedMessages] = useState<Record<string, Message[]>>({});

  const fetchMessages = async () => {
    const fetchedMessages = await getMessages();
    if (fetchedMessages) {
      const sorted = fetchedMessages.sort((a, b) => dayjs(b.send_at).unix() - dayjs(a.send_at).unix());
      setAllMessages(sorted); // 全メッセージを保持
      setGroupedMessages(groupMessagesByDate(sorted));
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    if (filter) {
      const filteredMessages = filterMessagesByApp(allMessages, filter);
      setGroupedMessages(groupMessagesByDate(filteredMessages));
    } else {
      setGroupedMessages(groupMessagesByDate(allMessages));
    }
  }, [filter, allMessages]);

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
