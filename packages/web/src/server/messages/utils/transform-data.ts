import type { Database } from '~/libs/types/database';

export function transformData(data: Database['public']['Tables']['messages']['Row'][]) {
  return data.map(item => ({
    app: item.app,
    server_id: item.server_id,
    message_id: item.message_id,
    channel_id: item.channel_id,
  }));
}
