'use client';

import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import { filterMessagesByApp } from '~/server/messages/utils/filter-messages';
import { groupMessagesBy } from '~/server/messages/utils/group-messages';
import MessageItem from './item';
import { LabelsProps } from './item/header/label-type';
import MessageItemSkelton from './item/skelton';

type MessageListProps =
  | {
      messages: Message[];
      isPadding?: false;
    }
  | {
      messages: (Database['public']['Tables']['messages']['Row'] | Message)[];
      isPadding: true;
    };

export default function MessageList({ messages, isPadding }: MessageListProps) {
  const [filter] = useQueryState('filter', parseAsString);
  const [sort] = useQueryState('sort', parseAsString);

  const groupedMessages = useMemo(() => {
    if (isPadding) {
      messages = messages.map(message => ({
        sender_image: '',
        sender_name: '',
        server_image: '',
        server_name: '',
        channel_name: '',
        content: '',
        key: message.id,
        app: message.app as Message['app'],
        id: '',
        message_link: message.message_link ?? '',
        send_at: message.send_at ?? '',
        priority: message.priority as 1 | 2 | 3 | 4 | 5,
      }));
    }

    const processedMessages = filter
      ? filterMessagesByApp(messages as Message[], filter)
      : messages;

    return groupMessagesBy(sort ?? 'time', processedMessages as Message[]);
  }, [filter, messages, sort, isPadding]);

  return (
    <div className='space-y-3 pt-16'>
      {groupedMessages.map(([date, messages]) => {
        const labelProps = LabelsProps[Number(date)];
        const backgroundColor = labelProps?.color || '';
        const textColor = labelProps?.color || '';
        const labelText = labelProps?.text || date;
        const bgClass = labelProps ? '' : 'bg-muted';
        const textClass = labelProps ? '' : 'text-muted-foreground';

        return (
          <div key={date} className='flex'>
            <div className={`w-4 flex-grow rounded-full ${bgClass}`} style={{ backgroundColor }} />
            <div className='flex w-full flex-col gap-2 p-3'>
              <h2 className={`font-bold text-sm ${textClass}`} style={{ color: textColor }}>
                {labelText}
              </h2>
              {messages.map(message =>
                isPadding ? (
                  <MessageItemSkelton key={message.id} app={message.app} />
                ) : (
                  <MessageItem key={message.id} {...message} />
                ),
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
