import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { checkDiscordSettings } from '../../data/get-app-settings';
import EnableLabel from './enable-label';

export default async function DiscordButton() {
  const isEnabled = await checkDiscordSettings();

  return (
    <div className='mx-4 flex-col'>
      <div className='relative flex justify-center'>
        <Link href='/settings/discord'>
          <Button variant='discord' size='tools' />
        </Link>
        {isEnabled && <EnableLabel />}
      </div>
      <div className='items-center text-center font-bold text-sm'>discord</div>
    </div>
  );
}
