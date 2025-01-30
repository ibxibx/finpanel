import React from "react";

function SavingsCard({ current, goal }) {
  const progress = (current / goal) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-gray-600 text-sm">Savings Goal</h2>
      <p className="text-2xl font-bold text-blue-600">
        ${goal.toLocaleString()}
      </p>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
        <div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export { SavingsCard };
