'use client';

import axios, { type AxiosResponse } from 'axios';
import useSWR from 'swr';
import type { Database } from '~/libs/types/database';
import type { Message } from '~/libs/types/message';
import MessageList from './message-list';
import { AppMessageSkelton } from './skelton';

const fetcher = async (request: {
  url: string;
  data: {
    databaseMessages: Database['public']['Tables']['messages']['Row'][];
    githubMessages: Message[];
  };
}) => {
  const res: AxiosResponse<Message[]> = await axios.post(request.url, request.data);
  return res.data;
};

export default function ResponseMessages({
  databaseMessages,
  githubMessages,
}: {
  databaseMessages: Database['public']['Tables']['messages']['Row'][];
  githubMessages: Message[];
}) {
  const {
    data: messages,
    error,
    isLoading,
  } = useSWR(
    {
      url: '/api/get-messages',
      data: { databaseMessages, githubMessages },
    },
    fetcher,
  );

  if (isLoading) {
    return <AppMessageSkelton messages={[...databaseMessages, ...githubMessages]} />;
  }

  if (error) {
    return <div className='grid h-dvh place-content-center'>failed to load</div>;
  }

  if (!messages) {
    return <div className='grid h-dvh place-content-center'>no data</div>;
  }

  return <MessageList messages={messages} />;
}
