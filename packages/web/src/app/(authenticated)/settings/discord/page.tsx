import { redirect } from 'next/navigation';

export default function Discord() {
  const url = 'https://discord.com/oauth2/authorize?';

  const client_id = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || '';
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth/discord/`;
  const response_type = 'code';
  const scope = 'identify email bot';

  const params = new URLSearchParams({
    client_id,
    redirect_uri,
    response_type,
    scope,
  });

  const discordOAuthUrl = `${url}${params}`;

  redirect(discordOAuthUrl);
}
