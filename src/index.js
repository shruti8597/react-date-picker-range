import React, { Component } from 'react';
import Dropdown from './Dropdown';
import './main.less';

export default function SingleCalendar(props) {
  return <Dropdown {...props} calendarType="single" />;
}

export function RangeCalendar(props) {
  return <Dropdown {...props} calendarType="range" />;
}
