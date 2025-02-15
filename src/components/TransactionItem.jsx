import React from "react";

const TransactionItem = ({ transaction, onSelect, onDelete }) => {
  const handleClick = (e) => {
    // This will run first
    console.log("Transaction Item Clicked");
    onSelect(transaction);
  };

  const handleDeleteClick = (e) => {
    // Stop the event from bubbling up to parent elements
    e.stopPropagation();
    console.log("Delete Button Clicked");
    onDelete(transaction.id);
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-medium">{transaction.description}</h3>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
        <div className="flex items-center gap-4">
          <span
            className={`font-medium ${
              transaction.type === "expense" ? "text-red-600" : "text-green-600"
            }`}
          >
            ${transaction.amount.toFixed(2)}
          </span>
          <button
            onClick={handleDeleteClick}
            className="px-2 py-1 bg-red-50 text-red-600 rounded hover:bg-red-100 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
