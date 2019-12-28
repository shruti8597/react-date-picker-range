import React, { Component } from 'react';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = { showCalendarType: 0 };
  }

  gotoPreviousMonth = () => {
    let viewableMonth = this.props.viewableMonth - 1;
    let date = new Date(this.props.viewableYear, viewableMonth);
    this.props.changeViewableDate(date.getMonth(), date.getFullYear());
  };

  gotoNextMonth = () => {
    let viewableMonth = this.props.viewableMonth + 1;
    let date = new Date(this.props.viewableYear, viewableMonth);
    this.props.changeViewableDate(date.getMonth(), date.getFullYear());
  };

  gotoMonthFromMonthCalendar = month => {
    this.props.changeViewableDate(month, this.props.viewableYear);
    this.setState({ showCalendarType: 0 });
  };

  gotoYear = year => {
    this.props.changeViewableDate(this.props.viewableMonth, year);
  };

  getDatesInWeekArray() {
    let weekDay = new Date(
      this.props.viewableYear,
      this.props.viewableMonth,
    ).getDay();
    weekDay = weekDay == 0 ? 6 : weekDay - 1;

    let lastMonthDays =
      32 -
      new Date(
        this.props.viewableYear,
        this.props.viewableMonth - 1,
        32,
      ).getDate();
    const noDaysCurrentMonth =
      32 -
      new Date(this.props.viewableYear, this.props.viewableMonth, 32).getDate();
    let nextMonthDate = 1;
    let weekArray = [];
    let dateNo = 1;
    let weekDateRow = [];
    //render Previous Month
    for (let i = 0; i < weekDay; i++)
      weekDateRow.push(lastMonthDays - weekDay + 1 + i);
    let noDatesInWeek = weekDay;

    while (dateNo <= noDaysCurrentMonth) {
      if (noDatesInWeek == 7) {
        weekArray.push(weekDateRow);
        weekDateRow = [];
        noDatesInWeek = 0;
      }
      weekDateRow.push(dateNo);
      dateNo++;
      noDatesInWeek++;
    }
    //next Month
    if (noDatesInWeek < 7)
      for (let j = noDatesInWeek; j < 7; j++) weekDateRow.push(nextMonthDate++);
    weekArray.push(weekDateRow);
    if (weekArray.length < 6) {
      weekDateRow = [];
      for (let j = 0; j < 7; j++) weekDateRow.push(nextMonthDate++);
      weekArray.push(weekDateRow);
    }
    return weekArray;
  }

  getMonthName() {
    const { monthNameArray, viewableMonth } = this.props;
    let month = monthNameArray.find(data => data.value == viewableMonth);
    return month.label;
  }

  renderMonthsCalendar() {
    const { monthNameArray, viewableMonth } = this.props;
    const renderMonth = row => (
      <div
        key={row.value}
        className={
          row.value == viewableMonth
            ? 'rcal-calendar-month-item rcal-calendar-month-selected'
            : 'rcal-calendar-month-item'
        }
        onClick={() => this.gotoMonthFromMonthCalendar(row.value)}
        role="button"
      >
        <div className="rcal-calendar-month-color-item">{row.label}</div>
      </div>
    );
    return (
      <>
        <CalendarHeader
          nextClick={() => this.gotoYear(this.props.viewableYear + 1)}
          prevClick={() => this.gotoYear(this.props.viewableYear - 1)}
        >
          <button
            className="rcal-header-label-item"
            onClick={() => this.setState({ showCalendarType: 2 })}
          >
            {this.props.viewableYear}
          </button>
        </CalendarHeader>

        <div className="rcal-calendar-month">
          <div className="rcal-calendar-month-row">
            {monthNameArray.slice(0, 3).map(row => renderMonth(row))}
          </div>
          <div className="rcal-calendar-month-row">
            {monthNameArray.slice(3, 6).map(row => renderMonth(row))}
          </div>
          <div className="rcal-calendar-month-row">
            {monthNameArray.slice(6, 9).map(row => renderMonth(row))}
          </div>
          <div className="rcal-calendar-month-row">
            {monthNameArray.slice(9).map(row => renderMonth(row))}
          </div>
        </div>
      </>
    );
  }

  renderDecadesCalendar(decadeStart) {
    const { viewableYear, changeDecade } = this.props;
    const decade = decadeStart - (decadeStart % 10);
    let decadeArray = [];
    for (let i = -1; i <= 10; i++) {
      decadeArray.push(decade + i);
    }
    const renderDecadeItem = row => {
      let className = 'rcal-calendar-decade-item';
      className += row == viewableYear ? ' rcal-calendar-decade-selected' : '';
      className +=
        row == decade - 1 || row == decade + 10
          ? ' rcal-calendar-deacde-out-scope'
          : '';
      return (
        <div
          key={row}
          className={className}
          onClick={() => {
            this.gotoYear(row);
            this.setState({ showCalendarType: 1 });
          }}
        >
          <div className="rcal-calendar-decade-color-item">{row}</div>
        </div>
      );
    };
    return (
      <>
        <CalendarHeader
          nextClick={() => changeDecade(decade + 10)}
          prevClick={() => changeDecade(decade - 10)}
        >
          <div className="rcal-header-decade-label-item">
            {decade} - {decade + 10}
          </div>
        </CalendarHeader>

        <div className="rcal-calendar-decade">
          <tr className="rcal-calendar-decade-row">
            {decadeArray.slice(0, 3).map(row => renderDecadeItem(row))}
          </tr>
          <tr className="rcal-calendar-decade-row">
            {decadeArray.slice(3, 6).map(row => renderDecadeItem(row))}
          </tr>
          <tr className="rcal-calendar-decade-row">
            {decadeArray.slice(6, 9).map(row => renderDecadeItem(row))}
          </tr>
          <tr className="rcal-calendar-decade-row">
            {decadeArray.slice(9, 12).map(row => renderDecadeItem(row))}
          </tr>
        </div>
      </>
    );
  }

  renderDatesCalendar() {
    const { weekNameArray } = this.props;
    return (
      <>
        <CalendarHeader
          nextClick={this.gotoNextMonth}
          prevClick={this.gotoPreviousMonth}
        >
          <button
            className="rcal-header-label-item"
            onClick={() => this.setState({ showCalendarType: 1 })}
          >
            {this.getMonthName()}
          </button>
          <button
            className="rcal-header-label-item"
            onClick={() => this.setState({ showCalendarType: 2 })}
          >
            {this.props.viewableYear}
          </button>
        </CalendarHeader>

        <div className="rcal-calendar-days">
          <div className="rcal-week-header">
            {weekNameArray.map((data, index) => (
              <div className="rcal-week-item" key={index}>
                {data}
              </div>
            ))}
          </div>
          {this.renderDates()}
        </div>
      </>
    );
  }

  renderDates() {
    const { renderDate } = this.props;
    const datesArray = this.getDatesInWeekArray();
    return datesArray.map((tr, index) => (
      <div className="rcal-calendar-days-row" key={index}>
        {tr.map(td => {
          if (index > 3 && td <= 16) return renderDate(td, 'next-month');
          if (index == 0 && td > 8) return renderDate(td, 'prev-month');
          return renderDate(td);
        })}
      </div>
    ));
  }

  render() {
    return (
      <div className="rcal-calendar">
        {this.state.showCalendarType == 0 && this.renderDatesCalendar()}
        {this.state.showCalendarType == 1 && this.renderMonthsCalendar()}
        {this.state.showCalendarType == 2 &&
          this.renderDecadesCalendar(this.props.viewableDecade)}
      </div>
    );
  }
}

const CalendarHeader = props => {
  return (
    <div className="rcal-calendar-header">
      <button className="rcal-calendar-header-prev" onClick={props.prevClick}>
        &lt;
      </button>
      <div className="rcal-calendar-header-label">{props.children}</div>
      <button className="rcal-calendar-header-next" onClick={props.nextClick}>
        &gt;
      </button>
    </div>
  );
};

export default Calendar;
