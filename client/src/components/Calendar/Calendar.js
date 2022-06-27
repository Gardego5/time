import React from 'react';

import MonthSelector from '../MonthSelector/MonthSelector';
import Day from '../Day/Day';
import Spacer from '../Day/Spacer';
import Stats from '../Stats/Stats';

import { daysInMonth } from '../../utils/utils';

import './Calendar.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    }
  }

  get beforeOffset() {
    return (this.days[0].props.date).getDay();
  }

  get afterOffset() {
    return 7 - (this.days.length + this.beforeOffset) % 7;
  }

  get days() {
    return daysInMonth(this.state.date).map(day => <Day date={day.date} key={day.date.toJSON()} />);
  }

  render() {
    const month = this.state.date.toDateString().split(' ')[1];

    const weekdayTitles = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ].map(weekday => <div className='day-title' key={ weekday }>{ weekday }</div>);

    return <div className='calendar-box' id={ `calendar-${month}` }>
      <MonthSelector prev={ true } />
      <MonthSelector prev={ false } />
      <div className='month-title'>{ month }</div>
      { weekdayTitles }
      <Spacer days={ this.beforeOffset } />
      { this.days }
      <Spacer days={ this.afterOffset } />
      <Stats />
    </div>;
  }
}
