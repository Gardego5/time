import React from 'react';

import './Stats.css';

export default class Stats extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.getChange = this.getChange.bind(this);
  }

  async getChange() {
    let data = await fetch(`/month/${this.props.date.toJSON()}/total`);
    if (data.status === 200) {
      data = await data.json();

      this.setState(data);
    }
  }

  async componentDidMount() {
    await this.getChange();
  }

  render() {
    return (
      <div className='stats'>
        <p className='stat'>Hours: { this.state['hours'] }</p>
        <p className='stat'>Placements: { this.state['placements'] }</p>
        <p className='stat'>Videos: { this.state['videos'] }</p>
        <p className='stat'>Return Visits: { this.state['return visits'] }</p>
        <p className='stat'>Studies: { this.state['studies'] }</p>
      </div>
    ); 
  }
}
