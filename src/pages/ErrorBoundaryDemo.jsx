import React, { useState } from "react";
import ErrorBoundary from "../components/ErrorBoundary";
import { DashboardCard } from "../components/DashboardCard";

// Simple safe component
const SafeComponent = () => {
  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <h3 className="font-medium text-green-800">Working Component</h3>
      <p className="text-green-700">This component is working properly.</p>
    </div>
  );
};

// Simple component that will throw an error when a button is clicked
const PotentiallyBuggyComponent = ({ label }) => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    // This will cause the component to crash when the button is clicked
    throw new Error("This is a simulated error!");
  }

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h3 className="font-medium text-blue-800">{label}</h3>
      <p className="text-blue-700 mb-3">
        This component works until you trigger an error.
      </p>
      <button
        onClick={() => setShouldError(true)}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Trigger Error
      </button>
    </div>
  );
};

const ErrorBoundaryDemo = () => {
  const [key, setKey] = useState(0);

  const resetErrorBoundary = () => {
    // This key change will cause React to remount the component
    setKey((prevKey) => prevKey + 1);
  };

  // Custom fallback UI
  const customFallback = (error) => (
    <div className="p-4 border rounded-lg bg-yellow-50 border-yellow-200">
      <h3 className="font-medium text-yellow-800 mb-2">Component Error</h3>
      <p className="text-yellow-700 mb-4">
        Oops! The component crashed with error: {error.message}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
      >
        Reset Component
      </button>
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Error Boundary Demo</h1>

      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">What are Error Boundaries?</h2>
        <p className="mb-3">
          Error boundaries are React components that catch JavaScript errors
          anywhere in their child component tree, log those errors, and display
          a fallback UI instead of crashing the entire component tree.
        </p>
        <p>
          This page demonstrates how error boundaries prevent the entire app
          from crashing when components fail.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Example 1: Basic error boundary with default UI */}
        <DashboardCard
          title="Basic Error Boundary"
          subtitle="With default error UI"
        >
          <div className="mt-4">
            <ErrorBoundary
              key={key}
              resetError={resetErrorBoundary}
              showDetails={true}
            >
              <PotentiallyBuggyComponent label="Component with Default Error UI" />
            </ErrorBoundary>
          </div>
        </DashboardCard>

        {/* Example 2: Error boundary with custom fallback UI */}
        <DashboardCard
          title="Custom Fallback UI"
          subtitle="With custom error handling"
        >
          <div className="mt-4">
            <ErrorBoundary key={key + 1} fallback={customFallback}>
              <PotentiallyBuggyComponent label="Component with Custom Error UI" />
            </ErrorBoundary>
          </div>
        </DashboardCard>

        {/* Example 3: Safe component */}
        <DashboardCard title="Safe Component" subtitle="Never throws errors">
          <div className="mt-4">
            <ErrorBoundary key={key + 2}>
              <SafeComponent />
            </ErrorBoundary>
          </div>
        </DashboardCard>

        {/* Example 4: Fine-grained error boundaries */}
        <DashboardCard
          title="Fine-grained Error Boundaries"
          subtitle="Isolate errors to specific components"
        >
          <div className="mt-4 space-y-4">
            <ErrorBoundary key={key + 3}>
              <PotentiallyBuggyComponent label="Independent Component 1" />
            </ErrorBoundary>

            <ErrorBoundary key={key + 4}>
              <PotentiallyBuggyComponent label="Independent Component 2" />
            </ErrorBoundary>
          </div>
        </DashboardCard>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg border shadow-sm">
        <h2 className="text-xl font-medium mb-4">Key Implementation Points</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Error boundaries only catch errors in the components below them in
            the tree.
          </li>
          <li>
            They don't catch errors in event handlers - use try/catch for those.
          </li>
          <li>
            Use multiple error boundaries for fine-grained error handling.
          </li>
          <li>
            Error boundaries are class components because they use lifecycle
            methods.
          </li>
          <li>
            Consider providing a way to recover or retry after an error occurs.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorBoundaryDemo;
