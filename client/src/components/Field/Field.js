import React from 'react';

import './Field.css';

export default function Field(props) {
  const date = props.date;
  const type = props.type;

  return (
    <>
      <label htmlFor={ `${type}-${date}` }>
        { type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') + ':'}
      </label>
      <input
        id={ `${type}-${date}` }
        defaultValue={ props.value ? props.value : '' }
        onChange={ props.onChange }
        name={ type }
        type='number' />
    </>
  );
}
