import React from 'react';

import './Day.css';

export default class Day extends React.Component {
  render() {
    const date = this.props.date.toJSON();

    return (
      <div className='day'>
        <p className='day-number'>1</p>
        <label htmlFor={`hours-${date}`}>Hours:</label>
        <input id={`hours-${date}`} value={ `` }/>
        <label htmlFor={`placements-${date}`}>Placements:</label>
        <input id={`placements-${date}`} value={ `` }/>
        <label htmlFor={`videos-${date}`}>Videos:</label>
        <input id={`videos-${date}`} value={ `` }/>
        <label htmlFor={`return-visits-${date}`}>Return Visits:</label>
        <input id={`return-visits-${date}`} value={ `` }/>
        <label htmlFor={`studies-${date}`}>Studies:</label>
        <input id={`studies-${date}`} value={ `` }/>
        <button className='end-edit'>✓</button>
      </div>
    );
  }
}