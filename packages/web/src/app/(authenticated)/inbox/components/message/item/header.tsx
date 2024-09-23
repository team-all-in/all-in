import React from 'react';
import type { Message } from '~/libs/types/message';
import Label from './label';
import Names from './names';
import Sentiment from './sentiment';
import Time from './time';

export default function Header({ message }: { message: Message }) {
  const { sender_name, server_name, channel_name, send_at } = message;
  return (
    <div className='flex w-full justify-between'>
      <div className='flex flex-wrap items-center gap-2.5'>
        <Names sender_name={sender_name} server_name={server_name} channel_name={channel_name} />
        <Label priority={5} />
        <Sentiment />
      </div>
      <Time send_at={send_at} />
    </div>
  );
}
