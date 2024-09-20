import type { Metadata } from 'next';
import { Suspense } from 'react';
import Messages from './components/message';
import MessageSkelton from './components/message/loading';

export const metadata: Metadata = {
  title: 'メッセージ一覧',
};

export default async function Inbox() {
  return (
    <div className='h-dvh space-y-4 overflow-y-auto p-3 pt-16'>
      <Suspense fallback={<MessageSkelton />}>
        <Messages />
      </Suspense>
    </div>
  );
}
