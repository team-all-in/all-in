import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { getUser } from '~/server/auth/data';
import UserInfo from './user-info';

export default async function UserSettings() {
  const user = await getUser();

  if (!user) {
    return redirect('/');
  }

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>ユーザー情報</CardTitle>
      </CardHeader>
      <CardContent>
        <UserInfo
          avatar_url={user.user_metadata.avatar_url}
          full_name={user.user_metadata.full_name}
          email={user.user_metadata.email}
        />
      </CardContent>
    </Card>
  );
}
