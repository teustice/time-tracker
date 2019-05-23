import React from 'react';

import EditableTimer from './EditableTimer';

class EditableTimerList extends React.Component {
  render() {
    console.log(this.props.timers)
    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={'timer' + timer._id}
        id={timer._id}
        title={timer.title}
        project={timer.project}
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
      <div id='timers'>
        {timers}
      </div>
    );
  }
}

export default EditableTimerList;
