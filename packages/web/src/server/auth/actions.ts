'use server';

import { redirect } from 'next/navigation';
import { createClient } from '~/libs/supabase/server';

export const signInWithGoogle = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (error) {
    console.error('Error signing in with Google:', error.message);
    return;
  }

  if (data.url) {
    redirect(data.url); // use the redirect API for your server framework
  }
};

export const signOut = async () => {
  const supabase = createClient();

  await supabase.auth.signOut();

  redirect('/');
};
