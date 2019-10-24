import React from 'react';
import { Resizable, ResizableBox } from 'react-resizable';

import EditableTimer from './EditableTimer';

class EditableTimerList extends React.Component {
  constructor(props) {
    super(props);

    this.draggableArea = React.createRef()

    this.state = {
      listWidth: localStorage.getItem('timerListWidth') && !isNaN(localStorage.getItem('timerListWidth')) ? parseInt(localStorage.getItem('timerListWidth')) : 320
    }
  }


  saveWidth(e, data) {
    if(data.size.width) {
      localStorage.setItem('timerListWidth', data.size.width);
    }
  }

  render() {

    const timers = this.props.timers.map((timer) => (
      <EditableTimer
        key={'timer' + timer._id + timer.startedAt}
        id={timer._id}
        project={JSON.parse(timer.project)}
        service={JSON.parse(timer.service)}
        notes={timer.note}
        favorite={timer.favorite}
        priority={timer.priority}
        elapsed={timer.duration}
        runningSince={timer.startedAt}
        onFormSubmit={this.props.onFormSubmit}
        onTrashClick={this.props.onTrashClick}
        onFavoriteClick={this.props.onFavoriteClick}
        onPriorityClick={this.props.onPriorityClick}
        onStartClick={this.props.onStartClick}
        onStopClick={this.props.onStopClick}
        projects={this.props.projects}
      />
    ));
    return (
      <ResizableBox
        width={this.state.listWidth}
        axis={'x'}
        minConstraints={[320, 320]}
        onResizeStop={(e, data) => this.saveWidth(e, data)}>
        <div ref={this.draggableArea} id='timers' className="timerlist grid-mode">
          {timers}
        </div>
      </ResizableBox>
    );
  }
}

export default EditableTimerList;
