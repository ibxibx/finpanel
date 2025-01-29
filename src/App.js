import React from "react";

function App() {
  // Sample data - later will be replaced with real data
  const accountBalance = 5000;
  const monthlyIncome = 3000;
  const monthlyExpenses = 2000;
  const savingsGoal = 10000;
  const cryptoWalletValue = 2500;
  const cryptoChange24h = 5.2; // Percentage change in last 24h

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="bg-blue-600 p-4 text-white">
        <h1 className="text-2xl font-bold">FinPanel Dashboard</h1>
        <p className="text-sm">Your Personal Finance Tracker</p>
      </header>

      {/* Main Dashboard Grid */}
      <main className="p-4">
        {/* Crypto Overview Section */}
        <div className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg shadow text-white">
          <h2 className="text-lg font-semibold mb-2">Crypto Portfolio</h2>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Total Value</p>
              <p className="text-2xl font-bold">
                ${cryptoWalletValue.toLocaleString()}
              </p>
            </div>
            <div
              className={`text-right ${
                cryptoChange24h >= 0 ? "text-green-300" : "text-red-300"
              }`}
            >
              <p className="text-sm opacity-80">24h Change</p>
              <p className="text-xl font-bold">
                {cryptoChange24h >= 0 ? "+" : ""}
                {cryptoChange24h}%
              </p>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Account Balance Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm">Current Balance</h2>
            <p className="text-2xl font-bold">
              ${accountBalance.toLocaleString()}
            </p>
          </div>

          {/* Monthly Income Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm">Monthly Income</h2>
            <p className="text-2xl font-bold text-green-600">
              ${monthlyIncome.toLocaleString()}
            </p>
          </div>

          {/* Monthly Expenses Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm">Monthly Expenses</h2>
            <p className="text-2xl font-bold text-red-600">
              ${monthlyExpenses.toLocaleString()}
            </p>
          </div>

          {/* Savings Goal Card */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-gray-600 text-sm">Savings Goal</h2>
            <p className="text-2xl font-bold text-blue-600">
              ${savingsGoal.toLocaleString()}
            </p>
            {/* Basic progress bar - will be enhanced later */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${(accountBalance / savingsGoal) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Placeholder for future components */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Transaction History Section - to be implemented */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
            <p className="text-gray-500">
              Transaction history will be displayed here
            </p>
          </div>

          {/* Budget Overview Section - to be implemented */}
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
