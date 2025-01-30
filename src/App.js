import React from "react";
import { DashboardCard } from "./components/DashboardCard";
import { CryptoCard } from "./components/CryptoCard";
import { SavingsCard } from "./components/SavingsCard";

function App() {
  // Sample data - later will be replaced with real data
  const accountBalance = 10000;
  const monthlyIncome = 6000;
  const monthlyExpenses = 4000;
  const savingsGoal = 20000;
  const cryptoWalletValue = 5000;
  const cryptoChange24h = 5.2; // Percentage change in last 24h

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">FinPanel Dashboard</h1>
        <p className="text-sm">Your Personal Finance Tracker</p>
      </header>

      <main className="p-4">
        <CryptoCard
          totalValue={cryptoWalletValue}
          change24h={cryptoChange24h}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard title="Current Balance" value={accountBalance} />

          <DashboardCard
            title="Monthly Income"
            value={monthlyIncome}
            valueColor="green-600"
          />

          <DashboardCard
            title="Monthly Expenses"
            value={monthlyExpenses}
            valueColor="red-600"
          />

          <SavingsCard current={accountBalance} goal={savingsGoal} />
        </div>

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
