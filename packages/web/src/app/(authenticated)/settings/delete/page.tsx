import { redirect } from 'next/navigation';
import { createClient } from '~/libs/supabase/server';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const DeleteSettings = async ({ searchParams }: Props) => {
  const app = searchParams.app;
  type ValidTableNames = 'discord_settings' | 'github_settings' | 'slack_settings';
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/settings`;
  const supabase = createClient();
  const getUserRes = await supabase.auth.getUser();
  const user_id = getUserRes.data?.user?.id;
  const table_name = `${app}_settings`;

  const isValidTableName = (tableName: string): tableName is ValidTableNames => {
    const validTables: ValidTableNames[] = [
      'discord_settings',
      'github_settings',
      'slack_settings',
    ];
    return validTables.includes(tableName as ValidTableNames);
  };

  if (!user_id) {
    return (
      <>
        <h1>user_idが見つかりません</h1>
      </>
    );
  }

  if (!isValidTableName(table_name)) {
    return (
      <>
        <h1>連携を削除しようとしているアプリはこのサイトではサポートしておりません</h1>
      </>
    );
  }

  const response = await supabase.from(table_name).delete().eq('user_id', user_id);

  if (response.error != null) {
    return (
      <>
        <h1>{response.error.hint}</h1>
      </>
    );
  }

  redirect(redirect_uri);
};

export default DeleteSettings;
