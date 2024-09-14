import AppSettings from './components/app';
import BackLink from './components/back-link';
import UserSettings from './components/user';

export default async function Settings() {
  return (
    <article>
      <BackLink />
      <div className='space-y-3 px-3'>
        <AppSettings />
        <UserSettings />
      </div>
    </article>
  );
}
