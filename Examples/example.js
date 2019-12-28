import React, { Component } from 'react';
import SingleCalendar from '../src/index';
import { RangeCalendar } from '../src/index';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    const sideMenu = [
      {
        label: '1 Month',
        from: new Date(new Date().setMonth(new Date().getMonth() - 2)),
        to: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      },
      {
        label: '3 Month',
        from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
        to: new Date(),
      },
      {
        label: '6 Month',
        from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
        to: new Date(),
      },
      {
        label: '1 Year',
        from: new Date(new Date().setFullYear(new Date().getFullYear() - 1)),
        to: new Date(),
      },
      {
        label: '5 Years',
        from: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
        to: new Date(),
      },
      {
        label: '10 Years',
        from: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
        to: new Date(),
      },
    ];

    const disabled = date => {
      //disable Dates greater than today
      if (date > new Date()) return true;
    };

    return (
      <div>
        <h1>My React Calendar!!</h1>

        <SingleCalendar
          locale={'de'}
          disabled={disabled}
          sideMenu={sideMenu}
          onChangeDate={date => alert(date)}
          defaultDate={new Date()}
          value={'21/12/2015 - 21/12/2016'}
          label={'Calendar'}
        />
        <br></br>

        <SingleCalendar defaultDate={new Date()} disabledPicker={true} />

        <br></br>

        <RangeCalendar
          disabled={disabled}
          sideMenu={sideMenu}
          onChangeDate={(fromDate, toDate) => alert(date)}
          defaultFromDate={new Date(2019, 7, 12)}
          defaultToDate={new Date()}
          disabledFromPicker={true}
        />

        <br></br>

        <RangeCalendar
          locale="en"
          sideMenu={sideMenu}
          disabledToPicker={true}
        />

        <br></br>

        <RangeCalendar
          locale="en"
          sideMenu={sideMenu}
          disabledToPicker={true}
          disabledFromPicker={true}
        />

        <br></br>

        <RangeCalendar locale="de" sideMenu={sideMenu} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
