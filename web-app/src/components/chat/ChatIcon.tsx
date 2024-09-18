import { useState } from "react";
import { Chat, Cancel } from "@mui/icons-material";
import Popper from "@mui/material/Popper";
import { Box, Fab, Fade, Paper } from "@mui/material";
import ChatContainer from "./ChatContainer";
import { useChatSession } from "../../providers";
import { createSession } from "../../utils";

const ChatIcon = () => {
  const { session, setSession } = useChatSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = async (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    if (!session) {
      const { data: session } = await createSession();
      setSession(session);
    }
  };

  return (
    <Box className="absolute right-3 bottom-3 cursor-pointer">
      <Fab color="primary" aria-label="add" onClick={handleClick}>
        {open ? <Cancel /> : <Chat />}
      </Fab>
      <Popper
        open={open}
        anchorEl={anchorEl}
        transition
        placement="left-end"
        className="!m-3"
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <ChatContainer />
            </Paper>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};

export default ChatIcon;
