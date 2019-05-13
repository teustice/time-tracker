import React from 'react';
import { connect } from 'react-redux';
import { setCurrentUser } from '../../actions/setCurrentUser'

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    componentDidMount() {
      if(localStorage.getItem('currentUser')) {
        let user = JSON.parse(localStorage.getItem('currentUser'));
        this.props.setCurrentUser(user)
      } else {
        this.props.history.push('https://my.freshbooks.com/service/auth/oauth/authorize?client_id=8c72f5154be8eb27e1e4ae05313afdb4990e75c94de95901dc677853b2b16a9b&response_type=code&redirect_uri=https://time.codeboy.dev')
      }
    }

    render() {
      return (
        <div>
          { this.props.currentUser ? <ComposedComponent {...this.props} /> : 'redirecting to FreshBooks' }
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
