import React from 'react';
import SelectSearch from 'react-select-search'

class TimerForm extends React.Component {
  state = {
    notes: this.props.notes || '',
    project: this.props.project || '',
    service: this.props.service || '',
  };


  handleNotesChange = (e) => {
    this.setState({ notes: e.target.value });
  };

  handleProjectChange = (e) => {
    this.setState({ project: e });
  };

  handleServiceChange = (e) => {
    this.setState({ service: e });
  };

  handleSubmit = () => {
    this.props.onFormSubmit({
      notes: this.state.notes,
      title: this.state.project.name,
      id: this.state.project.id,
      clientId: this.state.project.clientId,
      service: this.state.service,
    });
  };

  render() {
    console.log(this.props);

    const submitText = this.props.id ? 'Update' : 'Create';

    const options = this.props.projects.map(function(op) {
      return (
        {
          name: op.title,
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
          id: s.id
        }
      )
    }) : '';

    let projectText = this.state.project ? this.state.project.name : 'Select a project';
    let serviceText = this.state.project ? this.state.project.name : 'Select a service';

    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Project</label>
              {options.length > 1 &&
                <SelectSearch
                  options={options}
                  value={projectText}
                  renderValue={projectText}
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
                    value={serviceText}
                    renderValue={serviceText}
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
