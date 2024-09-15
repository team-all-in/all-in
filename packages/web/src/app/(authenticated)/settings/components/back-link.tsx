import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { buttonVariants } from '~/components/ui/button';

export default function BackLink() {
  return (
    <Link href='/inbox' className={buttonVariants({ variant: 'link' })}>
      <ArrowLeftIcon />
      メッセージ一覧に戻る
    </Link>
  );
}
