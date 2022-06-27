import React from 'react';

import './Stats.css';

export default class Stats extends React.Component {
  render() {
    return (
      <div className='stats'>
        <p className='stat'>Hours: {}</p>
        <p className='stat'>Placements: {}</p>
        <p className='stat'>Videos: {}</p>
        <p className='stat'>Return Visits: {}</p>
        <p className='stat'>Studies: {}</p>
      </div>
    ); 
  }
}
