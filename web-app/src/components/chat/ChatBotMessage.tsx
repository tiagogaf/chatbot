import { SupportAgent } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ChatMessage } from "../../types";

interface ChatBotMessageProps {
  message: ChatMessage;
}

const ChatBotMessage = ({ message }: ChatBotMessageProps) => {
  return (
    <Box className="flex gap-2 mb-4">
      <SupportAgent />
      <Box className="bg-gray-100 p-2 rounded-md">
        <Typography variant="caption">{message.content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatBotMessage;
