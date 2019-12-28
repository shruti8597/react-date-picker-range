import React, { Component } from 'react';
import Single from './SingleCalendar';
import Range from './RangeCalendar';

export default class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = { openDropdown: false };
    this.closeDropdown = this.closeDropdown.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  closeDropdown() {
    this.handleClick();
    this.setState({ openDropdown: false });
  }

  handleOutsideClick(e) {
    if (this.node && this.node.contains(e.target)) return;
    this.closeDropdown();
  }

  handleClick() {
    if (!this.state.openDropdown) {
      document.addEventListener('mousedown', this.handleOutsideClick, false);
    } else
      document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  toggleDropdown() {
    this.handleClick();
    this.setState({ openDropdown: !this.state.openDropdown });
  }

  render() {
    const { openDropdown } = this.state;
    let className = 'rcal-date-picker';
    className +=
      this.props.sideMenu && this.props.sideMenu.length > 0
        ? ' rcal-side-menu'
        : '';
    className += openDropdown ? ' rcal-picker-open' : '';
    return (
      <div className={className} ref={node => (this.node = node)}>
        {
          <div className="rcal-picker-header" onClick={this.toggleDropdown}>
            <div className="rcal-header-content">
              <div className="rcal-date-header">{this.props.label}</div>
              <div className="rcal-date-value">{this.props.value}</div>
            </div>
            <div className="rcal-date-icon">
              {openDropdown && this.props.reverseCalendar ? 'r' : 'c'}
            </div>
          </div>
        }

        {openDropdown && (
          <div className="rcal-picker-body">
            {this.props.calendarType == 'single' && (
              <Single closeDropdown={this.closeDropdown} {...this.props} />
            )}
            {this.props.calendarType == 'range' && (
              <Range closeDropdown={this.closeDropdown} {...this.props} />
            )}
          </div>
        )}
      </div>
    );
  }
}
