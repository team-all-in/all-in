'use client';

import dayjs from 'dayjs';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import type { Message } from '~/libs/types/message';
import { filterMessagesByApp } from '../data/filterMessageByApp';
import { groupMessagesByDate } from '../data/groupMessagesByDate';
import MessageItem from './message-item';

export default function MessageList({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const [filter] = useQueryState('filter', parseAsString);
  const [allMessages, setAllMessages] = useState<Message[]>(messages || []);
  const [groupedMessages, setGroupedMessages] = useState<Record<string, Message[]>>({});

  useEffect(() => {
    const sortMessages = async () => {
      if (allMessages) {
        const sorted = allMessages.sort(
          (a, b) => dayjs(b.send_at).unix() - dayjs(a.send_at).unix(),
        );
        setAllMessages(sorted);
        setGroupedMessages(groupMessagesByDate(sorted));
      }
    };

    sortMessages();
  }, [allMessages]);

  useEffect(() => {
    if (filter) {
      const filteredMessages = filterMessagesByApp(allMessages, filter);
      setGroupedMessages(groupMessagesByDate(filteredMessages));
    } else {
      setGroupedMessages(groupMessagesByDate(allMessages));
    }
  }, [filter, allMessages]);

  return (
    <>
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date} className='flex'>
          <div className='w-4 flex-grow rounded-full bg-black' />
          <div className='flex w-full flex-col gap-4 p-3'>
            <h2 className='font-bold text-xl'>{date}</h2>
            {messages.map(message => (
              <MessageItem key={message.id} {...message} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
