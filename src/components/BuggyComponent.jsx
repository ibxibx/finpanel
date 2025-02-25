import React, { useState } from "react";

const BuggyCounter = ({ label = "Counter" }) => {
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // This will cause an error when counter reaches 5
  if (counter === 5) {
    throw new Error("I crashed when counter reached 5!");
  }

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-medium text-gray-700 mb-2">{label}</h3>
      <p className="mb-3">Counter: {counter}</p>
      <button
        onClick={handleClick}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Increment
      </button>
      <p className="mt-2 text-xs text-gray-500">
        (This component will crash when counter reaches 5)
      </p>
    </div>
  );
};

const DataDisplay = ({ data }) => {
  // This will cause an error if data is null or undefined
  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h3 className="font-medium text-gray-700 mb-2">Data Display</h3>
      <p>Data: {data.value}</p>
      <p className="mt-2 text-xs text-gray-500">
        (This component will crash if data is missing)
      </p>
    </div>
  );
};

export { BuggyCounter, DataDisplay };
