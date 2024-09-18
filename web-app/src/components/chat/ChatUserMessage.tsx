import { Delete, Edit } from "@mui/icons-material";
import { Box, Tooltip, Typography } from "@mui/material";
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
    <Box
      id="chat-user-message-container"
      className="flex gap-2 mb-4 justify-end"
    >
      <Box className="flex gap-1 items-center">
        <Tooltip id="delete-tooltip" title="Delete">
          <Delete
            aria-label="delete message"
            className="!text-lg cursor-pointer"
            onClick={onDeleteMessage}
          />
        </Tooltip>
        <Tooltip id="delete-tooltip" title="Edit">
          <Edit
            id="edit-tooltip"
            aria-label="edit message"
            className="!text-lg cursor-pointer"
            onClick={() => onEditMessage(message)}
          />
        </Tooltip>
      </Box>
      <Box className="bg-gray-100 p-2 rounded-md items-center ">
        <Typography id="chat-user-message" variant="caption">
          {message.content}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatUserMessage;
