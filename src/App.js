import React, { Component } from 'react';
import './styles/main.scss';
import { withRouter } from 'react-router-dom';
import Routes from './lib/Routes';
import Notification from './components/Notifications';

class App extends Component {
  render() {
    return (
      <div className="global-wrapper">
        <Notification />
        <Routes location={this.props.location}/>
      </div>
    );
  }
}

export default withRouter(App);
