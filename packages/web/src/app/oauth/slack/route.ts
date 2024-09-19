import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { encryptToken } from '~/libs/encryptions/token';
import { createClient } from '~/libs/supabase/server';

const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth/slack`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
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
      code: code,
      redirect_uri: redirectUri || '',
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenRes.ok) {
    console.error('Fetch error:', tokenRes.statusText); // エラーハンドリング
    return NextResponse.json(
      { error: 'Failed to fetch access token', details: tokenData },
      { status: 500 },
    );
  }

  const encryptedAccessToken = encryptToken(tokenData.access_token);
  const encryptedRefreshToken = encryptToken(tokenData.refresh_token);

  const supabase = createClient();
  const getUserRes = await supabase.auth.getUser();
  const user_id = getUserRes.data?.user?.id;

  if (!user_id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { error: upsertError } = await supabase.from('slack_settings').upsert(
    {
      user_id,
      access_token: encryptedAccessToken,
      refresh_token: encryptedRefreshToken,
    },
    { onConflict: 'user_id' },
  );

  if (upsertError) {
    console.error('Failed to save tokens', upsertError);
    return NextResponse.json(
      { error: 'Failed to save tokens', details: upsertError.message },
      { status: 500 },
    );
  }

  const { error } = await supabase.from('all-in-relation').upsert(
    {
      user_id,
      slack_member_id: tokenData.authed_user.id,
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    console.error('Failed to save slack_member_id', error);
    return NextResponse.json(
      { error: 'Failed to save slack_member_id', details: error.message },
      { status: 500 },
    );
  }

  redirect('/settings/success?appName=slack');
}
