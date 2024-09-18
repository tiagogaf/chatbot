import "./App.css";
import { LinkContainer } from "./components";
import { Box } from "@mui/material";
import { ChatSessionProvider, colors, MaterialUIProvider } from "./providers";
import { ChatIcon } from "./components/chat";

function App() {
  return (
    <MaterialUIProvider>
      <Box
        sx={{
          backgroundColor: colors.cetaceanBlue,
        }}
      >
        <ChatSessionProvider>
          <LinkContainer />
          <ChatIcon />
        </ChatSessionProvider>
      </Box>
    </MaterialUIProvider>
  );
}

export default App;
