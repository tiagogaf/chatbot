import { Box } from "@mui/material";
import AppLink from "./AppLink";
import { LinkedIn, GitHub } from "@mui/icons-material";

const LinkContainer = () => {
  return (
    <Box
      className="flex flex-col justify-center items-center"
      sx={{
        height: "100vh",
      }}
    >
      <AppLink link="https://www.linkedin.com/in/tiagof7/">
        <LinkedIn className="mr-3" />
        My Profile
      </AppLink>
      <AppLink link="https://github.com/tiagogaf/chatbot/">
        <GitHub className="mr-3" />
        Code + Documentation
      </AppLink>
    </Box>
  );
};

export default LinkContainer;
