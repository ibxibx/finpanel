import React, { createContext, useContext, useState, useEffect } from "react";

const TransactionContext = createContext();

// Initial sample data
const initialTransactions = [
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
];

export function TransactionProvider({ children }) {
  // Load transactions from localStorage or use initial data
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions
      ? JSON.parse(savedTransactions)
      : initialTransactions;
  });

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (newTransaction) => {
    setTransactions((prevTransactions) => [
      newTransaction,
      ...prevTransactions,
    ]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionContext);
}
