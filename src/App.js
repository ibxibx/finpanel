import React, { useState, useEffect } from "react";
import { DashboardCard } from "./components/DashboardCard";
import { CryptoCard } from "./components/CryptoCard";
import { SavingsCard } from "./components/SavingsCard";
import LoadingOverlay from "./components/LoadingOverlay";
import { TransactionsCard } from "./components/TransactionsCard";
import { AddTransactionForm } from "./components/AddTransactionForm";

function App() {
  // Main financial data state
  const [financialData, setFinancialData] = useState({
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
    transactions: [
      {
        id: "tx1",
        date: "2025-01-31 14:30",
        description: "Salary Deposit",
        amount: 6000.0,
        type: "income",
        category: "Salary",
      },
      {
        id: "tx2",
        date: "2025-01-31 12:15",
        description: "Grocery Shopping",
        amount: 150.75,
        type: "expense",
        category: "Groceries",
      },
      {
        id: "tx3",
        date: "2025-01-31 10:00",
        description: "Bitcoin Purchase",
        amount: 500.0,
        type: "investment",
        category: "Crypto",
      },
      {
        id: "tx4",
        date: "2025-01-30 15:45",
        description: "Rent Payment",
        amount: 2000.0,
        type: "expense",
        category: "Housing",
      },
      {
        id: "tx5",
        date: "2025-01-30 09:30",
        description: "Freelance Payment",
        amount: 800.0,
        type: "income",
        category: "Freelance",
      },
    ],
  });

  // State for showing/hiding transaction form
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // State for refresh/loading status
  const [isRefreshing, setIsRefreshing] = useState(false);
  // State for error handling
  const [error, setError] = useState(null);
  // State for individual section loading states
  const [loadingStates, setLoadingStates] = useState({
    crypto: false,
    balance: false,
    income: false,
    expenses: false,
    savings: false,
  });
  // State for last update timestamp
  const [lastUpdateTime, setLastUpdateTime] = useState(
    new Date().toLocaleString()
  );

  // Handler for adding new transactions
  const handleAddTransaction = (newTransaction) => {
    setFinancialData((prevData) => {
      // Add new transaction to the list
      const updatedTransactions = [newTransaction, ...prevData.transactions];

      // Update relevant financial data based on transaction type
      let updates = { transactions: updatedTransactions };

      const amount = newTransaction.amount;

      // Update account balance
      if (newTransaction.type === "expense") {
        updates.accountBalance = {
          ...prevData.accountBalance,
          current: prevData.accountBalance.current - amount,
        };
      } else if (newTransaction.type === "income") {
        updates.accountBalance = {
          ...prevData.accountBalance,
          current: prevData.accountBalance.current + amount,
        };
      }

      // Update monthly income/expenses if the transaction is from current month
      const currentMonth = new Date().getMonth();
      const transactionMonth = new Date(newTransaction.date).getMonth();

      if (currentMonth === transactionMonth) {
        if (newTransaction.type === "income") {
          updates.monthlyIncome = {
            ...prevData.monthlyIncome,
            current: prevData.monthlyIncome.current + amount,
          };
        } else if (newTransaction.type === "expense") {
          updates.monthlyExpenses = {
            ...prevData.monthlyExpenses,
            current: prevData.monthlyExpenses.current + amount,
          };
        }
      }

      return {
        ...prevData,
        ...updates,
      };
    });
  };

  // Function to simulate data refresh
  const refreshData = async () => {
    setIsRefreshing(true);
    setError(null);
    // Set all sections to loading
    setLoadingStates({
      crypto: true,
      balance: true,
      income: true,
      expenses: true,
      savings: true,
    });

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulate random data updates
      setFinancialData((prevData) => ({
        ...prevData,
        accountBalance: {
          ...prevData.accountBalance,
          current: Math.round(
            prevData.accountBalance.current *
              (1 + (Math.random() * 0.02 - 0.01))
          ),
          lastUpdated: new Date().toLocaleString(),
        },
        crypto: {
          ...prevData.crypto,
          totalValue: Math.round(
            prevData.crypto.totalValue * (1 + (Math.random() * 0.04 - 0.02))
          ),
          change24h: Number(
            (prevData.crypto.change24h + (Math.random() * 2 - 1)).toFixed(2)
          ),
          lastUpdated: new Date().toLocaleString(),
        },
      }));

      setLastUpdateTime(new Date().toLocaleString());
    } catch (error) {
      setError("Failed to refresh financial data. Please try again.");
      console.error("Error refreshing data:", error);
    } finally {
      setIsRefreshing(false);
      // Reset all loading states
      setLoadingStates({
        crypto: false,
        balance: false,
        income: false,
        expenses: false,
        savings: false,
      });
    }
  };

  // Refresh data every 30 seconds
  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Check if data is available
  const hasData = Object.keys(financialData).length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">FinPanel Dashboard</h1>
            <p className="text-sm">Your Personal Finance Tracker</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs">Last updated: {lastUpdateTime}</span>
            <button
              onClick={refreshData}
              disabled={isRefreshing}
              className={`px-4 py-2 rounded bg-blue-500 hover:bg-blue-400 transition-colors
                ${isRefreshing ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>
      </header>

      <main className="p-4">
        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {!hasData ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading financial data...</p>
          </div>
        ) : (
          <>
            <div className="relative">
              {loadingStates.crypto && (
                <LoadingOverlay message="Updating crypto data..." />
              )}
              <CryptoCard
                totalValue={financialData.crypto.totalValue}
                change24h={financialData.crypto.change24h}
                lastUpdated={financialData.crypto.lastUpdated}
                holdings={financialData.crypto.holdings}
                dominantCoin={financialData.crypto.dominantCoin}
                marketTrend={financialData.crypto.marketTrend}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative">
                {loadingStates.balance && (
                  <LoadingOverlay message="Updating balance..." />
                )}
                <DashboardCard
                  title="Current Balance"
                  value={financialData.accountBalance.current}
                  previousValue={financialData.accountBalance.previous}
                  percentageChange={
                    financialData.accountBalance.percentageChange
                  }
                  lastUpdated={financialData.accountBalance.lastUpdated}
                />
              </div>

              <div className="relative">
                {loadingStates.income && (
                  <LoadingOverlay message="Updating income..." />
                )}
                <DashboardCard
                  title="Monthly Income"
                  value={financialData.monthlyIncome.current}
                  previousValue={financialData.monthlyIncome.previous}
                  percentageChange={
                    financialData.monthlyIncome.percentageChange
                  }
                  valueColor="green-600"
                  lastUpdated={financialData.monthlyIncome.lastUpdated}
                />
              </div>

              <div className="relative">
                {loadingStates.expenses && (
                  <LoadingOverlay message="Updating expenses..." />
                )}
                <DashboardCard
                  title="Monthly Expenses"
                  value={financialData.monthlyExpenses.current}
                  previousValue={financialData.monthlyExpenses.previous}
                  percentageChange={
                    financialData.monthlyExpenses.percentageChange
                  }
                  valueColor="red-600"
                  lastUpdated={financialData.monthlyExpenses.lastUpdated}
                />
              </div>

              <div className="relative">
                {loadingStates.savings && (
                  <LoadingOverlay message="Updating savings..." />
                )}
                <SavingsCard
                  current={financialData.savings.current}
                  goal={financialData.savings.goal}
                  monthlyTarget={financialData.savings.monthlyTarget}
                  targetDate={financialData.savings.targetDate}
                  projectedDate={financialData.savings.projectedDate}
                  recentSavings={financialData.savings.recentSavings}
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                  <button
                    onClick={() => setShowTransactionForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add Transaction
                  </button>
                </div>
                <TransactionsCard transactions={financialData.transactions} />
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
                <p className="text-gray-500">
                  Budget breakdown will be displayed here
                </p>
              </div>
            </div>

            {showTransactionForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="max-w-md w-full">
                  <AddTransactionForm
                    onAddTransaction={handleAddTransaction}
                    onClose={() => setShowTransactionForm(false)}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
