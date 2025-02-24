import React, { useState, useEffect } from "react";
import { useLoading } from "../contexts/LoadingContext";

/**
 *
 * @param {React.Component} WrappedComponent - The component to enhance
 * @param {Object} options - Configuration options
 * @param {string} options.dataType - Type of data (for loading state)
 * @param {number} options.refreshInterval - Refresh interval in ms (default: 30000)
 * @param {Function} options.refreshFunction - Custom refresh function
 * @returns {React.Component} Enhanced component with refresh capabilities
 */
const withDataRefresh = (WrappedComponent, options = {}) => {
  const {
    dataType = "general",
    refreshInterval = 30000,
    refreshFunction = null,
  } = options;

  // Return a new component
  return function WithDataRefresh(props) {
    const [lastRefreshed, setLastRefreshed] = useState(new Date());
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState(null);
    const { setLoading } = useLoading();

    // Default refresh function with random variation
    const defaultRefresh = async () => {
      // This is a placeholder. In a real app, you'd fetch data from an API
      await new Promise((resolve) =>
        setTimeout(resolve, 800 + Math.random() * 1200)
      );

      // Apply a small random change to numeric data
      const updatedData = {};
      Object.keys(props.data || {}).forEach((key) => {
        if (typeof props.data[key] === "number") {
          updatedData[key] =
            props.data[key] * (1 + (Math.random() * 0.04 - 0.02));
        }
      });

      return updatedData;
    };

    // Function to refresh data
    const refreshData = async () => {
      if (isRefreshing) return;

      setIsRefreshing(true);
      setError(null);
      setLoading(dataType, true);

      try {
        // Use provided refresh function or default
        const refreshResult = refreshFunction
          ? await refreshFunction(props.data)
          : await defaultRefresh();

        setLastRefreshed(new Date());

        // Call onDataRefresh prop if it exists
        if (props.onDataRefresh && typeof props.onDataRefresh === "function") {
          props.onDataRefresh(refreshResult);
        }
      } catch (err) {
        setError(`Failed to refresh ${dataType} data: ${err.message}`);
        console.error(`Error refreshing ${dataType} data:`, err);
      } finally {
        setIsRefreshing(false);
        setLoading(dataType, false);
      }
    };

    // Set up automatic refresh interval
    useEffect(() => {
      const interval = setInterval(refreshData, refreshInterval);
      return () => clearInterval(interval);
    }, [refreshInterval]);

    // Pass enhanced props to the wrapped component
    return (
      <WrappedComponent
        {...props}
        lastRefreshed={lastRefreshed}
        isRefreshing={isRefreshing}
        error={error}
        refreshData={refreshData}
      />
    );
  };
};

export default withDataRefresh;
