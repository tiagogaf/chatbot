import { useState } from "react";
import { Chat, Cancel } from "@mui/icons-material";
import Popper from "@mui/material/Popper";
import { Box, Fade, Paper } from "@mui/material";
import ChatContainer from "./ChatContainer";
import { useChatSession } from "../providers";
import { createSession, getContexts } from "../utils/api";
import { ChatContext } from "../types";

const ChatIcon = () => {
  const { session, setSession } = useChatSession();
  const [contexts, setContexts] = useState<ChatContext[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (!session) {
      const { data: contexts } = await getContexts();
      setContexts(contexts);

      const { data: session } = await createSession({
        context_id: contexts[0].id,
      });
      setSession(session);
    }
  };

  return (
    <Box className="absolute right-3 bottom-3 cursor-pointer">
      <Box onClick={handleClick}>{open ? <Cancel /> : <Chat />}</Box>
      <Popper open={open} anchorEl={anchorEl} transition placement="left-end">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ChatContainer contexts={contexts} />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default ChatIcon;
