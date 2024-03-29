/*
eslint-disable react/prefer-stateless-function, react/jsx-boolean-value,
no-undef, jsx-a11y/label-has-for, react/jsx-first-prop-new-line
*/

import React from 'react';
import { connect } from 'react-redux';

import authUrl from '../lib/authUrl'
import EditableTimerList from './Timer/EditableTimerList'
import ToggleableTimerForm from './Timer/ToggleableTimerForm'
import PushTimeButton from './PushTimeButton'
import OptionsButton from './OptionsButton'
import HoursTodayCounter from './HoursTodayCounter'
import * as client from '../lib/apiTimerHelpers'


function sortTimersByPriority(a, b) {
  if (a.priority > b.priority) {
    return -1;
  } else if (b.priority > a.priority) {
    return 1;
  } else {
    return 0;
  }
}

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
    fetch(`https://api.freshbooks.com/projects/business/${this.props.currentUser.business_memberships[0].business.id}/projects?per_page=500&complete=false`, {
      headers: {
        'Authorization': `Bearer ${this.props.currentUser.token.access_token}`
      }
    })
    .then(function(response) {
      if(response.status === 401) {
        //if not authorized when fetching projects, re-auth
        window.location.assign(authUrl);
      } else {
        return response.json();
      }
    })
    .then(function(json) {
      that.setState({projects: json.projects})
    });
  }

  loadTimersFromServer = () => {
    client.getTimers((serverTimers) => (
        this.setState({ timers: serverTimers })
      ), this.props.currentUser.id
    );
  };

  handleCreateFormSubmit = (timer) => {
    this.createTimer(timer);
    this.props.notifications.addNotification({
      message: `Timer created successfully`,
      level: 'success',
      position: 'tl'
    })
  };

  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
    this.props.notifications.addNotification({
      message: `Timer updated successfully`,
      level: 'success',
      position: 'tl'
    })
  };

  handleTrashClick = (timerId) => {
    this.deleteTimer(timerId);
    this.props.notifications.addNotification({
      message: `Timer deleted successfully`,
      level: 'warning',
      position: 'tl'
    })
  };

  handleFavoriteClick = (timerId) => {
    this.favoriteTimer(timerId);
  };

  handlePriorityClick = (timerId, direction) => {
    this.updatePriority(timerId, direction);
  };

  handleStartClick = (timerId) => {
    this.startTimer(timerId);
  };

  handleStopClick = (timerId) => {
    this.stopTimer(timerId);
  };

  createTimer = (timer) => {
    timer.userID = this.props.currentUser.id

    this.setState({
      timers: this.state.timers.concat(timer),
    });


    client.createTimer(timer);
  };

  updateTimer = (attrs) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer._id === attrs.id) {
          if(attrs.startedAt) {
            attrs.startedAt = Date.now();
          }
          return Object.assign({}, timer, {
            startedAt: attrs.startedAt,
            note: attrs.note,
            duration: attrs.duration,
            project: attrs.project,
            service: attrs.service,
          });
        } else {
          return timer;
        }
      }),
    });

    client.updateTimer(attrs);
  };

  updatePriority = (timerId, direction) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer._id === timerId) {
          let priority = timer.priority;
          if(direction === 'increase') {
            priority += 1;
          } else {
            priority -= 1;
          }
          client.updateTimer({id: timerId, priority: priority});
          return Object.assign({}, timer, {
            priority: priority
          });
        } else {
          return timer;
        }

      }),
    });

  };

  favoriteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer._id === timerId) {
          client.updateTimer({id: timerId, favorite: !timer.favorite});
          return Object.assign({}, timer, {
            favorite: !timer.favorite
          });
        } else {
          return timer;
        }

      }),
    });

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
    let sortedTimers = this.state.timers.slice();
    sortedTimers.sort(sortTimersByPriority);
    return (
      <div className='ui'>
        <div className="top-right">
          <OptionsButton />
          <PushTimeButton timers={sortedTimers} deleteTimer={this.deleteTimer} updateTimer={this.updateTimer}/>
        </div>
        <div>
          <EditableTimerList
            timers={sortedTimers}
            onFormSubmit={this.handleEditFormSubmit}
            onFavoriteClick={this.handleFavoriteClick}
            onPriorityClick={this.handlePriorityClick}
            onTrashClick={this.handleTrashClick}
            onStartClick={this.handleStartClick}
            onStopClick={this.handleStopClick}
            projects={this.state.projects}
          />
        <HoursTodayCounter timers={sortedTimers} projects={this.state.projects}/>
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
