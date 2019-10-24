import React from 'react';

import TimerActionButton from './TimerActionButton';
import {renderElapsedString} from '../../lib/apiTimerHelpers';

class Timer extends React.Component {
  componentDidMount() {
    this.forceUpdateInterval = setInterval(() => this.forceUpdate(), 50);
  }

  componentWillUnmount() {
    clearInterval(this.forceUpdateInterval);
  }

  handleStartClick = () => {
    this.props.onStartClick(this.props.id);
  };

  handleStopClick = () => {
    this.props.onStopClick(this.props.id);
  };

  handleTrashClick = () => {
    this.props.onTrashClick(this.props.id);
  };

  render() {
    const elapsedString = renderElapsedString(
      this.props.elapsed, this.props.runningSince
    );
    return (
      <div className='ui centered card'>
        <div className="priority-buttons show-on-hover">
          <span
            className={`${this.props.favorite ? 'active' : ''}`}
            onClick={() => this.props.onPriorityClick(this.props.id, 'increase')}
            data-tooltip={`Timer Priority: ${this.props.priority}`}
            data-position="bottom right"
            >
            <i className="arrow alternate circle up icon"></i>
          </span>
          <span
            className={`${this.props.favorite ? 'active' : ''}`}
            onClick={() => this.props.onPriorityClick(this.props.id, 'decrease')}
            data-tooltip={`Timer Priority: ${this.props.priority}`}
            data-position="bottom right"
            >
            <i className="arrow alternate circle down icon"></i>
          </span>
        </div>
        <div className='content'>
          <div className='header'>
            <p>{this.props.project.name}</p>
          </div>
          <div className='meta'>
            <p className="service">{this.props.service.name}</p>
            <p className="notes">
              {this.props.notes}
            </p>
          </div>
          <div className='center aligned description'>
            <h2>
              {elapsedString}
            </h2>
          </div>
          <div className={`extra content ${this.props.id ? '' : ' disabled'} `}>
            <span
              className={`right floated star icon ${this.props.favorite ? 'active' : ''}`}
              onClick={() => this.props.onFavoriteClick(this.props.id)}
            >
              <i className='star icon' />
            </span>
            <span
              className='right floated edit icon'
              onClick={this.props.onEditClick}
            >
              <i className='edit icon' />
            </span>
            <span
              className='right floated trash icon'
              onClick={this.handleTrashClick}
            >
              <i className='trash icon' />
            </span>
          </div>
        </div>
        <TimerActionButton
          timerIsRunning={!!this.props.runningSince}
          onStartClick={this.handleStartClick}
          onStopClick={this.handleStopClick}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default Timer;
