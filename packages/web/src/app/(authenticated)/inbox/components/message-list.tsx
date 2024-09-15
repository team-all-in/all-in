'use client';

import dayjs from 'dayjs';
import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import type { Message } from '~/libs/types/message';
import { filterMessagesByApp } from '../data/filterMessageByApp';
import { groupMessagesBy } from '../data/groupMessagesBy';
import MessageItem from './message-item';
import { LabelsProps } from './message-item/label-type';
import { number } from 'zod';

export default function MessageList({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const [filter] = useQueryState('filter', parseAsString);
  const [sort] = useQueryState('sort', parseAsString);
  const [allMessages, setAllMessages] = useState<Message[]>(messages || []);
  const [groupedMessages, setGroupedMessages] = useState<[string, Message[]][] | [number, Message[]][]>([]);

  useEffect(() => {
    const sortMessages = async () => {
      if (allMessages) {
        setAllMessages(allMessages);
        setGroupedMessages(groupMessagesBy(sort ?? 'time', allMessages));
        console.log(groupMessagesBy(sort ?? 'time', allMessages));
      }
    };

    sortMessages();
  }, [allMessages]);

  useEffect(() => {
    if (filter) {
      const filteredMessages = filterMessagesByApp(allMessages, filter);
      setGroupedMessages(groupMessagesBy(sort ?? 'time', filteredMessages));
    } else {
      setGroupedMessages(groupMessagesBy(sort ?? 'time', allMessages));
    }
    console.log(groupMessagesBy(sort ?? 'time', allMessages));
  }, [filter, allMessages, sort]);

  return (
    <>
      {groupedMessages.map(([date, messages]) => (
        <div key={date} className='flex'>
          <div
            className={`w-4 flex-grow rounded-full`}
            style={{ backgroundColor: LabelsProps[Number(date)] ? LabelsProps[Number(date)].color : '#000' }}
          />
          <div className='flex w-full flex-col gap-4 p-3'>
            <h2
              className={`font-bold text-xl`}
              style={{ color: LabelsProps[Number(date)] ? LabelsProps[Number(date)].color : '#000' }}
            >
              {LabelsProps[Number(date)] ? LabelsProps[Number(date)].text : date }
            </h2>
            {messages.map(message => (
              <MessageItem key={message.id} {...message} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
