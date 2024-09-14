import { signOut } from '~/server/auth/actions';

export default function UserSetting() {
  return (
    <div>
      UserSetting
      <form action={signOut}>
        <button type='submit'>sign out</button>
      </form>
    </div>
  );
}
