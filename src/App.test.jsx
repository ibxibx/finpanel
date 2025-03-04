import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock the components that App renders to simplify testing
jest.mock(
  "./pages/Dashboard",
  () => {
    return function MockDashboard() {
      return <div data-testid="dashboard-page">Dashboard Page</div>;
    };
  },
  { virtual: true }
);

jest.mock(
  "./pages/TransactionHistory",
  () => {
    return function MockTransactionHistory() {
      return (
        <div data-testid="transactions-page">Transaction History Page</div>
      );
    };
  },
  { virtual: true }
);

jest.mock(
  "./pages/Settings",
  () => {
    return function MockSettings() {
      return <div data-testid="settings-page">Settings Page</div>;
    };
  },
  { virtual: true }
);

jest.mock(
  "./pages/ErrorBoundaryDemo",
  () => {
    return function MockErrorBoundaryDemo() {
      return <div data-testid="error-demo-page">Error Boundary Demo Page</div>;
    };
  },
  { virtual: true }
);

jest.mock(
  "./pages/PerformanceDemo",
  () => {
    return function MockPerformanceDemo() {
      return (
        <div data-testid="performance-demo-page">Performance Demo Page</div>
      );
    };
  },
  { virtual: true }
);

// Mock the contexts
jest.mock("./contexts/LoadingContext", () => ({
  LoadingProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("./contexts/TransactionContext", () => ({
  TransactionProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("./contexts/CryptoContext", () => ({
  CryptoProvider: ({ children }) => <div>{children}</div>,
}));

// Mock the session timer to avoid timer-related issues in tests
jest.mock("./components/SessionTimer", () => {
  return function MockSessionTimer() {
    return <div data-testid="session-timer">Session Time: 00:00</div>;
  };
});

// Mock ErrorBoundary
jest.mock("./components/ErrorBoundary", () => {
  return function MockErrorBoundary({ children }) {
    return <div>{children}</div>;
  };
});

// Now import App after all mocks are set up
import App from "./App";

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
});
