import { getUser } from '~/server/auth/data';

export const saveGithubSettings = async (pat_token: string) => {
  console.log('saveGithubSettings');
  console.log('pat_token', pat_token);

  const user = await getUser();
  if (!user) {
    console.error('user not found');
    return;
  }

  // TODO: pat_tokenを暗号化する
  // https://zenn.dev/nixo/articles/14a6ad953ea2db

  // TODO: supabaseに保存する

  return;
};
