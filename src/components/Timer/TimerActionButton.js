import React from 'react';

class TimerActionButton extends React.Component {
  render() {
    if (this.props.timerIsRunning) {
      return (
        <div
          className={`ui bottom attached red basic button ${this.props.id ? '' : 'disabled'}`}
          onClick={this.props.onStopClick}
        >
          Stop
        </div>
      );
    } else {
      return (
        <div
          className={`ui bottom attached green basic button ${this.props.id ? '' : 'disabled'}`}
          onClick={this.props.onStartClick}
        >
          Start
        </div>
      );
    }
  }
}

export default TimerActionButton;
