import React from "react";
import PropTypes from "prop-types";

function DashboardCard({
  title,
  value,
  valueColor = "gray-900",
  previousValue = null,
  percentageChange = null,
  lastUpdated = null,
  subtitle = null,
  children,
}) {
  const hasChanged = previousValue !== null && percentageChange !== null;
  const changeIsPositive = hasChanged && value > previousValue;
  const hasSubtitle = subtitle !== null;
  const hasTimestamp = lastUpdated !== null;
  const hasChildren = children !== undefined;

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-500 text-sm font-medium tracking-wide">
            {title}
          </h2>
          {hasSubtitle && (
            <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {hasTimestamp && (
          <span className="text-xs text-gray-400 font-medium">
            Updated: {lastUpdated}
          </span>
        )}
      </div>

      <div className="mt-3">
        {value !== null ? (
          <p
            className={`text-2xl font-semibold text-${valueColor} tracking-tight`}
          >
            ${value.toLocaleString()}
          </p>
        ) : (
          <p className="text-2xl font-semibold text-gray-400">
            No data available
          </p>
        )}

        {hasChanged && (
          <div className="flex items-center mt-1 space-x-2">
            <span
              className={`inline-flex items-center text-sm font-medium ${
                changeIsPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {changeIsPositive ? (
                <svg
                  className="w-4 h-4 mr-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4 mr-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {Math.abs(percentageChange).toFixed(2)}%
            </span>
            <span className="text-gray-400 text-sm">
              vs ${previousValue.toLocaleString()}
            </span>
          </div>
        )}
      </div>

      {hasChildren && <div className="mt-4">{children}</div>}
    </div>
  );
}

// Define PropTypes for the component
DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number,
  valueColor: PropTypes.string,
  previousValue: PropTypes.number,
  percentageChange: PropTypes.number,
  lastUpdated: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

// Define defaultProps
DashboardCard.defaultProps = {
  valueColor: "gray-900",
  previousValue: null,
  percentageChange: null,
  lastUpdated: null,
  subtitle: null,
};

export { DashboardCard };
