import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function SlackButton() {
  return (
    <div className='mx-4 flex-col'>
      <div className='flex justify-center'>
        <Link href='/settings/slack'>
          <Button variant='slack' size='tools' />
        </Link>
      </div>
      <div className='items-center text-center font-bold text-black text-sm'>slack</div>
    </div>
  );
}
