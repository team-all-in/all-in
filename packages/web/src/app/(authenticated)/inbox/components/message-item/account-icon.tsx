import type { NextPage } from 'next';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

type Props = {
  app: string;
  sender_image: string | StaticImport;
  className: string,
  iconBackgroundColor: string
};

const AccountIcon: NextPage<Props> = ({ app, sender_image, className, iconBackgroundColor }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className='relative'>
        <div className='flex aspect-square h-10 items-center justify-center overflow-hidden rounded-full bg-white'>
          <Image src={sender_image} width={40} height={40} alt='tool-icon' />
        </div>
        <div className={`-right-2 -bottom-2 absolute flex aspect-square h-6 items-center justify-center overflow-hidden bg-${iconBackgroundColor} rounded-full`}>
          <Image src={`app-logo/${app}.svg`} alt={`${app}のロゴ`} width={20} height={20} />
        </div>
      </div>
    </div>
  );
};

export default AccountIcon;
