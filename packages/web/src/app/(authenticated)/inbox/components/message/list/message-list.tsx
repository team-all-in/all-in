'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';
import type { Message } from '~/libs/types/message';
import { filterMessagesByApp } from '../../../data/filterMessageByApp';
import { groupMessagesBy } from '../../../data/groupMessagesBy';
import MessageItem from '../item';
import { LabelsProps } from '../item/label-type';

export default function MessageList({
  messages,
}: {
  messages: Message[] | undefined;
}) {
  const [filter] = useQueryState('filter', parseAsString);
  const [sort] = useQueryState('sort', parseAsString);
  const [groupedMessages, setGroupedMessages] = useState<
    [string, Message[]][] | [number, Message[]][]
  >([]);

  useEffect(() => {
    const processMessages = async () => {
      let processedMessages = messages || [];

      if (filter) {
        processedMessages = filterMessagesByApp(processedMessages, filter);
      }

      setGroupedMessages(groupMessagesBy(sort ?? 'time', processedMessages));
    };

    processMessages();
  }, [filter, messages, sort]);

  return (
    <>
      {groupedMessages.map(([date, messages]) => (
        <div key={date} className='flex'>
          <div
            className={`w-4 flex-grow rounded-full ${LabelsProps[Number(date)] ? '' : 'bg-muted'}`}
            style={{
              backgroundColor: LabelsProps[Number(date)] ? LabelsProps[Number(date)].color : '',
            }}
          />
          <div className='flex w-full flex-col gap-2 p-3'>
            <h2
              className={`font-bold text-lg ${LabelsProps[Number(date)] ? '' : 'text-primary'}`}
              style={{
                color: LabelsProps[Number(date)] ? LabelsProps[Number(date)].color : '',
              }}
            >
              {LabelsProps[Number(date)] ? LabelsProps[Number(date)].text : date}
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
