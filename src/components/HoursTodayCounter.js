import React from 'react';
import { connect } from 'react-redux';

class HoursTodayCounter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entries: null
    }
  }

  componentDidMount() {
    this.getEntries();
  }

  componentDidUpdate(prevProps) {
    if(this.props.timers !== prevProps.timers){
      this.getEntries();
    }
  }

  getEntries(timer, id, pName) {
    let that = this;
    let todayStart = new Date();
    todayStart.setHours(0,0,0,0);

    let todayEnd = new Date();
    todayEnd.setHours(23,59,59,999);

    fetch(`https://api.freshbooks.com/timetracking/business/${this.props.currentUser.business_memberships[0].business.id}/time_entries?started_from=${todayStart.toISOString()}&started_to=${todayEnd.toISOString()}`, {
      headers: {
        'Authorization': `Bearer ${this.props.currentUser.token.access_token}`
      },
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        that.setState({entries: json.time_entries})
      })
  }

  hoursPushed() {
    let totalDuration = 0;
    this.state.entries.forEach(function(entry, index) {
      totalDuration += entry.duration;
    })

    //convert seconds to human
    var date = new Date(null);
    date.setSeconds(totalDuration); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);

    return result;
  }

  render() {

    return (
      <div className="total-hours-wrapper">
        {this.state.entries &&
          <p className="time-pushed">Daily Total: <strong>{this.hoursPushed()}</strong></p>
        }
      </div>
    );
  }

}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(HoursTodayCounter);
