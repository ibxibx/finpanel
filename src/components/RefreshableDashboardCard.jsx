import React from "react";
import { DashboardCard } from "./DashboardCard";
import LoadingOverlay from "./LoadingOverlay";

const RefreshableDashboardCard = ({
  title,
  data,
  valueColor,
  subtitle,
  lastRefreshed,
  isRefreshing,
  error,
  refreshData,
  children,
}) => {
  return (
    <div className="relative">
      {isRefreshing && (
        <LoadingOverlay message={`Updating ${title.toLowerCase()}...`} />
      )}

      {error && <div className="text-xs text-red-500 mb-2">{error}</div>}

      <div className="flex justify-end mb-2">
        <button
          onClick={refreshData}
          className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded"
        >
          Refresh Data
        </button>
      </div>

      <DashboardCard
        title={title}
        value={data.current}
        previousValue={data.previous}
        percentageChange={data.percentageChange}
        valueColor={valueColor}
        subtitle={subtitle}
        lastUpdated={lastRefreshed ? lastRefreshed.toLocaleString() : null}
      >
        {children}
      </DashboardCard>
    </div>
  );
};

export default RefreshableDashboardCard;
