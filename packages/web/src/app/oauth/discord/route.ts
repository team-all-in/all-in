import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { encryptToken } from '~/libs/encryptions/token';
import { createClient } from '~/libs/supabase/server';

const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth/discord/`;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  // OAuthキャンセル時'/settings'に戻る
  if (!code) {
    return NextResponse.redirect(new URL('/settings', request.url));
  }

  // アクセストークンを取得
  const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
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
    }).toString(),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch access token', details: tokenData },
      { status: 500 },
    );
  }

  // トークンを暗号化
  const encryptedAccessToken = encryptToken(tokenData.access_token);
  const encryptedRefreshToken = encryptToken(tokenData.refresh_token);

  const supabase = createClient();
  const getUserRes = await supabase.auth.getUser();
  const user_id = getUserRes.data?.user?.id;

  if (!user_id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // supabaseにaccessToken, refreshTokenを保存
  const { error: upsertError } = await supabase.from('discord_settings').upsert(
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

  const userResponse = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `${tokenData.token_type} ${tokenData.access_token}`,
    },
  });

  const userData = await userResponse.json();

  if (!userResponse.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch user data', details: userData },
      { status: 500 },
    );
  }

  const { error } = await supabase.from('all-in-relation').upsert(
    {
      user_id,
      discord_member_id: userData.username,
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

  // アプリにリダイレクト
  redirect('/settings/success?appName=discord');
}
