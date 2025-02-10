import React from "react";

// Example metrics data structure for demo
const demoMetrics = [
  { label: "Growth Rate", value: 12.5 },
  { label: "Expense Ratio", value: -3.2 },
  { label: "Savings Rate", value: 8.7 },
];

const MetricGroup = ({ metrics = demoMetrics }) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Key Metrics
        </h3>
        <div className="space-y-3">
          {metrics.map((metric, index) => (
            <React.Fragment key={index}>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{metric.label}</span>
                <span
                  className={`font-medium ${
                    metric.value >= 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.value >= 0 ? "+" : ""}
                  {metric.value}%
                </span>
              </div>
              {index < metrics.length - 1 && (
                <div className="border-b border-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default MetricGroup;
