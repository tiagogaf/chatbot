export type ChatContext = {
  id: string;
  name: string;
};

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
  context: ChatContext;
  messages: ChatMessage[];
};
