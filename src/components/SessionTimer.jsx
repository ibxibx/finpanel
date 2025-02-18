import React, { useState, useEffect, useRef } from "react";

function SessionTimer() {
  // Replace class state with useState hooks
  const [sessionTime, setSessionTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Use ref to store the interval ID
  const timerIntervalRef = useRef(null);

  // Equivalent to componentDidMount and componentWillUnmount
  useEffect(() => {
    startTimer();

    // Cleanup function (componentWillUnmount)
    return () => {
      stopTimer();
    };
  }, []); // Empty dependency array means this runs once on mount

  // Timer functions
  const startTimer = () => {
    timerIntervalRef.current = setInterval(() => {
      if (!isPaused) {
        setSessionTime((prevTime) => prevTime + 1);
      }
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <span className="text-sm text-gray-300">
        Session Time: {formatTime(sessionTime)}
      </span>
      <button
        onClick={togglePause}
        className="px-2 py-1 text-xs rounded bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
      >
        {isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}

export default SessionTimer;

// The  SessionTimer  component is a simple timer that increments every second. It also has a pause/resume button to control the timer.
// The component uses the  useState  hook to manage the timer state and the  useRef  hook to store the interval ID.
// The  useEffect  hook is used to start the timer when the component mounts and stop the timer when the component unmounts.
// The  startTimer  function uses the  setInterval  function to increment the timer every second. The  stopTimer  function clears the interval when the component unmounts.
// The  togglePause  function toggles the  isPaused  state to pause or resume the timer.
// The  formatTime  function formats the timer value into hours, minutes, and seconds.
// The component renders the timer value and a pause/resume button.
