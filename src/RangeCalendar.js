import React, { Component } from 'react';
import MainCalendar from './MainCalendar';
import SideBar from './sideBar';
import DateInput from './DateInput';
import PropTypes from 'prop-types';
import moment from 'moment';
import * as utils from './utils';

class Calendar extends Component {
  constructor(props) {
    super(props);
    let today = new Date();
    let dateSelectFrom =
      this.props.defaultFromDate || this.props.defaultToDate || today;
    let viewableMonth = dateSelectFrom.getMonth();
    let viewableYear = dateSelectFrom.getFullYear();
    let focusInputType = this.props.disabledFromPicker
      ? this.props.disabledToPicker
        ? -1
        : 1
      : 0;
    this.state = {
      inputFromDate: utils.formatDate(this.props.defaultFromDate),
      inputToDate: utils.formatDate(this.props.defaultToDate),
      fromDate: this.props.defaultFromDate,
      toDate: this.props.defaultToDate,
      viewableMonth,
      viewableYear,
      viewableDecade: viewableYear,
      focusInputType,
      errorToInput: false,
      errorFromInput: false,
    };
  }

  selectFromDate = (date, inputFocusNoChange) => {
    if (this.props.disabledFromPicker) return;
    if (this.state.toDate && this.state.toDate < date) return;
    if (this.props.disabled(date)) return;
    let newState = {};
    newState.viewableMonth = date.getMonth();
    newState.viewableYear = date.getFullYear();
    newState.fromDate = date;
    newState.inputFromDate = utils.formatDate(date);
    newState.errorFromInput = false;

    if (!this.props.disabledToPicker && !inputFocusNoChange) {
      if (this.state.toDate)
        newState.viewableMonth = this.state.toDate.getMonth();
      if (this.state.toDate)
        newState.viewableYear = this.state.toDate.getFullYear();
      newState.focusInputType = 1;
    }
    newState.viewableDecade = newState.viewableYear;
    this.setState(newState);
  };

  selectSideMenuDate = (date, toDate) => {
    let newState = {};

    if (!this.props.disabledFromPicker) {
      newState.fromDate = date;
      newState.inputFromDate = utils.formatDate(date);
      newState.viewableMonth = date.getMonth();
      newState.viewableYear = date.getFullYear();
      newState.viewableDecade = date.getFullYear();
      newState.focusInputType = 0;
      newState.errorFromInput = false;
    }
    if (!this.props.disabledToPicker) {
      newState.toDate = toDate;
      newState.inputToDate = utils.formatDate(toDate);
      newState.errorToInput = false;
      if (this.props.disabledFromPicker) {
        newState.viewableMonth = toDate.getMonth();
        newState.viewableYear = toDate.getFullYear();
        newState.viewableDecade = toDate.getFullYear();
        newState.focusInputType = 1;
      }
    }
    let compareFrom = newState.fromDate || this.state.fromDate;
    let compareTo = newState.toDate || this.state.toDate;
    if (!compareFrom || !compareTo || compareFrom <= compareTo) {
      if (compareFrom && this.props.disabled(compareFrom)) return;
      if (compareTo && this.props.disabled(compareTo)) return;
      this.setState(newState);
    }
  };

  selectToDate = (date, inputFocusNoChange) => {
    if (this.props.disabledToPicker) return;
    if (this.state.fromDate && this.state.fromDate > date) return;
    if (this.props.disabled(date)) return;
    let newState = {};
    newState.viewableMonth = date.getMonth();
    newState.viewableYear = date.getFullYear();
    newState.toDate = date;
    newState.inputToDate = utils.formatDate(date);
    newState.errorToInput = false;
    if (!this.props.disabledFromPicker && !inputFocusNoChange) {
      if (this.state.fromDate)
        newState.viewableMonth = this.state.fromDate.getMonth();
      if (this.state.fromDate)
        newState.viewableYear = this.state.fromDate.getFullYear();
      newState.focusInputType = 0;
    }
    newState.viewableDecade = newState.viewableYear;
    this.setState(newState);
  };

