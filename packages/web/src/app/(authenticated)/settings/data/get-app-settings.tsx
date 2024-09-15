'use server';

import { createClient } from '~/libs/supabase/server';
import { getUser } from '~/server/auth/data';

export const checkDiscordSettings = async () => {
  const supabase = createClient();

  const user = await getUser();
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('discord_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (error) {
    return false;
  }
  if (!data) {
    return false;
  }

  return true;
};

export const checkSlackSettings = async () => {
  const supabase = createClient();

  const user = await getUser();
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('slack_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (error) {
    return false;
  }
  if (!data) {
    return false;
  }

  return true;
};

export const checkGithubSettings = async () => {
  const supabase = createClient();

  const user = await getUser();
  if (!user) {
    return false;
  }

  const { data, error } = await supabase
    .from('github_settings')
    .select('*')
    .eq('user_id', user.id)
    .single();
  if (error) {
    return false;
  }
  if (!data) {
    return false;
  }

  return true;
};
