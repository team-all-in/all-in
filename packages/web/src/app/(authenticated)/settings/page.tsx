import type { Metadata } from 'next';
import AppSettings from './components/app';
import BackLink from './components/back-link';
import UserSettings from './components/user';

export const metadata: Metadata = {
  title: '設定',
};

export default async function Settings() {
  return (
    <article>
      <BackLink place='メッセージ一覧' />
      <div className='space-y-3 px-3'>
        <AppSettings />
        <UserSettings />
      </div>
    </article>
  );
}
