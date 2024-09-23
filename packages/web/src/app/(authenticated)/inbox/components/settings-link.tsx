import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { getSession } from '~/server/auth/data';

export default async function SettingsLink() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const { avatar_url, full_name } = session.user.user_metadata;

  return (
    <Link href='/settings' className='fixed top-2 right-3 z-50'>
      <Avatar>
        <AvatarImage src={avatar_url} alt={full_name[0]} />
        <AvatarFallback>{full_name[0]}</AvatarFallback>
      </Avatar>
    </Link>
  );
}
