import React from "react";

function SavingsCard({
  current,
  goal,
  monthlyTarget = null,
  targetDate = null,
  recentSavings = [], // Array of recent savings entries
  projectedDate = null, // When goal will be reached at current rate
}) {
  const progress = (current / goal) * 100;

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
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>{progress.toFixed(1)}% complete</span>
          {monthlyTarget && (
            <span>Target: ${monthlyTarget.toLocaleString()}/month</span>
          )}
        </div>

        {targetDate && (
          <p className="text-xs text-gray-500 mt-1">
            Target date: {targetDate}
          </p>
        )}

        {projectedDate && (
          <p className="text-xs text-gray-500">
            Projected completion: {projectedDate}
          </p>
        )}
      </div>

      {recentSavings.length > 0 && (
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
    </div>
  );
}

export { SavingsCard };
