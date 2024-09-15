import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { checkSlackSettings } from '../../data/get-app-settings';
import EnableLabel from './enable-label';

export default async function SlackButton() {
  const isEnabled = await checkSlackSettings();

  return (
    <div className='mx-4 flex-col'>
      <div className='flex justify-center'>
        <Link href='/settings/slack'>
          <Button variant='slack' size='tools' />
        </Link>
        {isEnabled && <EnableLabel />}
      </div>
      <div className='items-center text-center font-bold text-sm'>slack</div>
    </div>
  );
}
