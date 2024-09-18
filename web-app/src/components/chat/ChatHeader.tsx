import { SupportAgent } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const ChatHeader = () => {
  return (
    <Box className="flex flex-col items-center pt-2 pb-3 mb-2">
      <SupportAgent className="mb-2" />
      <Typography variant="body1" className="font-bold">
        Hey 👋, I'm Ava
      </Typography>
      <Typography variant="caption" className="!font-light">
        Ask me anything, I'm here to help you.
      </Typography>
    </Box>
  );
};

export default ChatHeader;
