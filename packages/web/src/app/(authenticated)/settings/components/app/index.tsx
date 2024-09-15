import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import DiscordButton from './DiscordButton';
import GithubButton from './GithubButton';
import SlackButton from './SlackButton';

export default async function AppSettings() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>連携設定</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex justify-center'>
          <DiscordButton />
          <GithubButton />
          <SlackButton />
        </div>
      </CardContent>
    </Card>
  );
}
