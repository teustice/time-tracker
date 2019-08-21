import React from 'react';
import { connect } from 'react-redux';

import EditableTimer from './EditableTimer';

class EditableTimerList extends React.Component {
  render() {
    console.log(this.props);
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={'timer' + timer._id + timer.startedAt}
        id={timer._id}
        project={JSON.parse(timer.project)}
        service={JSON.parse(timer.service)}
        notes={timer.note}
        elapsed={timer.duration}
        runningSince={timer.startedAt}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
        projects={this.props.projects}
      />
    ));
    return (
      <div id='timers' className="timerlist">
        {timers}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
})


const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(EditableTimerList);
