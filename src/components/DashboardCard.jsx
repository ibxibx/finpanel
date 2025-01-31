import React from "react";

function DashboardCard({
  title,
  value,
  valueColor = "black",
  previousValue = null,
  percentageChange = null,
  lastUpdated = null,
  subtitle = null,
  children,
}) {
  const hasChanged = previousValue !== null;
  const changeIsPositive = hasChanged && value > previousValue;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-600 text-sm">{title}</h2>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        {lastUpdated && (
          <span className="text-xs text-gray-400">Updated: {lastUpdated}</span>
        )}
      </div>

      <div className="mt-2">
        <p className={`text-2xl font-bold text-${valueColor}`}>
          ${value.toLocaleString()}
        </p>

        {hasChanged && (
          <div
            className={`text-sm ${
              changeIsPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {changeIsPositive ? "↑" : "↓"}
            {percentageChange && `${Math.abs(percentageChange).toFixed(2)}%`}
            <span className="text-gray-500 text-xs ml-1">
              vs ${previousValue.toLocaleString()}
            </span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

export { DashboardCard };
