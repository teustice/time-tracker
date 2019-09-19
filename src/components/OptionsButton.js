import React from 'react';
import { connect } from 'react-redux';

import SimpleModal from './SimpleModal';

class OptionsButton extends React.Component {
  constructor(props) {
    super(props);

    this.modal = React.createRef()
  }

  openModal() {
    if(this.modal.current) {
      this.modal.current.openModal();
    }
  }

  render() {
    console.log(this.modal);
    return (
      <React.Fragment>
        <div className="push-time-wrapper">
          <button onClick={this.openModal.bind(this)} className="ui basic button icon" data-tooltip="Settings Menu" data-position="bottom right"><i className="setting icon"></i></button>
        </div>
        <SimpleModal ref={this.modal}>
          <p>Future configuration settings will live here.</p>
        </SimpleModal>
      </React.Fragment>
    );
  }

}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(OptionsButton);
