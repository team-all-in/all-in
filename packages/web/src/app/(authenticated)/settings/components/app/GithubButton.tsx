import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { checkGithubSettings } from '../../data/get-app-settings';
import EnableLabel from './enable-label';

export default async function GithubButton() {
  const isEnabled = await checkGithubSettings();

  return (
    <div className='mx-4 flex-col'>
      <div className='relative flex justify-center'>
        <Link href='/settings/github'>
          <Button variant='github' size='tools' />
        </Link>
        {isEnabled && <EnableLabel />}
      </div>
      <div className='items-center text-center font-bold text-sm'>github</div>
    </div>
  );
}
