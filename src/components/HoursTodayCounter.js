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
        console.log(response);
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

    return totalDuration;
  }

  render() {
    console.log(this.state);

    return (
      <div className="total-hours-wrapper">
        {this.state.entries && this.hoursPushed()}
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
