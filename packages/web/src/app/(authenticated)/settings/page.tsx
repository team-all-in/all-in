import Link from "next/link";

export default async function Settings() {
  return (
    <div>
      settings page
      <div>
        <Link href="/settings/discord">Discord</Link>
        <Link href="/settings/slack">Slack</Link>
        <Link href="/settings/github">GitHub</Link>
      </div>
      <div>
        <Link href="/settings/user">User</Link>
      </div>
    </div>
  );
}
