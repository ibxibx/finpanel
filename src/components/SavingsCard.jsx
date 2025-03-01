import React from "react";
import PropTypes from "prop-types";

function SavingsCard({
  current,
  goal,
  monthlyTarget = null,
  targetDate = null,
  recentSavings = [],
  projectedDate = null,
}) {
  // Conditional render checks
  const progress = (current / goal) * 100;
  const hasMonthlyTarget = monthlyTarget !== null;
  const hasTargetDate = targetDate !== null;
  const hasProjectedDate = projectedDate !== null;
  const hasRecentSavings = recentSavings && recentSavings.length > 0;
  const isOnTrack =
    hasProjectedDate && new Date(projectedDate) <= new Date(targetDate);

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-gray-600 text-sm">Savings Goal</h2>
      <div className="flex justify-between items-baseline">
        <p className="text-2xl font-bold text-blue-600">
          ${goal.toLocaleString()}
        </p>
        <p className="text-sm text-gray-500">
          ${current.toLocaleString()} saved
        </p>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${
            isOnTrack ? "bg-blue-600" : "bg-yellow-500"
          }`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="mt-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{progress.toFixed(1)}% complete</span>
          {hasMonthlyTarget && (
            <span>Target: ${monthlyTarget.toLocaleString()}/month</span>
          )}
        </div>

        {hasTargetDate && (
          <p className="text-xs text-gray-500 mt-1">
            Target date: {targetDate}
          </p>
        )}

        {hasProjectedDate && (
          <p
            className={`text-xs mt-1 ${
              isOnTrack ? "text-green-600" : "text-yellow-600"
            }`}
          >
            Projected completion: {projectedDate}
            {!isOnTrack && " (behind schedule)"}
          </p>
        )}
      </div>

      {hasRecentSavings && (
        <div className="mt-2 text-xs text-gray-500">
          <p>Recent savings:</p>
          {recentSavings.slice(0, 3).map((entry, index) => (
            <div key={index} className="flex justify-between">
              <span>{entry.date}</span>
              <span>${entry.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}

      {!hasRecentSavings && (
        <div className="mt-2 text-xs text-gray-500 text-center">
          <p>No recent savings recorded</p>
        </div>
      )}
    </div>
  );
}

// Define PropTypes for the component
SavingsCard.propTypes = {
  current: PropTypes.number.isRequired,
  goal: PropTypes.number.isRequired,
  monthlyTarget: PropTypes.number,
  targetDate: PropTypes.string,
  recentSavings: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ),
  projectedDate: PropTypes.string,
};

// Define defaultProps
SavingsCard.defaultProps = {
  monthlyTarget: null,
  targetDate: null,
  recentSavings: [],
  projectedDate: null,
};

export { SavingsCard };
