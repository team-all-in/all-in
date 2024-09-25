import { Suspense } from 'react';
import DatabaseMessages from './database-messages';
import MessageSkelton from './skelton';

export default function Messages() {
  return (
    <Suspense fallback={<MessageSkelton />}>
      <DatabaseMessages />
    </Suspense>
  );
}
