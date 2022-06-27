import React from 'react';

import './Field.css';

export default class Field extends React.Component {
  render() {
    const date = this.props.date;
    const type = this.props.type;

    return (
      <>
        <label htmlFor={ `${type}-${date}` }>
          { type.toLowerCase().split(' ').map(s => s.charAt(0).toUpperCase() + s.substring(1)).join(' ') }:
        </label>
        <input
          id={ `${type}-${date}` }
          defaultValue={ this.props.value ? this.props.value : '' }
          onChange={ this.props.onChange }
          name={ type }
          type='number' />
      </>
    );
  }
}