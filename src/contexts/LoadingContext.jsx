import React, { createContext, useContext, useState } from 'react';

const LoadingContext = createContext();

export function LoadingProvider({ children }) {
  const [loadingStates, setLoadingStates] = useState({
    crypto: false,
    balance: false,
    income: false,
    expenses: false,
    savings: false,
    transactions: false
  });

  const setLoading = (section, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [section]: isLoading
    }));
  };

  const setAllLoading = (isLoading) => {
    setLoadingStates({
      crypto: isLoading,
      balance: isLoading,
      income: isLoading,
      expenses: isLoading,
      savings: isLoading,
      transactions: isLoading
    });
  };

  return (
    <LoadingContext.Provider value={{ loadingStates, setLoading, setAllLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}