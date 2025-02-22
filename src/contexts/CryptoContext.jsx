import React, { createContext, useContext, useState, useEffect } from "react";

const CryptoContext = createContext();

export const useCrypto = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCrypto must be used within a CryptoProvider");
  }
  return context;
};

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState({
    totalValue: 2500,
    change24h: 5.2,
    lastUpdated: new Date().toISOString(),
    marketTrend: "bull",
    holdings: [
      { symbol: "BTC", value: 1500, price: 45000 },
      { symbol: "ETH", value: 600, price: 2800 },
      { symbol: "SOL", value: 250, price: 98 },
      { symbol: "DOT", value: 150, price: 15 },
    ],
    dominantCoin: { symbol: "BTC", value: 1500 },
  });

  const updateCryptoData = (newData) => {
    setCryptoData((prev) => ({
      ...prev,
      ...newData,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const refreshPrices = async () => {
    // In the future, this will fetch from Coinbase API
    // For now, simulate price updates
    const updatedHoldings = cryptoData.holdings.map((holding) => ({
      ...holding,
      price: holding.price * (1 + (Math.random() * 0.1 - 0.05)),
      value: holding.value * (1 + (Math.random() * 0.1 - 0.05)),
    }));

    const totalValue = updatedHoldings.reduce((sum, h) => sum + h.value, 0);
    const change24h = (Math.random() * 10 - 5).toFixed(2);

    updateCryptoData({
      holdings: updatedHoldings,
      totalValue,
      change24h: parseFloat(change24h),
      marketTrend: change24h > 0 ? "bull" : "bear",
      dominantCoin: updatedHoldings.reduce(
        (max, holding) => (holding.value > max.value ? holding : max),
        { value: -Infinity }
      ),
    });
  };

  useEffect(() => {
    // Refresh prices every 30 seconds
    const interval = setInterval(refreshPrices, 30000);
    return () => clearInterval(interval);
  }, []);

  const value = {
    cryptoData,
    updateCryptoData,
    refreshPrices,
  };

  return (
    <CryptoContext.Provider value={value}>{children}</CryptoContext.Provider>
  );
};
