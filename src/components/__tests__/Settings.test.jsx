import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Settings from "../pages/Settings";

describe("Settings Component", () => {
  test("renders the settings title", () => {
    render(<Settings />);
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("renders the preferences section", () => {
    render(<Settings />);
    expect(screen.getByText("Preferences")).toBeInTheDocument();
  });

  test("renders notification checkbox", () => {
    render(<Settings />);
    const checkbox = screen.getByLabelText("Enable notifications");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("renders dark mode checkbox", () => {
    render(<Settings />);
    const checkbox = screen.getByLabelText("Dark mode");
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test("notification checkbox can be toggled", () => {
    render(<Settings />);
    const checkbox = screen.getByLabelText("Enable notifications");

    // Initial state should be unchecked
    expect(checkbox).not.toBeChecked();

    // Click to check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click again to uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test("dark mode checkbox can be toggled", () => {
    render(<Settings />);
    const checkbox = screen.getByLabelText("Dark mode");

    // Initial state should be unchecked
    expect(checkbox).not.toBeChecked();

    // Click to check
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    // Click again to uncheck
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
