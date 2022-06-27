import React from 'react';

import './MonthSelector.css';

export default function MonthSelector(props) {
  const isPrev = props.prev;

  return (
    <div className='centered' style={ { gridColumn: isPrev ? 1 : 9 } }>
      <button className='arrow' onClick={ props.onClick }>
        { isPrev ? `<` : `>` }
      </button>
    </div>
  );
}
