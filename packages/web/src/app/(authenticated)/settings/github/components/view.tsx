import { Check, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export default function GitHubSettingView({ token }: { token: string }) {
  return (
    <form className='max-w-xl space-y-3'>
      <Label className='flex items-center gap-1 text-green-500'>
        <Check
          className='rounded-full border border-green-500 bg-card p-1'
          strokeWidth={2.5}
          size={19}
        />
        <span>GitHub連携中</span>
      </Label>
      <Input className='w-full' readOnly value={token} disabled />
      <Link href='github/edit' className={buttonVariants({ variant: 'secondary' })}>
        <RefreshCw className='mr-2' size={18} />
        <span>変更する</span>
      </Link>
    </form>
  );
}
