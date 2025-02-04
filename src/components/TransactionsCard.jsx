import React from "react";

function TransactionsCard({ transactions = [] }) {
  // Function to get appropriate style for transaction type
  const getTypeStyle = (type) => {
    const styles = {
      income: "text-green-600",
      expense: "text-red-600",
      transfer: "text-blue-600",
      investment: "text-purple-600",
    };
    return styles[type] || "text-gray-600";
  };

  // Group transactions by date
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    const date = transaction.date.split(" ")[0]; // Get just the date part
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(transaction);
    return groups;
  }, {});

  // Format currency
  const formatAmount = (amount, type) => {
    const prefix = type === "expense" ? "-" : "+";
    return `${prefix}$${Math.abs(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>

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
                    weekday: "long",
                    year: "numeric",
                    month: "long",
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

export { TransactionsCard };
