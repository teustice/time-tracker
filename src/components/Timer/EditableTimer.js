import React from 'react';

import Timer from './Timer';
import TimerForm from './TimerForm';

class EditableTimer extends React.Component {
  state = {
    editFormOpen: false,
  };

  handleEditClick = () => {
    this.openForm();
  };

  handleFormClose = () => {
    this.closeForm();
  };

  handleSubmit = (timer) => {
    this.props.onFormSubmit(timer);
    this.closeForm();
  };

  closeForm = () => {
    this.setState({ editFormOpen: false });
  };

  openForm = () => {
    this.setState({ editFormOpen: true });
  };

  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          projects={this.props.projects}
          project={this.props.project}
          service={this.props.service}
          notes={this.props.notes}
          lapsed={this.props.elapsed}
          runningSince={this.props.runningSince}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          project={this.props.project}
          service={this.props.service}
          notes={this.props.notes}
          elapsed={this.props.elapsed}
          favorite={this.props.favorite}
          priority={this.props.priority}
          runningSince={this.props.runningSince}
          onEditClick={this.handleEditClick}
          onFavoriteClick={this.props.onFavoriteClick}
          onPriorityClick={this.props.onPriorityClick}
          onTrashClick={this.props.onTrashClick}
          onStartClick={this.props.onStartClick}
          onStopClick={this.props.onStopClick}
        />
      );
    }
  }
}

export default EditableTimer;
