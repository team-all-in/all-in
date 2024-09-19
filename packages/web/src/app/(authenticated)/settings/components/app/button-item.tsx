import Image from 'next/image';
import Link from 'next/link';
import { cn } from '~/libs/classes';
import EnableLabel from './enable-label';

interface Props {
  app: string;
  image: string;
  label: string;
  className: string;
  isEnabled: boolean;
}

export default function ButtonItem({ app, image, label, className, isEnabled }: Props) {
  return (
    <div className='flex flex-col items-center'>
      <Link
        key={app}
        href={`/settings/${app}`}
        className={cn(
          'relative flex grid aspect-square size-20 place-content-center rounded-full transition-opacity duration-300 hover:opacity-70',
          className,
        )}
      >
        <Image src={`/app-logo/${image}.svg`} width={80} height={80} alt='' />
        {isEnabled && <EnableLabel />}
      </Link>
      <span className='mt-2 font-medium text-sm'>{label}</span>
    </div>
  );
}
