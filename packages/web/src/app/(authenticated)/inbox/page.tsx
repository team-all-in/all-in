import { InfoIcon } from 'lucide-react';
import type { Metadata } from 'next';
import { Badge } from '~/components/ui/badge';
import Messages from './components/message';

export const metadata: Metadata = {
  title: 'メッセージ一覧',
};

export default async function Inbox() {
  return (
    <div className='h-dvh overflow-y-auto p-3'>
      <Badge variant={'destructive'} className='fixed top-16 right-1/2 translate-x-1/2 z-10'>
        <InfoIcon className='size-5 mr-1' />
        SlackとDiscordはダミーデータです
      </Badge>
      <Messages />
    </div>
  );
}
