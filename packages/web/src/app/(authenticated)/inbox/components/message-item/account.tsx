import Image from 'next/image';
import ALLImg from '../../../../../../public/all-in.svg'
import DiscordImg from '../../../../../../public/app-logo/discord.svg'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { NextPage } from 'next';

type Props = {
  appImg: string | StaticImport,
  user: {
    img: string | StaticImport,
    name: string
  }
}

const Account:NextPage<Props> = ({appImg, user}) => {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative'>
        <div className='flex items-center justify-center h-12 aspect-square rounded-full bg-white overflow-hidden border-2 border-gray-200'>
          <Image
            src={user.img}
            alt='tool-icon'
          />
        </div>
        <div className='absolute -right-2 -bottom-2 h-7 aspect-square rounded-full flex items-center justify-center overflow-hidden bg-white border-2 border-gray-200'>
          <Image
            src={appImg}
            alt='tool-icon'
            className='h-4'
          />
        </div>
      </div>
      <p>{user.name}</p>
    </div>
  )
}

export default Account