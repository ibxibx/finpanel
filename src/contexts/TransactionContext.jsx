import React, { createContext, useContext, useState } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
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
