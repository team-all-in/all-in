import type { NextPage } from 'next';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type Props = {
  app: string;
  sender_image: string | StaticImport;
  sender_name: string;
};

const Account: NextPage<Props> = ({ app, sender_image, sender_name }) => {
  return (
    <div className='flex items-center gap-4'>
      <div className='relative'>
        <div className='flex aspect-square h-12 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-white'>
          <Image src={sender_image} width={48} height={48} alt='tool-icon' />
        </div>
        <div className='-right-2 -bottom-2 absolute flex aspect-square h-7 items-center justify-center overflow-hidden rounded-full border-2 border-gray-200 bg-background'>
          <Image src={`app-logo/${app}.svg`} alt={`${app}のロゴ`} width='16' height='16' />
        </div>
      </div>
      <p className='w-40'>{sender_name}</p>
    </div>
  );
};

export default Account;
