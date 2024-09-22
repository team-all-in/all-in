import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { signOut } from '~/server/auth/actions';

export default async function UserInfo({
  avatar_url,
  full_name,
  email,
}: {
  avatar_url: string;
  full_name: string;
  email: string;
}) {
  return (
    <div className='flex flex-wrap items-center justify-between gap-5'>
      <div className='flex items-center gap-3'>
        <Avatar className='size-16'>
          <AvatarImage src={avatar_url} alt={full_name[0]} />
          <AvatarFallback>{full_name[0]}</AvatarFallback>
        </Avatar>
        <div className=''>
          <h2 className='font-bold text-lg'>{full_name}</h2>
          <p className='text-muted-foreground'>{email}</p>
        </div>
      </div>
      <form action={signOut}>
        <Button variant='destructive' type='submit'>
          サインアウト
        </Button>
      </form>
    </div>
  );
}
