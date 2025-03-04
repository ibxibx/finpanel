import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../App";

// Mock the components that App renders to simplify testing
jest.mock("../pages/Dashboard", () => {
  return function MockDashboard() {
    return <div data-testid="dashboard-page">Dashboard Page</div>;
  };
});

jest.mock("../pages/TransactionHistory", () => {
  return function MockTransactionHistory() {
    return <div data-testid="transactions-page">Transaction History Page</div>;
  };
});

jest.mock("../pages/Settings", () => {
  return function MockSettings() {
    return <div data-testid="settings-page">Settings Page</div>;
  };
});

jest.mock("../pages/ErrorBoundaryDemo", () => {
  return function MockErrorBoundaryDemo() {
    return <div data-testid="error-demo-page">Error Boundary Demo Page</div>;
  };
});

jest.mock("../pages/PerformanceDemo", () => {
  return function MockPerformanceDemo() {
    return <div data-testid="performance-demo-page">Performance Demo Page</div>;
  };
});

// Mock the session timer to avoid timer-related issues in tests
jest.mock("../components/SessionTimer", () => {
  return function MockSessionTimer() {
    return <div data-testid="session-timer">Session Time: 00:00</div>;
  };
});

describe("App Component", () => {
  test("renders the header and navigation", () => {
    render(<App />);

    // Check that the header elements are rendered
    expect(screen.getByText("FinPanel Dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Your Personal Finance Tracker")
    ).toBeInTheDocument();

    // Check navigation links
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Transactions")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  test("renders the session timer", () => {
    render(<App />);
    expect(screen.getByTestId("session-timer")).toBeInTheDocument();
  });

  test("renders the Dashboard page by default", () => {
    render(<App />);
    expect(screen.getByTestId("dashboard-page")).toBeInTheDocument();
  });
});
