import React from "react";

function CryptoCard({
  totalValue,
  change24h,
  holdings = [], // Array of crypto holdings
  dominantCoin = null, // Most valuable holding
  lastUpdated = null,
  marketTrend = null, // 'bull' | 'bear' | null
}) {
  return (
    <div className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg shadow text-white">
      <div className="flex justify-between items-start">
        <h2 className="text-lg font-semibold">Crypto Portfolio</h2>
        {lastUpdated && (
          <span className="text-xs opacity-75">Updated: {lastUpdated}</span>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-sm opacity-80">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
          {dominantCoin && (
            <p className="text-xs opacity-75">
              Largest holding: {dominantCoin.symbol} ($
              {dominantCoin.value.toLocaleString()})
            </p>
          )}
        </div>
        <div
          className={`text-right ${
            change24h >= 0 ? "text-green-300" : "text-red-300"
          }`}
        >
          <p className="text-sm opacity-80">24h Change</p>
          <p className="text-xl font-bold">
            {change24h >= 0 ? "+" : ""}
            {change24h}%
          </p>
          {marketTrend && (
            <p className="text-xs opacity-75">
              Market: {marketTrend === "bull" ? "🟢 Bullish" : "🔴 Bearish"}
            </p>
          )}
        </div>
      </div>

      {holdings.length > 0 && (
        <div className="mt-3 pt-3 border-t border-white border-opacity-20">
          <p className="text-sm mb-2">Top Holdings:</p>
          <div className="grid grid-cols-2 gap-2">
            {holdings.slice(0, 4).map((coin) => (
              <div key={coin.symbol} className="text-xs">
                {coin.symbol}: ${coin.value.toLocaleString()}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { CryptoCard };
