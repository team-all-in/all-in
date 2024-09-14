export type Message = {
  id: string;
  app: 'discord' | 'slack' | 'github';
  sender_image: string;
  sender_name: string;
  content: string;
  message_link: string;
  sentiment?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent' | 'critical';
  send_at: string;
};
