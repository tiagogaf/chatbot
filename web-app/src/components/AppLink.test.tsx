import React from "react";
import { render, screen } from "@testing-library/react";
import AppLink from "./AppLink";

test("renders AppLink component", () => {
  render(<AppLink link="https://example.com">Testing</AppLink>);
  expect(
    screen.getByRole("link", {
      name: /testing/i,
    })
  ).toBeInTheDocument();
});
