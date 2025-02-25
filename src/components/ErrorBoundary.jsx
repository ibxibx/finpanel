import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { fallback, children } = this.props;

    if (this.state.hasError) {
      // If a custom fallback is provided, use it, otherwise use the default fallback
      if (fallback) {
        return fallback(this.state.error, this.state.errorInfo);
      }

      // Default fallback UI
      return (
        <div className="p-6 rounded-lg bg-red-50 border border-red-200 my-4">
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Something went wrong
          </h2>
          <p className="text-red-600 mb-4">
            We're sorry, but there was an error in this component. The issue has
            been logged and we're working on it.
          </p>
          {this.props.resetError && (
            <button
              onClick={this.props.resetError}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Reset
            </button>
          )}
          {this.props.showDetails && (
            <details className="mt-4 p-2 border border-red-200 bg-white rounded">
              <summary className="cursor-pointer text-red-700 font-medium">
                Error Details
              </summary>
              <p className="mt-2 text-sm font-mono whitespace-pre-wrap text-gray-700">
                {this.state.error && this.state.error.toString()}
              </p>
              <p className="mt-2 text-sm font-mono whitespace-pre-wrap text-gray-700">
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </p>
            </details>
          )}
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;

//    The  ErrorBoundary  component is a simple component that catches errors in its children and renders a fallback UI when an error occurs.
//    The fallback UI is customizable and can be provided as a prop. If no custom fallback is provided, the component will render a default error message.
//    The  ErrorBoundary  component has the following features:
//
//    It uses the  componentDidCatch  lifecycle method to catch errors in its children.
//    It has a  getDerivedStateFromError  static method to update the component state when an error occurs.
//    It renders a custom fallback UI when an error occurs.
//    It provides options to reset the error and show error details.
//
//    The  ErrorBoundary  component can be used to wrap other components and catch any errors that occur in them. This can help prevent the entire application from crashing due to a single error.
//
//    Error boundaries can help improve the user experience of your application by handling errors gracefully and providing useful error messages to users.
//    By using error boundaries, you can prevent your application from crashing and provide a better experience for your users.
