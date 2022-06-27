import React from 'react';

import Calendar from '../Calendar/Calendar';

import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <div className='container'>
        <Calendar />
      </div>
    );
  }
}
