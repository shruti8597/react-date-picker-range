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
    let defaultDate = this.props.defaultDate;
    let initialSelectedDate = defaultDate || new Date();
    let viewableMonth = initialSelectedDate.getMonth();
    let viewableYear = initialSelectedDate.getFullYear();
    let inputDate = utils.formatDate(defaultDate);
    this.state = {
      inputDate: inputDate,
      selectedDate: defaultDate,
      viewableMonth: viewableMonth,
      viewableYear: viewableYear,
      viewableDecade: viewableYear,
      errorInput: false,
    };
  }

  selectDate = date => {
    if (this.props.disabledPicker) return;
    if (this.props.disabled(date)) return;
    this.setState({
      inputDate: utils.formatDate(date),
      selectedDate: date,
      viewableMonth: date.getMonth(),
      viewableYear: date.getFullYear(),
      viewableDecade: date.getFullYear(),
      errorInput: false,
    });
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

  onChangeInput = input => {
    this.setState({ inputDate: input });
    const valid = utils.checkValidDate(input);
    if (valid && !this.props.disabled(valid)) this.selectDate(valid);
    else this.setState({ errorInput: true });
  };

  closeDropdownAfterSave = () => {
    this.props.onChangeDate(this.state.selectedDate);
    this.props.closeDropdown();
  };

  renderDate = (date, monthType) => {
    let { viewableMonth, viewableYear, selectedDate } = this.state;
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
    const selectedMonthYear =
      selectedDate &&
      selectedDate.getMonth() == viewableMonth &&
      selectedDate.getFullYear() == viewableYear;
    const disabledDate =
      disabled(new Date(viewableYear, viewableMonth, date)) ||
      this.props.disabledPicker;
    const viewSelectedDate =
      selectedDate && selectedMonthYear && selectedDate.getDate() == date;
    let className = 'rcal-date-item';
    className += viewSelectedDate ? ' rcal-date-selected' : '';
    className += disabledDate ? ' rcal-date-disabled' : '';
    className += monthType ? ' rcal-date-out-scope' : '';
    className +=
      viewableYear == new Date().getFullYear() &&
      viewableMonth == new Date().getMonth() &&
      date == new Date().getDate()
        ? ' rcal-date-today'
        : '';
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

  handleInputClick = () => {
    let date = this.state.selectedDate;
    if (!date) return;
    this.setState({
      viewableMonth: date.getMonth(),
      viewableYear: date.getFullYear(),
      viewableDecade: date.getFullYear(),
    });
  };

  render() {
    const { sideMenu, locale } = this.props;
    moment.locale(locale);
    const monthLocale = moment.monthsShort();
    const monthNameArray = monthLocale.map((mon, index) => ({
      value: index,
      label: mon,
    }));
    const daysLocale = moment.weekdaysMin();
    const weekNameArray = daysLocale.slice(1).concat(daysLocale[0]);
    moment.locale('en');
    return (
      <div className="rcal-single-calendar">
        <div className="rcal-calendar-without-sidebar">
          <div className="rcal-date-input">
            <DateInput
              inputDate={this.state.inputDate}
              onChangeInput={this.onChangeInput}
              disabled={this.props.disabledPicker}
              error={this.state.errorInput}
              handleClick={this.handleInputClick}
              prefix={this.props.datePrefix}
              selected={!this.props.disabledPicker}
            />
          </div>
          <MainCalendar
            monthNameArray={monthNameArray}
            weekNameArray={weekNameArray}
            changeViewableDate={this.changeViewableDate}
            viewableMonth={this.state.viewableMonth}
            viewableYear={this.state.viewableYear}
            viewableDecade={this.state.viewableDecade}
            renderDate={this.renderDate}
            changeDecade={this.changeDecade}
          />
          <div className={'rcal-footer'}>
            <button
              className={
                this.state.errorInput
                  ? 'rcal-done-button rcal-done-button-disabled'
                  : 'rcal-done-button'
              }
              onClick={
                !this.state.errorInput ? this.closeDropdownAfterSave : null
              }
            >
              {this.props.doneText}
            </button>
          </div>
        </div>
        {sideMenu && sideMenu.length > 0 && (
          <SideBar
            sideMenu={sideMenu}
            fromDate={this.state.selectedDate}
            selectDate={this.selectDate}
          />
        )}
      </div>
    );
  }
}

Calendar.propTypes = {
  disabled: PropTypes.func,
  sideMenu: PropTypes.array,
  locale: PropTypes.string,
  onChangeDate: PropTypes.func,
  doneText: PropTypes.string,
  datePrefix: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date),
  disabledPicker: PropTypes.bool,
};

Calendar.defaultProps = {
  disabled: () => false,
  onChangeDate: () => {},
  locale: 'en',
  doneText: 'Done',
  datePrefix: 'Date: ',
  disabledPicker: false,
};

export default Calendar;
