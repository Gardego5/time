import React from 'react';

import MonthSelector from '../MonthSelector/MonthSelector';
import Day from '../Day/Day';
import Stats from '../Stats/Stats';

import './Calendar.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    }
  }

  render() {
    const month = this.state.date.toDateString().split(' ')[1];

    return <div className='calendar-box' id={ `calendar-${month}` }>
      <MonthSelector prev={ true } />
      <MonthSelector prev={ false } />
      <div className='month-title'>{ month }</div>
      <div className='day-title'>Sunday</div>
      <div className='day-title'>Monday</div>
      <div className='day-title'>Tuesday</div>
      <div className='day-title'>Wednesday</div>
      <div className='day-title'>Thursday</div>
      <div className='day-title'>Friday</div>
      <div className='day-title'>Saturday</div>
      <Day date={this.state.date}/>
      <Stats />
    </div>;
  }
}
