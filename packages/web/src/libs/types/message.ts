export type Message = {
  id: string;
  app: 'discord' | 'slack' | 'github';
  sender_image: string;
  sender_name: string;
  content: string;
  message_link: string;
  sentiment?: string;
  priority?: 1 | 2 | 3 | 4 | 5;
  send_at: string;
};
