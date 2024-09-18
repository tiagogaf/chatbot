import React from "react";
import { render, screen } from "@testing-library/react";
import ChatBotMessage from "./ChatBotMessage";
import { ChatMessage } from "../../types";

test("renders ChatBotMessage component", () => {
  render(
    <ChatBotMessage message={{ content: "bot message" } as ChatMessage} />
  );
  expect(screen.getByText(/bot message/i)).toBeInTheDocument();
});
