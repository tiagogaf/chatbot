import { Box, Button, Input, Typography } from "@mui/material";
import { useChatSession } from "../providers";
import { useState } from "react";
import { ChatMessage } from "../types";
import { createMessage, deleteMessage, editMessage } from "../utils";
import { Close, Delete, Edit } from "@mui/icons-material";
import ConfirmationDialog from "./ConfirmationDialog";

const ChatContainer = () => {
  const { session, setSession } = useChatSession();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [editedMessageId, setEditedMessageId] = useState<string | undefined>();
  const [deletedMessageId, setDeletedMessageId] = useState<
    string | undefined
  >();
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

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
      {editedMessageId ? (
        <Box>
          <Edit />
          <Typography variant="caption">Editing message</Typography>
          <Close onClick={handleCancelEdit} />
        </Box>
      ) : (
        <Box>
          {session?.messages.map((message, i) => (
            <Box key={i}>
              <Typography>{message.content}</Typography>
              {!message.is_bot_message && (
                <Box>
                  <Delete
                    onClick={() => {
                      setDeletedMessageId(message.id);
                      setOpenDeleteConfirmation(true);
                    }}
                  />
                  <Edit onClick={() => handleEditMessage(message)} />
                </Box>
              )}
            </Box>
          ))}
        </Box>
      )}

      <Box>
        <Input value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button onClick={handleSendMessage} disabled={loading || !session?.id}>
          Send
        </Button>
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
