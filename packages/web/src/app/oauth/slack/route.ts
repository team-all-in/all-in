import { NextResponse } from 'next/server';
import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = process.env.SLACK_REDIRECT_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const supabase = createClient();
  const user = await getUser();

  if (!user || !code) {
    return NextResponse.redirect('/settings/slack?error=oauth_failed');
  }

  const tokenRes = await fetch('https://slack.com/api/oauth.v2.access', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId || '',
      client_secret: clientSecret || '',
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri || '',
    }),
  });

  console.log('Client ID:', process.env.SLACK_CLIENT_ID || '');
  const tokenData = await tokenRes.json();

  if (tokenData.ok) {
    // トークンとリフレッシュトークンをSupabaseに保存
    await supabase.from('slack_settings').upsert({
      user_id: user.id,
      TOKEN: tokenData.access_token,
      refresh_token: tokenData.refresh_token,
    });

    return NextResponse.redirect('/settings/slack?success=oauth_success');
  }
  return NextResponse.redirect('/settings/slack?error=oauth_failed');
}
