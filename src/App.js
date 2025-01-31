import React from "react";
import { DashboardCard } from "./components/DashboardCard";
import { CryptoCard } from "./components/CryptoCard";
import { SavingsCard } from "./components/SavingsCard";

function App() {
  const financialData = {
    accountBalance: {
      current: 10000,
      previous: 8800,
      percentageChange: 13.63,
      lastUpdated: "2025-01-31 14:30",
    },
    monthlyIncome: {
      current: 6000,
      previous: 4900,
      percentageChange: 22.44,
      lastUpdated: "2025-01-31",
    },
    monthlyExpenses: {
      current: 4000,
      previous: 3100,
      percentageChange: 29.03,
      lastUpdated: "2025-01-31",
    },
    crypto: {
      totalValue: 2500,
      change24h: 5.2,
      lastUpdated: "2025-01-31 14:30",
      marketTrend: "bull",
      holdings: [
        { symbol: "BTC", value: 1500 },
        { symbol: "ETH", value: 600 },
        { symbol: "SOL", value: 250 },
        { symbol: "DOT", value: 150 },
      ],
      dominantCoin: { symbol: "BTC", value: 1500 },
    },
    savings: {
      current: 5000,
      goal: 10000,
      monthlyTarget: 500,
      targetDate: "2025-12-31",
      projectedDate: "2025-10-15",
      recentSavings: [
        { date: "2025-01-30", amount: 300 },
        { date: "2025-01-15", amount: 400 },
        { date: "2025-01-01", amount: 500 },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">FinPanel Dashboard</h1>
        <p className="text-sm">Your Personal Finance Tracker</p>
      </header>

      <main className="p-4">
        <CryptoCard
          totalValue={financialData.crypto.totalValue}
          change24h={financialData.crypto.change24h}
          lastUpdated={financialData.crypto.lastUpdated}
          holdings={financialData.crypto.holdings}
          dominantCoin={financialData.crypto.dominantCoin}
          marketTrend={financialData.crypto.marketTrend}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Current Balance"
            value={financialData.accountBalance.current}
            previousValue={financialData.accountBalance.previous}
            percentageChange={financialData.accountBalance.percentageChange}
            lastUpdated={financialData.accountBalance.lastUpdated}
          />

          <DashboardCard
            title="Monthly Income"
            value={financialData.monthlyIncome.current}
            previousValue={financialData.monthlyIncome.previous}
            percentageChange={financialData.monthlyIncome.percentageChange}
            valueColor="green-600"
            lastUpdated={financialData.monthlyIncome.lastUpdated}
          />

          <DashboardCard
            title="Monthly Expenses"
            value={financialData.monthlyExpenses.current}
            previousValue={financialData.monthlyExpenses.previous}
            percentageChange={financialData.monthlyExpenses.percentageChange}
            valueColor="red-600"
            lastUpdated={financialData.monthlyExpenses.lastUpdated}
          />

          <SavingsCard
            current={financialData.savings.current}
            goal={financialData.savings.goal}
            monthlyTarget={financialData.savings.monthlyTarget}
            targetDate={financialData.savings.targetDate}
            projectedDate={financialData.savings.projectedDate}
            recentSavings={financialData.savings.recentSavings}
          />
        </div>

        {/* Placeholder Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <p className="text-gray-500">
              Transaction history will be displayed here
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
            <p className="text-gray-500">
              Budget breakdown will be displayed here
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
