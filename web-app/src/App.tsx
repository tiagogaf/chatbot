import "./App.css";
import { LinkContainer } from "./components";
import { Box } from "@mui/material";
import { ChatSessionProvider } from "./providers";
import { ChatIcon } from "./components/chat";

function App() {
  return (
    <Box>
      <ChatSessionProvider>
        <LinkContainer />
        <ChatIcon />
      </ChatSessionProvider>
    </Box>
  );
}

export default App;
