import { Suspense } from 'react';

import { getDatabaseMessages } from '../../data/get-database-messages';
import MessageList from './message-list';
import ResponseMessages from './response-messages';

export default async function DatabaseMessages() {
  const result = await getDatabaseMessages();

  if (!result) {
    return <div>no data</div>;
  }

  return (
    <Suspense fallback={<MessageList messages={result.messages} isPadding />}>
      <ResponseMessages
        databaseMessages={result.databaseMessages}
        githubMessages={result.githubMessages}
      />
    </Suspense>
  );
}
