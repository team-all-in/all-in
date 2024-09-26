import { fetchGitHubNotifications } from '~/server/github/fetch-notifications';
import { getStartDate } from '~/server/github/utils';
import { fetchDatabaseMessages } from '~/server/messages/fetch-database-messages';

export const getDatabaseMessages = async () => {
  const databaseMessages = await fetchDatabaseMessages();
  if (!databaseMessages) {
    return;
  }

  const date = await getStartDate(databaseMessages);
  const githubMessages = (await fetchGitHubNotifications(date)) ?? [];

  return { databaseMessages, githubMessages };
};
