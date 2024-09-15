import { redirect } from 'next/navigation';

export default function Slack() {
  const url = 'https://slack.com/oauth/v2/authorize?';

  const client_id = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID || '';
  const clientSecret = process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET || '';
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth/slack`;
  const response_type = 'code';
  const scope =
    'channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read';

  const params = new URLSearchParams({
    client_id,
    clientSecret,
    redirect_uri,
    response_type,
    scope,
  });

  const slackOAuthUrl = `${url}${params}`;

  redirect(slackOAuthUrl);
}