  selectDate = date => {
    if (this.state.focusInputType == 0) {
      if (!this.state.toDate || date <= this.state.toDate)
        this.selectFromDate(date);
    } else if (this.state.focusInputType == 1)
      if (!this.state.fromDate || date >= this.state.fromDate)
        this.selectToDate(date);
  };

  changeViewableDate = (month, year) => {
    this.setState({
      viewableMonth: month,
      viewableYear: year,
      viewableDecade: year,
    });
  };

  changeDecade = decade => {
    this.setState({ viewableDecade: decade });
  };

  onChangeFromInput = input => {
    this.setState({ inputFromDate: input });
    const valid = utils.checkValidDate(input);
    let validDate = valid && !(this.state.toDate && this.state.toDate < valid);
    if (validDate && !this.props.disabled(valid))
      this.selectFromDate(valid, true);
    else this.setState({ errorFromInput: true });
  };

  onChangeToInput = input => {
    this.setState({ inputToDate: input });
    const valid = utils.checkValidDate(input);
    let validDate =
      valid && !(this.state.fromDate && this.state.fromDate > valid);
    if (validDate && !this.props.disabled(valid))
      this.selectToDate(valid, true);
    else this.setState({ errorToInput: true });
  };

  renderDate = (date, monthType) => {
    let { viewableMonth, viewableYear, fromDate, toDate } = this.state;
    const { disabled } = this.props;
    if (monthType == 'prev-month') {
      let prevDate = new Date(viewableYear, viewableMonth - 1, date);
      viewableMonth = prevDate.getMonth();
      viewableYear = prevDate.getFullYear();
    }
    if (monthType == 'next-month') {
      let nextMonthDate = new Date(viewableYear, viewableMonth + 1, date);
      viewableMonth = nextMonthDate.getMonth();
      viewableYear = nextMonthDate.getFullYear();
    }
    let disabledDate = disabled(new Date(viewableYear, viewableMonth, date));
    if (this.state.focusInputType == 0) {
      disabledDate = disabledDate || this.props.disabledFromPicker;
      disabledDate =
        disabledDate ||
        (this.state.toDate &&
          new Date(viewableYear, viewableMonth, date) > this.state.toDate);
    } else if (this.state.focusInputType == 1) {
      disabledDate = disabledDate || this.props.disabledToPicker;
      disabledDate =
        disabledDate ||
        (this.state.fromDate &&
          new Date(viewableYear, viewableMonth, date) < this.state.fromDate);
    } else disabledDate = true;
    const toMonth = toDate && toDate.getMonth();
    const toOfDate = toDate && toDate.getDate();
    const toYear = toDate && toDate.getFullYear();
    const fromMonth = fromDate && fromDate.getMonth();
    const fromOfDate = fromDate && fromDate.getDate();
    const fromYear = fromDate && fromDate.getFullYear();

    const greaterFrom =
      fromDate &&
      new Date(fromYear, fromMonth, fromOfDate) <=
        new Date(viewableYear, viewableMonth, date);
    const lessTo =
      toDate &&
      new Date(toYear, toMonth, toOfDate) >=
        new Date(viewableYear, viewableMonth, date);

    const to =
      toMonth == viewableMonth && toYear == viewableYear && toOfDate == date;
    const from =
      fromMonth == viewableMonth &&
      fromYear == viewableYear &&
      fromOfDate == date;
    const today =
      new Date().getDate() == date &&
      new Date().getMonth() == viewableMonth &&
      new Date().getFullYear() == viewableYear;
    let className = 'rcal-date-item';
    className += greaterFrom && lessTo ? ' rcal-range-selected' : '';
    className += disabledDate ? ' rcal-date-disabled' : '';
    className += today ? ' rcal-date-today' : '';
    className += to ? ' rcal-date-range-end' : '';
    className += from ? ' rcal-date-range-start' : '';
    className += monthType ? ' rcal-date-out-scope' : '';
    return (
      <div
        key={date + '/' + viewableMonth}
        onClick={
          disabledDate
            ? null
            : () => this.selectDate(new Date(viewableYear, viewableMonth, date))
        }
        className={className}
      >
        {date}
      </div>
    );
  };

