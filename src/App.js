import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LoadingProvider } from "./contexts/LoadingContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { CryptoProvider } from "./contexts/CryptoContext";
import Dashboard from "./pages/Dashboard";
import TransactionHistory from "./pages/TransactionHistory";
import Settings from "./pages/Settings";
import ErrorBoundaryDemo from "./pages/ErrorBoundaryDemo";
import SessionTimer from "./components/SessionTimer";
import ErrorBoundary from "./components/ErrorBoundary";
import PerformanceDemo from "./pages/PerformanceDemo";

function App() {
  return (
    <LoadingProvider>
      <TransactionProvider>
        <CryptoProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <div className="min-h-screen bg-white">
                <header className="bg-[#1d1d1f] p-6 text-white backdrop-blur-lg bg-opacity-95 sticky top-0 z-50">
                  <div className="flex justify-between items-center max-w-7xl mx-auto">
                    <div>
                      <h1 className="text-3xl font-medium tracking-tight">
                        FinPanel Dashboard
                      </h1>
                      <p className="text-sm text-gray-300 mt-1">
                        Your Personal Finance Tracker
                      </p>
                      <SessionTimer />
                    </div>

                    <nav className="flex gap-4">
                      <Link
                        to="/"
                        className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/transactions"
                        className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Transactions
                      </Link>
                      <Link
                        to="/performance-demo"
                        className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Performance
                      </Link>
                      <Link
                        to="/error-demo"
                        className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Error Demo
                      </Link>
                      <Link
                        to="/settings"
                        className="px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200"
                      >
                        Settings
                      </Link>
                    </nav>
                  </div>
                </header>

                <Routes>
                  {/* Individual routes wrapped in error boundaries for more granular control */}
                  <Route
                    path="/"
                    element={
                      <ErrorBoundary>
                        <Dashboard />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <ErrorBoundary>
                        <TransactionHistory />
                      </ErrorBoundary>
                    }
                  />
                  <Route path="/error-demo" element={<ErrorBoundaryDemo />} />
                  <Route
                    path="/settings"
                    element={
                      <ErrorBoundary>
                        <Settings />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="/performance-demo"
                    element={
                      <ErrorBoundary>
                        <PerformanceDemo />
                      </ErrorBoundary>
                    }
                  />
                </Routes>
              </div>
            </ErrorBoundary>
          </BrowserRouter>
        </CryptoProvider>
      </TransactionProvider>
    </LoadingProvider>
  );
}

export default App;
