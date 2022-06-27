import React from 'react';

import Field from '../Field/Field';

import './Day.css';

export default class Day extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasChanged: false,
    };

    this.fieldChange = this.fieldChange.bind(this);
  }

  fieldChange(event) {
    this.setState({
      hasChanged: true,
      [event.target.name]: Number(event.target.value),
    });
  }

  async componentDidMount() {
    let data = await fetch(`/day/${this.props.date.toJSON()}`);
    if (data.status === 200) {
      data = await data.json();

      this.setState(data);
    }
  }

  render() {
    const date = this.props.date.toJSON();
    const dateNum = this.props.date.getDate();

    return (
      <div className='day'>
        <p className='day-number'>{ dateNum }</p>
        <Field type='hours' date={ date } onChange={ this.fieldChange } value={ this.state['hours'] } />
        <Field type='placements' date={ date } onChange={ this.fieldChange } value={ this.state['placements'] } />
        <Field type='videos' date={ date } onChange={ this.fieldChange } value={ this.state['videos'] } />
        <Field type='return visits' date={ date } onChange={ this.fieldChange } value={ this.state['return visits'] } />
        <Field type='studies' date={ date } onChange={ this.fieldChange } value={ this.state['studies'] } />
        <button className='end-edit' style={{ display: this.state.hasChanged ? 'block' : 'none' }}>✓</button>
      </div>
    );
  }
}
