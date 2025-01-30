import React from "react";

function CryptoCard({ totalValue, change24h }) {
  return (
    <div className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-lg shadow text-white">
      <h2 className="text-lg font-semibold mb-2">Crypto Portfolio</h2>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">Total Value</p>
          <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
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
        </div>
      </div>
    </div>
  );
}
