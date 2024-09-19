import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { text } from 'stream/consumers';
import { buttonVariants } from '~/components/ui/button';

export default function BackLink({
  href = '/inbox',
  place,
  textColor,
}: {
  href?: string;
  place?: string;
  textColor?: string;
}) {
  return (
    <Link href={href} className={buttonVariants({ variant: 'link' }) + ` text-${textColor}`}>
      <ArrowLeftIcon className='mr-2' size={18} />
      <span>
        {place ? `${place}に` : ''}もどる
      </span>
    </Link>
  );
}
