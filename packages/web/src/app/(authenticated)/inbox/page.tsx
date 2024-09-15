import { Suspense } from 'react';
import MessageList from './components/message-list';
import { getMessages } from './data/getMessages';

export const metadata = {
  title: 'ALL-IN メッセージ一覧',
  description: '登録しているアプリケーションの通知が一覧で見れます',
  keywords: ['通知', '一覧', 'アプリケーション', '便利'],
  openGraph: {
    title: 'ALL-IN メッセージ一覧',
    description: '登録しているアプリケーションの通知が一覧で見れます',
    url: 'https://all-in-henna.vercel.app/inbox',
    type: 'website',
  },
}

export default async function Inbox() {
  const messages = await getMessages();

  return (
    <div className='h-dvh space-y-4 overflow-y-auto p-3 pt-16'>
      <Suspense>
        <MessageList messages={messages} />
      </Suspense>
    </div>
  );
}
