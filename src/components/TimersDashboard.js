/*
eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
no-undef, jsx-a11y/label-has-for, react/jsx-first-prop-new-line
*/

import React from 'react';
import { connect } from 'react-redux';

import EditableTimerList from './Timer/EditableTimerList'
import ToggleableTimerForm from './Timer/ToggleableTimerForm'
import * as client from '../lib/apiTimerHelpers'

class TimersDashboard extends React.Component {
  state = {
    timers: [],
    projects: []
  };

  componentDidMount() {
    this.loadTimersFromServer();
    setInterval(this.loadTimersFromServer, 5000);
    this.fetchProjects()
  }

  fetchProjects(page) {
    let that = this;
    fetch(`https://api.freshbooks.com/projects/business/${this.props.currentUser.business_memberships[0].business.id}/projects?per_page=500`, {
      headers: {
        'Authorization': `Bearer ${this.props.currentUser.token.access_token}`
      }
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      that.setState({projects: json.projects})
    });
  }

  loadTimersFromServer = () => {
    client.getTimers((serverTimers) => (
        this.setState({ timers: serverTimers })
      )
    );
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
  };

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  };

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  createTimer = (timer) => {
    const t = client.newTimer(timer);
    this.setState({
      timers: this.state.timers.concat(t),
    });

    client.createTimer(t);
  };

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });

    client.updateTimer(attrs);
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t._id !== timerId),
    });

    client.deleteTimer(
      { id: timerId }
    );
  };

  startTimer = (timerId) => {
    const now = Date.now();

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer._id === timerId) {
          return Object.assign({}, timer, {
            startedAt: now,
          });
        } else {
          return timer;
        }
      }),
    });

    client.startTimer(
      { id: timerId, startedAt: now }
    );
  };

  stopTimer = (timerId) => {
    const now = Date.now();

    client.findById(this.state.timers, timerId,
      function(timer) {
        const lastElapsed = now - new Date(timer.startedAt).getTime();
        let updatedTimer = Object.assign({}, timer, {
          duration: timer.duration + lastElapsed,
          startedAt: null,
        });
        client.stopTimer(
          updatedTimer
        )
      }
    );

    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer._id === timerId) {
          const lastElapsed = now - new Date(timer.startedAt).getTime();
          let updatedTimer = Object.assign({}, timer, {
            duration: timer.duration + lastElapsed,
            startedAt: null,
          });

          return updatedTimer;
        } else {
          return timer;
        }
      }),
    });


  };



  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
            timers={this.state.timers}
            onFormSubmit={this.handleEditFormSubmit}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
            projects={this.state.projects}
          />
          <ToggleableTimerForm
            onFormSubmit={this.handleCreateFormSubmit}
            projects={this.state.projects}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TimersDashboard);