  closeDropdownAfterSave = () => {
    this.props.onChangeDate(this.state.fromDate, this.state.toDate);
    this.props.closeDropdown();
  };

  handleInputFromClick = () => {
    if (this.props.disabledFromPicker) return;
    let newState = { focusInputType: 0 };
    let date = this.state.fromDate;
    if (date) {
      newState.viewableMonth = date.getMonth();
      newState.viewableYear = date.getFullYear();
      newState.viewableDecade = date.getFullYear();
    }
    this.setState(newState);
  };

  handleInputToClick = () => {
    if (this.props.disabledToPicker) return;
    let newState = { focusInputType: 1 };
    let date = this.state.toDate;
    if (date) {
      newState.viewableMonth = date.getMonth();
      newState.viewableYear = date.getFullYear();
      newState.viewableDecade = date.getFullYear();
    }
    this.setState(newState);
  };

  render() {
    const {
      locale,
      sideMenu,
      disabledFromPicker,
      disabledToPicker,
    } = this.props;
    moment.locale(locale);
    const monthLocale = moment.monthsShort();
    const monthNameArray = monthLocale.map((mon, index) => ({
      value: index,
      label: mon,
    }));
    const daysLocale = moment.weekdaysMin();
    const weekNameArray = daysLocale.slice(1).concat(daysLocale[0]);
    moment.locale('en');
    const errorInputs = this.state.errorFromInput || this.state.errorToInput;
    return (
      <div className="rcal-range-calendar">
        <div className="rcal-calendar-without-sidebar">
          <div className="rcal-date-input">
            <DateInput
              inputDate={this.state.inputFromDate}
              disabled={disabledFromPicker}
              onChangeInput={this.onChangeFromInput}
              prefix={this.props.fromDatePrefix}
              error={this.state.errorFromInput}
              selected={this.state.focusInputType == 0}
              handleClick={this.handleInputFromClick}
            />

            <DateInput
              inputDate={this.state.inputToDate}
              disabled={disabledToPicker}
              onChangeInput={this.onChangeToInput}
              prefix={this.props.toDatePrefix}
              error={this.state.errorToInput}
              selected={this.state.focusInputType == 1}
              handleClick={this.handleInputToClick}
            />
          </div>

          <MainCalendar
            monthNameArray={monthNameArray}
            changeViewableDate={this.changeViewableDate}
            viewableMonth={this.state.viewableMonth}
            viewableYear={this.state.viewableYear}
            renderDate={this.renderDate}
            weekNameArray={weekNameArray}
            viewableDecade={this.state.viewableDecade}
            changeDecade={this.changeDecade}
          />

          <div className={'rcal-footer'}>
            <button
              className={
                errorInputs
                  ? 'rcal-done-button rcal-done-button-disabled'
                  : 'rcal-done-button'
              }
              onClick={!errorInputs ? this.closeDropdownAfterSave : null}
            >
              {this.props.doneText}
            </button>
          </div>
        </div>
        {sideMenu && sideMenu.length > 0 && (
          <SideBar
            fromDate={this.state.fromDate}
            toDate={this.state.toDate}
            sideMenu={sideMenu}
            selectDate={this.selectSideMenuDate}
          />
        )}
      </div>
    );
  }
}

Calendar.defaultProps = {
  locale: 'en',
  disabled: () => false,
  onChangeDate: () => {},
  disabledFromPicker: false,
  disabledToPicker: false,
  doneText: 'Done',
  fromDatePrefix: 'From:',
  toDatePrefix: 'To:',
};

Calendar.propTypes = {
  locale: PropTypes.string,
  disabled: PropTypes.func,
  sideMenu: PropTypes.array,
  defaultToDate: PropTypes.instanceOf(Date),
  defaultFromDate: PropTypes.instanceOf(Date),
  onChangeDate: PropTypes.func,
  disabledFromPicker: PropTypes.bool,
  disabledToPicker: PropTypes.bool,
  fromDatePrefix: PropTypes.string,
  toDatePrefix: PropTypes.string,
  doneText: PropTypes.string,
};

export default Calendar;
