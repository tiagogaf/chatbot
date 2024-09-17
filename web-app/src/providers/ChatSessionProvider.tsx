import { createContext, PropsWithChildren, useContext, useState } from "react";
import { ChatSession } from "../types";

interface ChatSessionContextType {
  session: ChatSession | null;
  setSession: (sessionId: ChatSession | null) => void;
}

const ChatSessionContext = createContext<ChatSessionContextType | undefined>(
  undefined
);

export const useChatSession = () => {
  const context = useContext(ChatSessionContext);
  if (!context) {
    throw new Error("useChatSession must be used within a ChatSessionProvider");
  }
  return context;
};

export const ChatSessionProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<ChatSession | null>(null);

  return (
    <ChatSessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  );
};
