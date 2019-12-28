import React, { Component } from 'react';
import { compareDate } from './utils';

class SideBar extends Component {
  render() {
    const { sideMenu, selectDate, fromDate, toDate } = this.props;
    return (
      <ul className="rcal-side-bar">
        {sideMenu.map((row, index) => {
          const fromSelected = fromDate && compareDate(row.from, fromDate);
          const toSelected = toDate && compareDate(row.to, toDate);
          const isFromSelected = fromSelected ? ' rcal-menu-selected' : '';
          const selectedClass = toDate
            ? toSelected
              ? isFromSelected
              : ''
            : isFromSelected;
          return (
            <li
              key={index}
              className={'rcal-menu-item' + selectedClass}
              onClick={() => selectDate(row.from, row.to)}
            >
              {row.label}
            </li>
          );
        })}
      </ul>
    );
  }
}

export default SideBar;
