import React, { createContext, useContext, useState } from "react";

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({
    balance: false,
    income: false,
    expenses: false,
    crypto: false,
    savings: false,
    transactions: false,
    general: false,
  });

  const setLoading = (type, isLoading) => {
    setLoadingStates((prev) => ({
      ...prev,
      [type]: isLoading,
    }));
  };

  const setAllLoading = (isLoading) => {
    const newStates = {};
    Object.keys(loadingStates).forEach((key) => {
      newStates[key] = isLoading;
    });
    setLoadingStates(newStates);
  };

  const value = {
    loadingStates,
    setLoading,
    setAllLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
};
