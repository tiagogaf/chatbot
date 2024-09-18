import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders chatbot app", () => {
  render(<App />);
  expect(
    screen.getByRole("link", {
      name: /my profile/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("link", {
      name: /code \+ documentation/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", {
      name: /note: to start a new session, please reload the page/i,
    })
  ).toBeInTheDocument();
});
