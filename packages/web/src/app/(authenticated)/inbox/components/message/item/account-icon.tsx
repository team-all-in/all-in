import type { NextPage } from 'next';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';

type Props = {
  sender_image: string;
  server_image: string;
};

const AccountIcon: NextPage<Props> = ({ sender_image, server_image }) => {
  return (
    <div className='relative w-12'>
      <Avatar>
        <AvatarImage src={sender_image} alt='' />
        <AvatarFallback />
      </Avatar>
      {server_image && (
        <Image
          src={server_image}
          width={20}
          height={20}
          alt=''
          className={
            '-bottom-1 absolute right-0 aspect-square rounded-sm border-none bg-background shadow-none'
          }
        />
      )}
    </div>
  );
};

export default AccountIcon;
