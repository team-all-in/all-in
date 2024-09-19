'use server';

import { redirect } from 'next/navigation';
import { saveGithubSettings } from '~/server/github/settings';

export const saveGitHubSettingsAction = async (_previousState: unknown, formData: FormData) => {
  const token = formData.get('token');

  await saveGithubSettings(token as string);

  redirect('/settings/success?appName=github');

  return '';
};
