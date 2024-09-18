import { Box, Typography } from "@mui/material";
import AppLink from "./AppLink";
import { LinkedIn, GitHub } from "@mui/icons-material";

const LinkContainer = () => {
  return (
    <Box
      className="flex flex-col items-center text-white pt-10 px-5"
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
      <Typography className="mt-10" variant="h5">
        Note: to start a new session, please reload the page
      </Typography>
    </Box>
  );
};

export default LinkContainer;
