import React, { useState, useEffect } from "react";

function SessionTimer() {
  const [sessionTime, setSessionTime] = useState(0);
  const [isActive, setIsActive] = useState(true);

  // ComponentDidMount equivalent - starts when component mounts
  useEffect(() => {
    console.log("SessionTimer mounted");
    const startTime = Date.now();
    const timer = setInterval(() => {
      if (isActive) {
        setSessionTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);

    // ComponentWillUnmount equivalent - cleanup when component unmounts
    return () => {
      console.log("SessionTimer will unmount");
      clearInterval(timer);
    };
  }, [isActive]);

  // ComponentDidUpdate equivalent - runs when isActive changes
  useEffect(() => {
    console.log(
      "Session timer status updated:",
      isActive ? "active" : "paused"
    );
  }, [isActive]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600">
      <span>Session time:</span>
      <span className="font-medium">{formatTime(sessionTime)}</span>
      <button
        onClick={() => setIsActive(!isActive)}
        className="text-xs px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        {isActive ? "Pause" : "Resume"}
      </button>
    </div>
  );
}

export { SessionTimer };
