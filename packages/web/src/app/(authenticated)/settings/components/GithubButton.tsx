import Link from 'next/link';
import { Button } from '~/components/ui/button';

export default function GithubButton() {
  return (
    <div className='mx-4 flex-col'>
      <div className='flex justify-center'>
        <Link href='/settings/github'>
          <Button variant='github' size='tools' />
        </Link>
      </div>
      <div className='items-center text-center font-bold text-black text-sm'>github</div>
    </div>
  );
}
