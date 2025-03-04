import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SavingsCard } from "../SavingsCard";

describe("SavingsCard Component", () => {
  const defaultProps = {
    current: 5000,
    goal: 10000,
  };

  test("renders the savings goal amount", () => {
    render(<SavingsCard {...defaultProps} />);
    expect(screen.getByText("$10,000")).toBeInTheDocument();
  });

  test("renders the current savings amount", () => {
    render(<SavingsCard {...defaultProps} />);
    expect(screen.getByText("$5,000 saved")).toBeInTheDocument();
  });

  test("shows the correct progress percentage", () => {
    render(<SavingsCard {...defaultProps} />);
    expect(screen.getByText("50.0% complete")).toBeInTheDocument();
  });

  test("displays monthly target when provided", () => {
    render(<SavingsCard {...defaultProps} monthlyTarget={500} />);
    expect(screen.getByText("Target: $500/month")).toBeInTheDocument();
  });

  test("does not display monthly target when not provided", () => {
    render(<SavingsCard {...defaultProps} />);
    expect(screen.queryByText(/Target:/)).not.toBeInTheDocument();
  });

  test("displays target date when provided", () => {
    render(<SavingsCard {...defaultProps} targetDate="2025-12-31" />);
    expect(screen.getByText("Target date: 2025-12-31")).toBeInTheDocument();
  });

  test("displays projected date when provided", () => {
    render(
      <SavingsCard
        {...defaultProps}
        targetDate="2025-12-31"
        projectedDate="2025-10-15"
      />
    );
    expect(
      screen.getByText("Projected completion: 2025-10-15")
    ).toBeInTheDocument();
  });

  test("displays on-track status when projected date is before target date", () => {
    render(
      <SavingsCard
        {...defaultProps}
        targetDate="2025-12-31"
        projectedDate="2025-10-15"
      />
    );
    expect(screen.queryByText(/behind schedule/)).not.toBeInTheDocument();
  });

  test("displays behind schedule status when projected date is after target date", () => {
    render(
      <SavingsCard
        {...defaultProps}
        targetDate="2025-10-15"
        projectedDate="2025-12-31"
      />
    );
    expect(screen.getByText(/behind schedule/)).toBeInTheDocument();
  });

  test("renders recent savings when provided", () => {
    const recentSavings = [
      { date: "2025-01-15", amount: 500 },
      { date: "2025-01-01", amount: 300 },
    ];

    render(<SavingsCard {...defaultProps} recentSavings={recentSavings} />);
    expect(screen.getByText("Recent savings:")).toBeInTheDocument();
    expect(screen.getByText("2025-01-15")).toBeInTheDocument();
    expect(screen.getByText("$500")).toBeInTheDocument();
    expect(screen.getByText("2025-01-01")).toBeInTheDocument();
    expect(screen.getByText("$300")).toBeInTheDocument();
  });

  test("displays appropriate message when no recent savings", () => {
    render(<SavingsCard {...defaultProps} recentSavings={[]} />);
    expect(screen.getByText("No recent savings recorded")).toBeInTheDocument();
  });
});
