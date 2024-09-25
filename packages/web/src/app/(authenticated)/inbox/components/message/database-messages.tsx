import { getDatabaseMessages } from '../../data/get-database-messages';
import ResponseMessages from './response-messages';

export default async function DatabaseMessages() {
  const result = await getDatabaseMessages();

  if (!result) {
    return <div>no data</div>;
  }

  return (
    <ResponseMessages
      databaseMessages={result.databaseMessages}
      githubMessages={result.githubMessages}
    />
  );
}
