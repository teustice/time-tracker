import React from 'react';
import { connect } from 'react-redux';
import authUrl from '../lib/authUrl'
import MoneyFlyBy from './MoneyFlyBy'

class PushTimeButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pushingTimers: false
    }
  }

  pushEntries() {
    let that = this;
    this.props.timers.forEach(function(timer, index) {
      if(timer.project.length > 2) {
        let project = JSON.parse(timer.project);
        let service = JSON.parse(timer.service)
        let duration = (timer.duration * .001).toFixed(0) //convert ms to s
        let today = new Date(Date.now())
        let startTime = (timer.favorite ? today.toISOString() : timer.initialStartTime); //return todays date as start time if pushing a favorited timer
        that.sendEntry({
          time_entry: {
            is_logged: true,
            duration: duration,
            note: timer.note,
            started_at: startTime,
            client_id: project.clientId,
            project_id: project.id,
            service_id: service.id,
            favorite: timer.favorite
          }
        }, timer._id, project.name, JSON.stringify(project), JSON.stringify(service))
      } else {
        that.props.notifications.addNotification({
          message: `A timer was not pushed, because it is missing a project`,
          level: 'warning',
          position: 'tl'
        })
      }
    })
  }

  sendEntry(timer, id, pName, project, service) {
    let that = this;
    document.querySelector('.timerlist').style.opacity = .5;
    document.querySelector('.timerlist').style.pointerEvents = 'none';
    fetch(`https://api.freshbooks.com/timetracking/business/${this.props.currentUser.business_memberships[0].business.id}/time_entries`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.props.currentUser.token.access_token}`
      },

      body: JSON.stringify(timer)
    })
      .then(function(response) {
        if(response.status === 200) {
          that.props.notifications.addNotification({
            message: `${pName} was pushed successfully`,
            level: 'success',
            position: 'tl'
          })

          if(!timer.time_entry.favorite) {
            that.props.deleteTimer(id)
          } else {
            that.props.updateTimer({
              id: id,
              note: '',
              duration: 0,
              startedAt: null,
              project: project,
              service: service
            })
          }
        } else if(response.status === 401){
          that.props.notifications.addNotification({
            message: `Your session has expired. We are redirecting you for authentication.`,
            level: 'warning',
            position: 'tl'
          })
          setTimeout(function () {
            window.location.replace(authUrl)
          }, 2000);
        }
        return response.json();
      })
      .then(function(json) {
        document.querySelector('.timerlist').style.opacity = 1;
        document.querySelector('.timerlist').style.pointerEvents = 'all';

        that.setState({pushingTimers: true});
        setTimeout(function () {
          that.setState({pushingTimers: false});
        }, 3000);
      })
  }

  render() {
    return (
      <React.Fragment>
        <MoneyFlyBy animating={this.state.pushingTimers}/>
        <div className="push-time-wrapper">
          <button onClick={this.pushEntries.bind(this)} className="ui basic button icon" data-tooltip="Push timers to freshbooks" data-position="bottom right"><i className="angle double up icon"></i></button>
        </div>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PushTimeButton);
