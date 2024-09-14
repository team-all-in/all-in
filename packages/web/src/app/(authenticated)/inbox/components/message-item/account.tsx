import Image from 'next/image';
import ALLImg from '../../../../../../public/all-in.svg'
import DiscordImg from '../../../../../../public/app-logo/discord.svg'

export default function Account() {
  return (
    <div className='flex gap-4 items-center'>
      <div className='relative'>
        <div className='flex items-center justify-center h-12 aspect-square rounded-full bg-white overflow-hidden border-2 border-gray-200'>
          <Image
            src={ALLImg}
            alt='tool-icon'
          />
        </div>
        <div className='absolute -right-2 -bottom-2 h-7 aspect-square rounded-full flex items-center justify-center overflow-hidden bg-white border-2 border-gray-200'>
          <Image
            src={DiscordImg}
            alt='tool-icon'
            className='h-4'
          />
        </div>
      </div>
      <p>natanuki</p>
    </div>
  )
}