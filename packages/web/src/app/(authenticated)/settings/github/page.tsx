import { redirect } from 'next/navigation';
import { getGithubSettings } from '~/server/github/settings';
import GitHubSettingView from './components/view';

export default async function GitHubSetting() {
  const token = await getGithubSettings();

  if (!token) {
    return redirect('/settings/github/edit');
  }

  return <GitHubSettingView token={token} />;
}
