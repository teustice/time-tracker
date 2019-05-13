import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom'

import { TransitionGroup, CSSTransition } from "react-transition-group";
import requireAuth from '../components/HOC/requiresAuth';

import Home from '../views/Home';
import Auth from '../views/Auth';
import PageNotFound from '../views/PageNotFound';

// import GridLines from '../components/GridLines';

class Routes extends Component {
  constructor(props){
    super(props);
    this.state = {
      timeout: 1000
    }
  }
  componentDidUpdate(prevProps) {
    window.scrollTo(0,0);
  }

  componentWillUpdate(nextProps, nextState){

  }


  render(){
    return (
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="fade" timeout={300}>
          <Switch location={this.props.location}>
            <Route exact path='/' component={requireAuth(Home)}/>
            <Route exact path='/auth' component={Auth}/>
            <Route component={PageNotFound} />
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    )
  }
}

export default Routes;
