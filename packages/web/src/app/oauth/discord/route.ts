import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { createClient } from '~/libs/supabase/server';

const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
const clientSecret = process.env.DISCORD_CLIENT_SECRET;
const redirectUri = process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
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

  const accessToken = tokenData.access_token;
  const refreshToken = tokenData.refresh_token;

  const supabase = createClient();
  const getUserRes = await supabase.auth.getUser();
  const user_id = getUserRes.data?.user?.id;

  if (!user_id) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // supabaseにaccessToken, refreshTokenを保存
  const { error } = await supabase
    .from('discord_settings')
    .upsert(
      { user_id, access_token: accessToken, refresh_token: refreshToken },
      { onConflict: 'user_id' },
    );

  if (error) {
    console.error('Failed to save tokens', error);
    return NextResponse.json(
      { error: 'Failed to save tokens', details: error.message },
      { status: 500 },
    );
  }

  // アプリにリダイレクト
  redirect('/settings');
}
