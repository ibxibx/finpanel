import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DashboardCard } from "../DashboardCard";

describe("DashboardCard Component", () => {
  test("renders the card title correctly", () => {
    render(<DashboardCard title="Test Title" value={1000} />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders the value with proper formatting", () => {
    render(<DashboardCard title="Test Card" value={1000} />);
    expect(screen.getByText("$1,000")).toBeInTheDocument();
  });

  test("displays percentage change when provided", () => {
    render(
      <DashboardCard
        title="Test Card"
        value={1000}
        previousValue={800}
        percentageChange={25}
      />
    );
    expect(screen.getByText("25.00%")).toBeInTheDocument();
  });

  test("does not show percentage change when not provided", () => {
    render(<DashboardCard title="Test Card" value={1000} />);
    expect(screen.queryByText("%")).not.toBeInTheDocument();
  });

  test("renders children when passed", () => {
    render(
      <DashboardCard title="Test Card" value={1000}>
        <div>Child Element</div>
      </DashboardCard>
    );
    expect(screen.getByText("Child Element")).toBeInTheDocument();
  });

  test("displays the subtitle when provided", () => {
    render(
      <DashboardCard title="Test Card" value={1000} subtitle="Test Subtitle" />
    );
    expect(screen.getByText("Test Subtitle")).toBeInTheDocument();
  });

  test("handles null value gracefully", () => {
    render(<DashboardCard title="Test Card" value={null} />);
    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
