import React, {Component} from 'react';
import { connect } from 'react-redux';

import TimersDashboard from '../components/TimersDashboard'
import { setCurrentUser } from '../actions/setCurrentUser'

class Home extends Component {

  logOut() {
    this.props.setCurrentUser(null);
    localStorage.removeItem('currentUser');
  }

  render() {
    return(
      <div className="container">

      {this.props.currentUser &&
        <div className="main-header">
          <p>Hello, <strong>{this.props.currentUser.profile.first_name}</strong> <span className="logoutButton" onClick={this.logOut.bind(this)}>(Not you?)</span></p>
        </div>
      }

      <TimersDashboard />

      </div>
    )
  }
}

const mapStateToProps = state => ({
 ...state
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: (val) => dispatch(setCurrentUser(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);
