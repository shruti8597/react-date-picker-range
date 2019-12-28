import React, { Component } from 'react';

export default class DateInput extends Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    this.props.onChangeInput(e.target.value);
  };

  render() {
    const {
      prefix,
      inputDate,
      disabled,
      handleClick,
      error,
      selected,
    } = this.props;
    let className = 'rcal-date-input-box';
    className += error ? ' rcal-date-input-error' : '';
    className += selected ? ' rcal-date-input-selected' : '';
    return (
      <div className="rcal-show-date">
        <label className="label">{prefix}</label>
        <input
          onFocus={handleClick}
          className={className}
          disabled={disabled}
          type="text"
          onChange={this.handleChange}
          placeholder="dd/mm/yyyy"
          value={inputDate}
        />
      </div>
    );
  }
}
