import React from "react";

function DashboardCard({ title, value, valueColor = "black", children }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-gray-600 text-sm">{title}</h2>
      <p className={`text-2xl font-bold text-${valueColor}`}>
        ${value.toLocaleString()}
      </p>
      {children}
    </div>
  );
}

export { DashboardCard };
