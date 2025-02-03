import React from 'react';

const LoadingOverlay = ({ message = "Loading..." }) => (
  <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
    <div className="text-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-2 text-blue-600">{message}</p>
    </div>
  </div>
);

export default LoadingOverlay;