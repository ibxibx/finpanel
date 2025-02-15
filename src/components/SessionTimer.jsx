import React from "react";

class SessionTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionTime: 0,
      isPaused: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  startTimer = () => {
    this.timerInterval = setInterval(() => {
      if (!this.state.isPaused) {
        this.setState((prevState) => ({
          sessionTime: prevState.sessionTime + 1,
        }));
      }
    }, 1000);
  };

  stopTimer = () => {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  };

  togglePause = () => {
    this.setState((prevState) => ({
      isPaused: !prevState.isPaused,
    }));
  };

  formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  render() {
    const { sessionTime, isPaused } = this.state;

    return (
      <div className="flex items-center gap-2 mt-2">
        <span className="text-sm text-gray-300">
          Session Time: {this.formatTime(sessionTime)}
        </span>
        <button
          onClick={this.togglePause}
          className="px-2 py-1 text-xs rounded bg-white bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  }
}

export default SessionTimer;
