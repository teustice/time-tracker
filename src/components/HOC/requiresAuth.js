import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/setCurrentUser'

import AuthButton from '../AuthButton'

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if(localStorage.getItem('currentUser')) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.props.setCurrentUser(user)
      }
    }

    render() {
      console.log(this.props);
      return (
        <div>
          { this.props.currentUser ? <ComposedComponent {...this.props} /> :
          <div className="container" style={{paddingTop: 100}}>
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
