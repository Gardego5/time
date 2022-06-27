import React from 'react';

import './MonthSelector.css';

export default class MonthSelector extends React.Component {
  render() {
    const isPrev = this.props.prev;

    return (
      <div className='centered' style={ { gridColumn: isPrev ? 1 : 9 } }>
        <button className='arrow'>
          { isPrev ? `<` : `>` }
        </button>
      </div>
    );
  }
}
