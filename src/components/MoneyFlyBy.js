import React from 'react';
import snoop from '../assets/images/snoop.gif';

class MoneyFlyBy extends React.Component {

  render() {

    return (
      <React.Fragment>
        <img className={`snoop ${this.props.animating ? 'animating' : ''}`} src={snoop} alt=""/>
        <div className={`money-fly-by ${this.props.animating ? 'animating' : ''}`}></div>
      </React.Fragment>
    );
  }

}


export default(MoneyFlyBy);
