import { Delete, Edit } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { ChatMessage } from "../../types";

interface ChatUserMessageProps {
  message: ChatMessage;
  onEditMessage: (message: ChatMessage) => void;
  onDeleteMessage: () => void;
}

const ChatUserMessage = ({
  message,
  onEditMessage,
  onDeleteMessage,
}: ChatUserMessageProps) => {
  return (
    <Box className="flex gap-2 mb-4 justify-end">
      <Box className="flex gap-1 items-center">
        <Delete className="!text-lg" onClick={onDeleteMessage} />
        <Edit className="!text-lg" onClick={() => onEditMessage(message)} />
      </Box>
      <Box className="bg-gray-100 p-2 rounded-md items-center ">
        <Typography variant="caption">{message.content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatUserMessage;
