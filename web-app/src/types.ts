export type ChatMessage = {
  id: string;
  content: string;
  is_bot_message: boolean;
  created_at: Date;
  updated_at: Date;
};

export type ChatSession = {
  id: string;
  is_active: boolean;
  messages: ChatMessage[];
};
