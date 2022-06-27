import React from 'react';

import MonthSelector from '../MonthSelector/MonthSelector';
import Day from '../Day/Day';
import Spacer from '../Day/Spacer';
import Stats from '../Stats/Stats';

import { daysInMonth, getPreviousMonth, getNextMonth } from '../../utils/utils';

import './Calendar.css';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    }

    this.changeMonth = this.changeMonth.bind(this);
    this.getTotals = this.getTotals.bind(this);
  }

  get beforeOffset() {
    return (this.days[0].props.date).getDay();
  }

  get afterOffset() {
    return 7 - (this.days.length + this.beforeOffset) % 7;
  }

  get days() {
    return daysInMonth(this.state.date).map(day => (
      <Day
        date={ day.date }
        key={ day.date.toJSON() }
        onUpdate={ this.getTotals } />
    ));
  }

  changeMonth( prev ) {
    if ( prev ) {
      return (event => this.setState({ date: getPreviousMonth(this.state.date) })).bind(this);
    } else {
      return (event => this.setState({ date: getNextMonth(this.state.date) })).bind(this);
    }
  }

  async getTotals() {
    let data = await fetch(`/month/${this.state.date.toJSON()}/total`);
    if (data.status === 200) {
      data = await data.json();

      this.setState({ totals: data });
    }
  }

  async componentDidMount() {
    await this.getTotals();
  }

  async componentDidUpdate() {
    await this.getTotals();
  }

  render() {
    const month = this.state.date.toDateString().split(' ')[1];

    const weekdayTitles = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ].map(weekday => <div className='day-title' key={ weekday }>{ weekday }</div>);

    const spacers = {
      before: this.beforeOffset !== 0 ? <Spacer days={ this.beforeOffset } /> : null,
      after: this.afterOffset < 7 ? <Spacer days={ this.afterOffset } /> : null,
    }

    return (
      <div className='calendar-box' id={ `calendar-${month}` }>
        <MonthSelector prev={ true } onClick={ this.changeMonth(true) } />
        <MonthSelector prev={ false } onClick={ this.changeMonth(false) } />
        <div className='month-title'>{ month }</div>
        { weekdayTitles }
        { spacers.before }
        { this.days }
        { spacers.after }
        <Stats totals={ this.state.totals } />
      </div>
    );
  }
}
