import { createClient } from '~/libs/supabase/server';
import { getUser } from '../auth/data';

type tableType = 'discord_settings' | 'slack_settings' | 'github_settings';

const deleteSettings = async (app: string) => {
  const user = await getUser();
  const supabase = createClient();

  if (!user) {
    return '';
  }

  const fetchCurrentSettings = async (table: tableType) => {
    const { data, error } = await supabase.from(table).select('*').eq('user_id', user.id).single();

    if (error) {
      console.error(`${table}の取得に失敗しました:`, error);
      return null;
    }
    return data;
  };

  const deleteSettings = async (table: tableType, updateData: object) => {
    const { error } = await supabase.from(table).delete().eq('user_id', user.id);

    if (error) {
      console.error(`${table}の削除に失敗しました:`, error);
      return true;
    }

    const { error: updateError } = await supabase
      .from('all-in-relation')
      .update(updateData)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('all-in-relationの更新に失敗しました:', updateError);
      return true;
    }

    return false;
  };

  const tableMapping: Record<string, { table: tableType; updateData: object }> = {
    discord: { table: 'discord_settings', updateData: { discord_member_id: null } },
    slack: { table: 'slack_settings', updateData: { slack_member_id: null } },
    github: { table: 'github_settings', updateData: {} },
  };

  const selectedApp = tableMapping[app];
  if (!selectedApp) {
    return '';
  }

  const currentSettings = await fetchCurrentSettings(selectedApp.table);
  if (!currentSettings) {
    return '';
  }

  const errorOccurred = await deleteSettings(selectedApp.table, selectedApp.updateData);

  if (errorOccurred) {
    const { error: rollbackError } = await supabase.from(selectedApp.table).insert(currentSettings);

    if (rollbackError) {
      console.error('ロールバックに失敗しました:', rollbackError);
    }
    return '';
  }
};

export default deleteSettings;
