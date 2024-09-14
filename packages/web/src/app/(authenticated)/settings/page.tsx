import DiscordButton from '~/components/common/settings/DiscordButton';
import GithubButton from '~/components/common/settings/GithubButton';
import SignoutButton from '~/components/common/settings/SignoutButton';
import SlackButton from '~/components/common/settings/SlackButton';

export default async function Settings() {
  return (
    <div className='flex h-screen w-screen items-center justify-center'>
      <div className='my-5 w-[28%] items-center'>
        <p className='mx-8 mb-10 ml-10 font-bold text-black'>Solidarity setting</p>
        <div className='flex justify-center'>
          <DiscordButton />
          <GithubButton />
          <SlackButton />
        </div>
        <SignoutButton />
      </div>
    </div>
  );
}
