import DiscordButton from './components/DiscordButton';
import GithubButton from './components/GithubButton';
import SignoutButton from './components/SignoutButton';
import SlackButton from './components/SlackButton';

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
