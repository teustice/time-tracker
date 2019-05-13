import React, {Component} from 'react';
import AuthButton from '../components/AuthButton'
import { connect } from 'react-redux';
import { setCurrentUser } from '../actions/setCurrentUser'

import {
  getToken, getUser
} from '../lib/apiUserHelpers'

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

class Auth extends Component {
  constructor() {
    super();

    this.state = {
      error: false,
    }
  }

  componentDidMount() {
    let that = this;
    let oAuthCode = getUrlVars()['code'];
    if(!oAuthCode) {
      this.setState({error: true});
    } else {
      getToken(oAuthCode, function(json) {
        if(json.error) {
          that.setState({error: true})
        } else {
          that.props.setCurrentUser(json)
          localStorage.setItem('currentUser', JSON.stringify(json));
          that.props.history.push('/')
        }
      });

    }
  }

  render() {
    return(
      <div className="container">
        {this.state.error &&
          <div className="content">
            <h1 className="h2 page-title">Something went wrong</h1>
            <a className="btn_1" href="/">Home</a>
            <AuthButton text="try again"/>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({
  setCurrentUser: (val) => dispatch(setCurrentUser(val))
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
