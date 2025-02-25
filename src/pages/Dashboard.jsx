import React, { useState, useEffect } from "react";
import { CryptoCard } from "../components/CryptoCard";
import { SavingsCard } from "../components/SavingsCard";
import LoadingOverlay from "../components/LoadingOverlay";
import { TransactionsCard } from "../components/TransactionsCard";
import { AddTransactionForm } from "../components/AddTransactionForm";
import { useLoading } from "../contexts/LoadingContext";
import MetricGroup from "../components/MetricGroup";
import RefreshableDashboardCard from "../components/RefreshableDashboardCard";
import withDataRefresh from "../hoc/withDataRefresh";
import ErrorBoundary from "../components/ErrorBoundary";

// Create enhanced components using our HOC
const BalanceCard = withDataRefresh(RefreshableDashboardCard, {
  dataType: "balance",
  refreshInterval: 60000, // 1 minute
});

const IncomeCard = withDataRefresh(RefreshableDashboardCard, {
  dataType: "income",
  refreshInterval: 90000, // 1.5 minutes
});

const ExpenseCard = withDataRefresh(RefreshableDashboardCard, {
  dataType: "expenses",
  refreshInterval: 90000, // 1.5 minutes
});

const Dashboard = () => {
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

  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(
    new Date().toLocaleString()
  );

  // Get loading context
  const { loadingStates, setAllLoading } = useLoading();

  // Handlers for data refresh
  const handleBalanceRefresh = (updatedData) => {
    setFinancialData((prevData) => ({
      ...prevData,
      accountBalance: {
        ...prevData.accountBalance,
        current: updatedData.current,
        percentageChange: updatedData.percentageChange,
        lastUpdated: new Date().toLocaleString(),
      },
    }));
  };

  const handleIncomeRefresh = (updatedData) => {
    setFinancialData((prevData) => ({
      ...prevData,
      monthlyIncome: {
        ...prevData.monthlyIncome,
        current: updatedData.current,
        percentageChange: updatedData.percentageChange,
        lastUpdated: new Date().toLocaleString(),
      },
    }));
  };

  const handleExpensesRefresh = (updatedData) => {
    setFinancialData((prevData) => ({
      ...prevData,
      monthlyExpenses: {
        ...prevData.monthlyExpenses,
        current: updatedData.current,
        percentageChange: updatedData.percentageChange,
        lastUpdated: new Date().toLocaleString(),
      },
    }));
  };

  const handleAddTransaction = (newTransaction) => {
    setFinancialData((prevData) => {
      const updatedTransactions = [newTransaction, ...prevData.transactions];
      let updates = { transactions: updatedTransactions };
      const amount = newTransaction.amount;

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

  const refreshData = async () => {
    setIsRefreshing(true);
    setError(null);
    setAllLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

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
      setAllLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, []);

  const hasData = Object.keys(financialData).length > 0;

  // Custom fallback UI for financial components
  const financialComponentFallback = (error, errorInfo) => (
    <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-sm">
      <h2 className="text-red-600 text-sm font-medium tracking-wide">
        Component Error
      </h2>
      <p className="mt-2 text-gray-600">
        We couldn't load this component. The data may be temporarily
        unavailable.
      </p>
      <p className="mt-2 text-xs text-gray-500">
        Try refreshing the page or come back later.
      </p>
    </div>
  );

  return (
    <main className="p-6 max-w-7xl mx-auto">
      {error && (
        <div className="mb-6 bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {!hasData ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading financial data...</p>
        </div>
      ) : (
        <>
          {/* Crypto Card with Error Boundary */}
          <ErrorBoundary fallback={financialComponentFallback}>
            <div className="relative">
              {loadingStates.crypto && (
                <LoadingOverlay message="Updating crypto data..." />
              )}
              <CryptoCard />
            </div>
          </ErrorBoundary>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Balance Card with Auto-Refresh & Error Boundary */}
            <ErrorBoundary fallback={financialComponentFallback}>
              <BalanceCard
                title="Current Balance"
                data={{
                  current: financialData.accountBalance.current,
                  previous: financialData.accountBalance.previous,
                  percentageChange:
                    financialData.accountBalance.percentageChange,
                }}
                onDataRefresh={handleBalanceRefresh}
              />
            </ErrorBoundary>

            {/* Income Card with Auto-Refresh & Error Boundary */}
            <ErrorBoundary fallback={financialComponentFallback}>
              <IncomeCard
                title="Monthly Income"
                data={{
                  current: financialData.monthlyIncome.current,
                  previous: financialData.monthlyIncome.previous,
                  percentageChange:
                    financialData.monthlyIncome.percentageChange,
                }}
                valueColor="green-600"
                onDataRefresh={handleIncomeRefresh}
              />
            </ErrorBoundary>

            {/* Expenses Card with Auto-Refresh & Error Boundary */}
            <ErrorBoundary fallback={financialComponentFallback}>
              <ExpenseCard
                title="Monthly Expenses"
                data={{
                  current: financialData.monthlyExpenses.current,
                  previous: financialData.monthlyExpenses.previous,
                  percentageChange:
                    financialData.monthlyExpenses.percentageChange,
                }}
                valueColor="red-600"
                onDataRefresh={handleExpensesRefresh}
              />
            </ErrorBoundary>

            {/* Savings Card with Error Boundary */}
            <ErrorBoundary fallback={financialComponentFallback}>
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
            </ErrorBoundary>
          </div>

          {/* Metrics Group with Error Boundary */}
          <ErrorBoundary>
            <div className="mt-4">
              <MetricGroup />
            </div>
          </ErrorBoundary>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Transactions with Error Boundary */}
            <ErrorBoundary>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                  <button
                    onClick={() => setShowTransactionForm(true)}
                    className="px-4 py-2 bg-[#1d1d1f] text-white rounded-lg hover:bg-[#2d2d2f] 
                     transition-all duration-200 text-sm font-medium"
                  >
                    Add Transaction
                  </button>
                </div>
                <TransactionsCard transactions={financialData.transactions} />
              </div>
            </ErrorBoundary>

            {/* Budget Overview with Error Boundary */}
            <ErrorBoundary>
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4">Budget Overview</h2>
                <p className="text-gray-500">
                  Budget breakdown will be displayed here
                </p>
              </div>
            </ErrorBoundary>
          </div>

          {/* Transaction Form Modal */}
          {showTransactionForm && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm 
              flex items-center justify-center p-6 z-50"
            >
              <div className="max-w-md w-full">
                <ErrorBoundary>
                  <AddTransactionForm
                    onAddTransaction={handleAddTransaction}
                    onClose={() => setShowTransactionForm(false)}
                  />
                </ErrorBoundary>
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default Dashboard;
