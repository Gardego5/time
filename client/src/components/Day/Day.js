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
    this.sendChange = this.sendChange.bind(this);
    this.getChange = this.getChange.bind(this);
  }

  fieldChange(event) {
    this.setState({
      hasChanged: true,
      [event.target.name]: Number(event.target.value),
    });
  }

  async sendChange(event) {
    const data = ['hours', 'placements', 'videos', 'return visits', 'studies']
      .filter(key => key in this.state)
      .reduce((obj2, key) => (obj2[key] = this.state[key], obj2), {});

    const req = await fetch(`/day/${this.props.date.toJSON()}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    await this.getChange();
    await this.props.onUpdate();
  }

  async getChange() {
    let data = await fetch(`/day/${this.props.date.toJSON()}`);
    if (data.status === 200) {
      data = await data.json();

      this.setState(data);
    }

    this.state.hasChanged = false;
  }

  async componentDidMount() {
    await this.getChange();
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
        <button className='end-edit' style={{ display: this.state.hasChanged ? 'block' : 'none' }} onClick={ this.sendChange } >✓</button>
      </div>
    );
  }
}
