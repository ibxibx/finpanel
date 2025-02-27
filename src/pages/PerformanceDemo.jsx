import React, { useState } from "react";
import TransactionItem from "../components/TransactionItem";
import StatCard from "../components/StatCard";

const PerformanceDemo = () => {
  const [count, setCount] = useState(0);
  const [transactions, setTransactions] = useState([
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
  ]);

  // Helper functions for TransactionItem
  const getTypeStyle = (type) => {
    return type === "expense"
      ? "text-red-600"
      : type === "income"
      ? "text-green-600"
      : "text-blue-600";
  };

  const formatAmount = (amount, type) => {
    return type === "expense"
      ? `-$${amount.toFixed(2)}`
      : `+$${amount.toFixed(2)}`;
  };

  const handleTransactionSelect = (transaction) => {
    console.log("Selected transaction:", transaction);
  };

  // Update functions
  const updateCounter = () => {
    setCount(count + 1);
  };

  const updateTransaction = () => {
    const newTransactions = [...transactions];
    newTransactions[0] = {
      ...newTransactions[0],
      amount: newTransactions[0].amount + 10,
    };
    setTransactions(newTransactions);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Performance Optimization Demo
      </h1>

      <div className="mb-6">
        <p>
          This page demonstrates React.memo and PureComponent optimizations.
          Open your browser console to see which components re-render.
        </p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={updateCounter}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Update Counter: {count}
          </button>
          <button
            onClick={updateTransaction}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Update First Transaction
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h2 className="text-lg font-medium mb-3">React.memo Example</h2>
          <div className="border border-gray-200 rounded-lg p-4">
            {transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onSelect={handleTransactionSelect}
                getTypeStyle={getTypeStyle}
                formatAmount={formatAmount}
              />
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            When you click "Update Counter," these items won't re-render. When
            you click "Update First Transaction," only the first item will
            re-render.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">PureComponent Example</h2>
          <div className="grid grid-cols-1 gap-4">
            <StatCard
              title="Account Balance"
              value={`$${10000 + count * 0}`}
              color="blue"
              icon="💰"
            />
            <StatCard
              title="Monthly Income"
              value={`$${6000 + transactions[0].amount - 6000}`}
              color="green"
              icon="📈"
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            The first card won't re-render when counter changes (count is
            multiplied by 0). The second card will re-render when the first
            transaction changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDemo;
