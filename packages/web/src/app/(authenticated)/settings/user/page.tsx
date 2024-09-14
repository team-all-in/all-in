import { signOut } from "~/server/actions/auth";

export default function UserSetting() {
  return (
    <div>
      UserSetting
      <form action={signOut}>
        <button>sign out</button>
      </form>
    </div>
  );
}
