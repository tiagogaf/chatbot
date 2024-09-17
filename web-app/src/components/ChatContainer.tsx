import { Box, Button, Input, Typography } from "@mui/material";
import { useChatSession } from "../providers";
import { useState } from "react";
import { ChatContext } from "../types";
import { createMessage } from "../utils/api";

interface ChatContainerProps {
  contexts?: ChatContext[];
}

const ChatContainer = ({ contexts }: ChatContainerProps) => {
  const { session, setSession } = useChatSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    setLoading(true);
    if (session?.id) {
      const { data: updated_session } = await createMessage({
        session_id: session?.id,
        content: message,
      });
      setSession(updated_session);
      setMessage("");
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: 350,
      }}
    >
      <Typography variant="body1">Hey 👋, I'm Ava</Typography>
      <Typography variant="caption">
        Ask me anything or pick a place to start
      </Typography>
      <Box>
        {session?.messages.map((message, i) => (
          <Box key={i}>
            <Typography>{message.content}</Typography>
          </Box>
        ))}
      </Box>
      <Box>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={handleSendMessage} disabled={loading || !session?.id}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatContainer;
