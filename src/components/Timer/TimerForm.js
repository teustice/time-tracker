import React from 'react';
import SelectSearch from 'react-select-search'
import TimeField from 'react-simple-timefield';

import {renderElapsedString} from '../../lib/apiTimerHelpers';

class TimerForm extends React.Component {
  state = {
    notes: this.props.notes || '',
    project: this.props.project || '',
    service: this.props.service || '',
    duration: '00:00:00'
  };

  componentDidMount() {
    if(this.props.lapsed) {
      const elapsedString = renderElapsedString(
        this.props.lapsed, this.props.runningSince
      );

      this.setState({duration: elapsedString});      
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    //Prevent re-render due to server interval - this fixed an issue causing the dropdown filter to reset
    if (
      this.state.notes !== nextState.notes ||
      nextState.project !== this.state.project ||
      nextState.duration !== this.state.duration
    ) {
      return true
    } else {
      return false
    }
  }

  handleNotesChange = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleProjectChange = (e) => {
    this.setState({ project: e });
  };

  handleServiceChange = (e) => {
    this.setState({ service: e });
  };

  handleDurationChange = (e) => {
    this.setState({ duration: e });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      id: this.props.id,
      note: this.state.notes,
      startedAt: this.props.runningSince,
      clientID: this.state.project.clientId,
      project: JSON.stringify(this.state.project),
      service: JSON.stringify(this.state.service),
      duration: this.convertHumanToMilliseconds(this.state.duration),
      isLogged: false,
    });
  };

  milliseconds = (h, m, s) => {
    return (h*60*60+m*60+s)*10
  };

  convertHumanToMilliseconds(time) {
    let timeParts = time.split(":");

    return this.milliseconds(timeParts[0], timeParts[1], timeParts[2]);

  }

  render() {
    const submitText = this.props.id ? 'Update' : 'Create';

    const options = this.props.projects.map(function(op) {
      return (
        {
          name: op.title,
          key: op.id,
          value: op.id,
          id: op.id,
          clientId: op.client_id,
          services: op.services
        }
      )
    })

    const services = this.state.project ? this.state.project.services.map(function(s) {
      return (
        {
          name: s.name,
          value: s.id,
          id: s.id
        }
      )
    }) : '';

    let projectText = this.state.project ? this.state.project.name : 'Select a project';
    let serviceText = this.state.service ? this.state.service.name : 'Select a service';


    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Time</label>
                <TimeField
                  value={this.state.duration}
                  onChange={this.handleDurationChange}
                  colon=":"
                  style={{width: '100%'}}
                  showSeconds={true}
                />
            </div>
            <div className='field'>
              <label>Project</label>
              {options.length > 1 &&
                <SelectSearch
                  value={1}
                  options={options}
                  onChange={(e) => this.handleProjectChange(e)}
                  name="project"
                  placeholder={projectText} />
              }
            </div>
            {this.state.project &&
              <div className='field'>
                <label>Service</label>
                {services.length > 1 &&
                  <SelectSearch
                    options={services}
                    onChange={(e) => this.handleServiceChange(e)}
                    name="service"
                    placeholder={serviceText} />
                }
              </div>
            }
            <div className='field'>
              <label>Notes</label>
              <textarea
                style={{height: 50}}
                type='text'
                value={this.state.notes}
                onChange={this.handleNotesChange}
              />
            </div>
            <div className='ui two bottom attached buttons'>
              <button
                className='ui basic blue button'
                onClick={this.handleSubmit}
              >
                {submitText}
              </button>
              <button
                className='ui basic red button'
                onClick={this.props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}



export default TimerForm;
