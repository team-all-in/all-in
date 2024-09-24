import { fetchGitHubNotifications } from '~/server/github/fetch-notifications';
import { fetchDatabaseMessages } from '~/server/messages/fetch-database-messages';
import { getEarliestMessageDate } from '~/server/messages/utils/get-earliest-message-date';

export const getDatabaseMessages = async () => {
  const databaseMessages = await fetchDatabaseMessages();
  if (!databaseMessages) {
    return;
  }

  const date = getEarliestMessageDate(databaseMessages);
  const githubMessages = (await fetchGitHubNotifications(date.toISOString())) ?? [];

  const messages = githubMessages ? [...databaseMessages, ...githubMessages] : databaseMessages;

  return { databaseMessages, githubMessages, messages };
};
