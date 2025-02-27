import React, { memo } from "react";

// Using memo to prevent unnecessary re-renders when parent components update
const TransactionItem = memo(
  ({ transaction, onSelect, getTypeStyle, formatAmount }) => {
    console.log(`Rendering TransactionItem: ${transaction.description}`);

    const handleClick = (e) => {
      console.log("Transaction Item Clicked:", transaction.description);
      onSelect(transaction);
    };

    const handleActionClick = (e) => {
      // Stop propagation so the parent click handler doesn't fire
      e.stopPropagation();
      console.log("Action Button Clicked for:", transaction.description);
    };

    return (
      <div
        onClick={handleClick}
        className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded-lg transition-colors cursor-pointer"
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
            <p className="text-xs text-gray-500">{transaction.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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
          <button
            onClick={handleActionClick}
            className="ml-2 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            ⋮
          </button>
        </div>
      </div>
    );
  }
);

// Add display name for better debugging
TransactionItem.displayName = "TransactionItem";

export default TransactionItem;
