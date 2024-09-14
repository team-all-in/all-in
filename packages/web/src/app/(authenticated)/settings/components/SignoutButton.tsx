import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function SignoutButton() {
  return (
    <div className='mx-[10%] my-24'>
      <Link href='/settings/user'>
        <Button variant='default' size='signout'>
          Sign Out
        </Button>
      </Link>
    </div>
  );
}
