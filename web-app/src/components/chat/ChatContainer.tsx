import {
  Box,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useChatSession } from "../../providers";
import { useRef, useState } from "react";
import { ChatMessage } from "../../types";
import { createMessage, deleteMessage, editMessage } from "../../utils";
import { AccountCircle, Close, Edit, Send } from "@mui/icons-material";
import ConfirmationDialog from "./../ConfirmationDialog";
import ChatHeader from "./ChatHeader";
import ChatBotMessage from "./ChatBotMessage";
import ChatUserMessage from "./ChatUserMessage";

const ChatContainer = () => {
  const { session, setSession } = useChatSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedMessageId, setEditedMessageId] = useState<string | undefined>();
  const [deletedMessageId, setDeletedMessageId] = useState<
    string | undefined
  >();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    try {
      setLoading(true);
      if (session?.id) {
        if (editedMessageId) {
          const { data: updated_session } = await editMessage({
            id: editedMessageId,
            content: message,
          });
          setSession(updated_session);
          handleCancelEdit();
        } else {
          const { data: updated_session } = await createMessage({
            session_id: session?.id,
            content: message,
          });
          setSession(updated_session);
          setMessage("");
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    scrollToBottom();
  };

  const handleEditMessage = async (chatMessage: ChatMessage) => {
    setEditedMessageId(chatMessage.id);
    setMessage(chatMessage.content);
  };

  const handleCancelEdit = () => {
    setEditedMessageId(undefined);
    setMessage("");
  };

  const handleDeleteMessage = async (response: boolean) => {
    try {
      setOpenDeleteConfirmation(false);
      if (deletedMessageId && response && session?.id) {
        setLoading(true);
        const { data: updated_session } = await deleteMessage(deletedMessageId);
        setSession(updated_session);
        setDeletedMessageId(undefined);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    setTimeout(() =>
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "start",
      })
    );
  };

  return (
    <Box
      className="p-3 flex flex-col"
      sx={{
        width: 320,
        height: 600,
      }}
    >
      <ChatHeader />
      {!editedMessageId && (
        <Box className="overflow-y-auto">
          {session?.messages.map((message, i) => (
            <Box key={i}>
              {message.is_bot_message ? (
                <ChatBotMessage message={message} />
              ) : (
                <ChatUserMessage
                  message={message}
                  onEditMessage={handleEditMessage}
                  onDeleteMessage={() => {
                    setDeletedMessageId(message.id);
                    setOpenDeleteConfirmation(true);
                  }}
                />
              )}
            </Box>
          ))}
          <Box ref={messagesEndRef} />
        </Box>
      )}

      <Divider className="!mt-auto !my-4" />
      {editedMessageId && (
        <Box className="flex items-center mb-3 gap-1 bg-gray-50 p-3">
          <Edit className="!text-sm" />
          <Typography variant="caption">Editing message</Typography>
          <Close className="ml-auto mr-0" onClick={handleCancelEdit} />
        </Box>
      )}
      <Box className="flex gap-3 items-end mb-2">
        <Box className="w-full flex items-end">
          <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
          <TextField
            id="input-chat-message"
            label="Your question"
            className="w-full"
            variant="standard"
            multiline
            maxRows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Box>
        {loading || !session?.id ? (
          <Box className="flex">
            <CircularProgress className="!h-6 !w-6" color="inherit" />
          </Box>
        ) : (
          <Send onClick={handleSendMessage} />
        )}
      </Box>

      <ConfirmationDialog
        onClose={(response) => handleDeleteMessage(response)}
        open={openDeleteConfirmation}
        title="Are you sure you want to delete this comment?"
        contentText="All subsequent comments will be deleted as well."
      />
    </Box>
  );
};

export default ChatContainer;
