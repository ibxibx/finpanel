import React from "react";
import PropTypes from "prop-types";
import { useLoading } from "../contexts/LoadingContext";
import LoadingOverlay from "./LoadingOverlay";
import { useCrypto } from "../contexts/CryptoContext";

function CryptoCard() {
  const { loadingStates } = useLoading();
  const { cryptoData } = useCrypto();

  // Destructure cryptoData
  const {
    totalValue,
    change24h,
    holdings,
    dominantCoin,
    lastUpdated,
    marketTrend,
  } = cryptoData;

  // Conditional render checks
  const hasHoldings = holdings && holdings.length > 0;
  const showMarketTrend = marketTrend !== null;

  return (
    <div className="relative mb-4">
      {loadingStates.crypto && (
        <LoadingOverlay message="Updating crypto data..." />
      )}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg shadow text-white">
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
            {showMarketTrend && (
              <p className="text-xs opacity-75">
                Market: {marketTrend === "bull" ? "🟢 Bullish" : "🔴 Bearish"}
              </p>
            )}
          </div>
        </div>

        {hasHoldings && (
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

        {!hasHoldings && (
          <div className="mt-3 pt-3 border-t border-white border-opacity-20">
            <p className="text-sm text-center">No holdings to display</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Define PropTypes for useCrypto context data
CryptoCard.propTypes = {
  // This component uses context, so we don't need to specify props directly,
  // but we can document the expected shape of the cryptoData from context
};

// Define PropTypes for the cryptoData shape from useCrypto context
useCrypto.propTypes = {
  cryptoData: PropTypes.shape({
    totalValue: PropTypes.number.isRequired,
    change24h: PropTypes.number.isRequired,
    holdings: PropTypes.arrayOf(
      PropTypes.shape({
        symbol: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ),
    dominantCoin: PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
    lastUpdated: PropTypes.string,
    marketTrend: PropTypes.oneOf(["bull", "bear", null]),
  }).isRequired,
};

export { CryptoCard };
