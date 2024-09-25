import type { Metadata } from 'next';
import Messages from './components/message';

export const metadata: Metadata = {
  title: 'メッセージ一覧',
};

export default async function Inbox() {
  return (
    <div className='h-dvh overflow-y-auto p-3'>
      <Messages />
    </div>
  );
}
