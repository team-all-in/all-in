import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href='/'>
      <Image src='/all-in.svg' width='100' height='23' alt='ALL IN' />
    </Link>
  );
}
