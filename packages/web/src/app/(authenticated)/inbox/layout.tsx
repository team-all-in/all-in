import { Suspense } from 'react';
import Filter from '~/components/common/filter';
import SettingsLink from './components/settings-link';

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col overflow-hidden sm:flex-row'>
      <SettingsLink />
      <Suspense fallback={null}>
        <Filter />
      </Suspense>
      <main className='flex-1'>{children}</main>
    </div>
  );
}
