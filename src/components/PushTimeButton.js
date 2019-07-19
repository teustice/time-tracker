import React from 'react';
import { connect } from 'react-redux';

class PushTimeButton extends React.Component {

  pushEntries() {
    let that = this;
    this.props.timers.forEach(function(timer) {
      if(timer.project.length > 2) {
        let project = JSON.parse(timer.project);
        let service = JSON.parse(timer.service)
        let duration = (timer.duration * .001).toFixed(0) //convert ms to s
        that.sendEntry({
          time_entry: {
            is_logged: true,
            duration: duration,
            note: timer.note,
            started_at: timer.initialStartTime,
            client_id: project.clientId,
            project_id: project.id,
            service_id: service.id
          }
        }, timer._id)
      }
    })
  }

  sendEntry(timer, id) {
    let that = this;
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
          that.props.deleteTimer(id)
        }
        console.log(response);
        return response.json();
      })
      .then(function(json) {
        console.log(json);
      })
  }

  render() {
    return (
      <div className="push-time-wrapper">
        <button onClick={this.pushEntries.bind(this)} className="ui basic button icon" data-tooltip="Push timers to freshbooks" data-position="bottom right"><i className="angle double up icon"></i></button>
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(PushTimeButton);
