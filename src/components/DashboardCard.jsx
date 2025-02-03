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
  // Conditional render checks
  const hasChanged = previousValue !== null && percentageChange !== null;
  const changeIsPositive = hasChanged && value > previousValue;
  const hasSubtitle = subtitle !== null;
  const hasTimestamp = lastUpdated !== null;
  const hasChildren = children !== undefined;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-600 text-sm">{title}</h2>
          {hasSubtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
        {hasTimestamp && (
          <span className="text-xs text-gray-400">Updated: {lastUpdated}</span>
        )}
      </div>

      <div className="mt-2">
        {value !== null ? (
          <p className={`text-2xl font-bold text-${valueColor}`}>
            ${value.toLocaleString()}
          </p>
        ) : (
          <p className="text-2xl font-bold text-gray-400">No data available</p>
        )}

        {hasChanged && (
          <div
            className={`text-sm ${
              changeIsPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <span>
              {changeIsPositive ? "↑" : "↓"}
              {Math.abs(percentageChange).toFixed(2)}%
            </span>
            <span className="text-gray-500 text-xs ml-1">
              vs ${previousValue.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {hasChildren && <div className="mt-4">{children}</div>}
    </div>
  );
}

export { DashboardCard };
