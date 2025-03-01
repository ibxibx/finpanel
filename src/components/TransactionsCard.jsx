import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function TransactionsCard({ transactions = [] }) {
  // Add state for grouped transactions
  const [groupedTransactions, setGroupedTransactions] = useState({});
  // Add state for last update time
  const [lastUpdate, setLastUpdate] = useState(new Date());
  // Add state for window width to handle responsive design
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Effect 1: Group transactions whenever transactions prop changes
  useEffect(() => {
    const grouped = transactions.reduce((groups, transaction) => {
      const date = transaction.date.split(" ")[0];
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
      return groups;
    }, {});
    setGroupedTransactions(grouped);
    setLastUpdate(new Date());
  }, [transactions]); // Only re-run when transactions change

  // Effect 2: Window resize listener
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Effect 3: Auto-refresh timestamp every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    // Cleanup function to clear interval
    return () => {
      clearInterval(timer);
    };
  }, []); // Empty dependency array means this runs once on mount

  const getTypeStyle = (type) => {
    const styles = {
      income: "text-green-600",
      expense: "text-red-600",
      transfer: "text-blue-600",
      investment: "text-purple-600",
    };
    return styles[type] || "text-gray-600";
  };

  const formatAmount = (amount, type) => {
    const prefix = type === "expense" ? "-" : "+";
    return `${prefix}$${Math.abs(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <span className="text-xs text-gray-500">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </span>
      </div>

      {transactions.length === 0 ? (
        <p className="text-gray-500 text-center py-4">
          No transactions to display
        </p>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedTransactions).map(
            ([date, dayTransactions]) => (
              <div key={date} className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500 sticky top-0 bg-white">
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: windowWidth > 768 ? "long" : "short",
                    year: "numeric",
                    month: windowWidth > 768 ? "long" : "short",
                    day: "numeric",
                  })}
                </h3>

                <div className="space-y-1">
                  {dayTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            transaction.type === "expense"
                              ? "bg-red-100"
                              : transaction.type === "income"
                              ? "bg-green-100"
                              : transaction.type === "transfer"
                              ? "bg-blue-100"
                              : "bg-purple-100"
                          }`}
                        >
                          {transaction.type === "expense"
                            ? "↓"
                            : transaction.type === "income"
                            ? "↑"
                            : transaction.type === "transfer"
                            ? "↔"
                            : "★"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.category}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-sm font-medium ${getTypeStyle(
                            transaction.type
                          )}`}
                        >
                          {formatAmount(transaction.amount, transaction.type)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {transaction.date.split(" ")[1]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

// Define PropTypes for the component
TransactionsCard.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      description: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["income", "expense", "transfer", "investment"])
        .isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
};

// Define defaultProps
TransactionsCard.defaultProps = {
  transactions: [],
};

export { TransactionsCard };
