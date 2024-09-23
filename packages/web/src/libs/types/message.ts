export type Message = {
  id: string;
  app: 'discord' | 'slack' | 'github';
  sender_image: string;
  sender_name: string;
  server_image: string;
  server_name: string;
  channel_name: string;
  content: string;
  message_link: string;
  sentiment: string;
  priority: 1 | 2 | 3 | 4 | 5;
  send_at: string;
};

export type MessageResponse = Omit<
  Message,
  'send_at' | 'message_link' | 'priority' | 'sentiment' | 'app'
> & {
  app: 'discord' | 'slack';
};
