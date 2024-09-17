import { useState } from "react";
import { ContactSupportOutlined } from "@mui/icons-material";
import Popper from "@mui/material/Popper";
import { Box } from "@mui/material";
import ChatContainer from "./ChatContainer";

const ChatIcon = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  return (
    <Box className="absolute right-3 bottom-3 cursor-pointer">
      <Box onClick={handleClick}>
        <ContactSupportOutlined />
      </Box>
      <Popper open={open} anchorEl={anchorEl}>
        <ChatContainer />
      </Popper>
    </Box>
  );
};

export default ChatIcon;
