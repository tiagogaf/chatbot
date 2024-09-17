import "./App.css";
import { LinkContainer } from "./components";
import { Box } from "@mui/material";
import ChatIcon from "./components/ChatIcon";
import { ChatSessionProvider } from "./providers";

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
