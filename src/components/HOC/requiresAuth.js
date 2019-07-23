import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/setCurrentUser'

import AuthButton from '../AuthButton'
import clockSvg from '../../assets/images/clock.svg';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if(localStorage.getItem('currentUser')) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.props.setCurrentUser(user)
      }
    }

    render() {
      return (
        <div>
          { this.props.currentUser ? <ComposedComponent {...this.props} /> :
          <div className="container auth-landing-page">
            <img src={clockSvg} alt="Clock" style={{width: 80, height: 'auto'}}/>
            <h3 className="bold">Time Tracker</h3>
            <p>A custom solution for tracking time with FreshBooks</p>
            <AuthButton text="Connect your account to begin"/>
          </div>
        }
        </div>
      );
    }
  }

  const mapStateToProps = state => ({
   ...state
  })

  const mapDispatchToProps = dispatch => ({
    setCurrentUser: (val) => dispatch(setCurrentUser(val)),
  })


  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
