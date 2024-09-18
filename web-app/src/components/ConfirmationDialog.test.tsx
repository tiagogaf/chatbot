import React from "react";
import { render, screen } from "@testing-library/react";
import ConfirmationDialog from "./ConfirmationDialog";

test("renders ConfirmationDialog component: opened", () => {
  render(
    <ConfirmationDialog
      open={true}
      onClose={() => null}
      title="My confirmation dialog"
    />
  );
  expect(
    screen.getByRole("heading", {
      name: /my confirmation dialog/i,
    })
  ).toBeInTheDocument();
});

test("renders ConfirmationDialog component: closed", () => {
  render(
    <ConfirmationDialog
      open={false}
      onClose={() => null}
      title="My confirmation dialog"
    />
  );
  expect(
    screen.queryByRole("heading", {
      name: /my confirmation dialog/i,
    })
  ).not.toBeInTheDocument();
});
