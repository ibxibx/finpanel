import React, { useState, useEffect } from "react";

function AddTransactionForm({ onAddTransaction, onClose }) {
  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    description: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = {
    income: ["Salary", "Freelance", "Investments", "Other"],
    expense: [
      "Food",
      "Transport",
      "Housing",
      "Entertainment",
      "Utilities",
      "Other",
    ],
    transfer: ["Bank Transfer", "Credit Card", "Savings", "Investment"],
    investment: ["Stocks", "Crypto", "Real Estate", "Other"],
  };

  // Handle field blur for real-time validation
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, formData[name]);
  };

  // Validate individual field
  const validateField = (name, value) => {
    let fieldError = "";

    switch (name) {
      case "amount":
        if (!value) {
          fieldError = "Amount is required";
        } else if (isNaN(value) || Number(value) <= 0) {
          fieldError = "Please enter a valid positive amount";
        } else if (Number(value) > 1000000) {
          fieldError = "Amount cannot exceed $1,000,000";
        }
        break;

      case "description":
        if (!value.trim()) {
          fieldError = "Description is required";
        } else if (value.trim().length < 3) {
          fieldError = "Description must be at least 3 characters";
        } else if (value.trim().length > 100) {
          fieldError = "Description cannot exceed 100 characters";
        }
        break;

      case "category":
        if (!value) {
          fieldError = "Please select a category";
        }
        break;

      case "date":
        if (!value) {
          fieldError = "Date is required";
        } else {
          const selectedDate = new Date(value);
          const today = new Date();
          const sixMonthsAgo = new Date();
          sixMonthsAgo.setMonth(today.getMonth() - 6);

          if (selectedDate > today) {
            fieldError = "Date cannot be in the future";
          } else if (selectedDate < sixMonthsAgo) {
            fieldError = "Date cannot be older than 6 months";
          }
        }
        break;

      case "notes":
        if (value.length > 500) {
          fieldError = "Notes cannot exceed 500 characters";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError,
    }));

    return !fieldError;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If field has been touched, validate on change
    if (touchedFields[name]) {
      validateField(name, value);
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate all fields
    Object.keys(formData).forEach((field) => {
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce(
      (acc, field) => ({
        ...acc,
        [field]: true,
      }),
      {}
    );
    setTouchedFields(allTouched);

    if (validateForm()) {
      try {
        const newTransaction = {
          id: "tx" + Date.now(),
          ...formData,
          amount: Number(formData.amount),
          date: formData.date + " " + new Date().toLocaleTimeString(),
        };
        await onAddTransaction(newTransaction);
        onClose();
      } catch (error) {
        console.error("Error adding transaction:", error);
        setErrors((prev) => ({
          ...prev,
          submit: "Failed to add transaction. Please try again.",
        }));
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add New Transaction</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
          disabled={isSubmitting}
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {errors.submit}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-2 border rounded-md"
            disabled={isSubmitting}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
            <option value="transfer">Transfer</option>
            <option value="investment">Investment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-3 top-2">$</span>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full p-2 pl-7 border rounded-md ${
                touchedFields.amount && errors.amount ? "border-red-500" : ""
              }`}
              step="0.01"
              min="0"
              max="1000000"
              disabled={isSubmitting}
            />
          </div>
          {touchedFields.amount && errors.amount && (
            <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              touchedFields.description && errors.description
                ? "border-red-500"
                : ""
            }`}
            disabled={isSubmitting}
          />
          {touchedFields.description && errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              touchedFields.category && errors.category ? "border-red-500" : ""
            }`}
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            {categories[formData.type].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {touchedFields.category && errors.category && (
            <p className="text-red-500 text-sm mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              touchedFields.date && errors.date ? "border-red-500" : ""
            }`}
            max={new Date().toISOString().split("T")[0]}
            disabled={isSubmitting}
          />
          {touchedFields.date && errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes (Optional)
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 border rounded-md ${
              touchedFields.notes && errors.notes ? "border-red-500" : ""
            }`}
            rows="2"
            disabled={isSubmitting}
          />
          {touchedFields.notes && errors.notes && (
            <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
          )}
          <p className="text-gray-400 text-xs mt-1">
            {formData.notes.length}/500 characters
          </p>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

export { AddTransactionForm };
