import "./App.css";
import { ChatIcon, LinkContainer } from "./components";
import { Box } from "@mui/material";
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
