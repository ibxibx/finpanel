import React from "react";
import { TransactionsCard } from "../components/TransactionsCard";
import { useTransactions } from "../contexts/TransactionContext";

const TransactionHistory = () => {
  const { transactions } = useTransactions();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-medium mb-6">Transaction History</h1>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <TransactionsCard transactions={transactions} />
      </div>
    </div>
  );
};

export default TransactionHistory;