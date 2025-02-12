import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm 
      hover:shadow-md transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
