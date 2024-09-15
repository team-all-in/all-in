import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '~/components/ui/button';

export default function BackLink({
  href = '/inbox',
  place,
}: {
  href?: string;
  place?: string;
}) {
  return (
    <Link href={href} className={buttonVariants({ variant: 'link' })}>
      <ArrowLeftIcon className='mr-2' size={18} />
      <span>{place ? `${place}に` : ''}もどる</span>
    </Link>
  );
}
