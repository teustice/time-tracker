import React, {Component} from 'react';

import TimersDashboard from '../components/TimersDashboard'

class Home extends Component {

  render() {
    return(
      <div className="container">
        <h1 className="h2 page-title">Home Page</h1>

      {this.props.currentUser &&
        <p>Hello, {this.props.currentUser.profile.first_name}</p>
      }

      <TimersDashboard />

      </div>
    )
  }
}


export default (Home);
