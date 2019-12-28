"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar(props) {
    var _this;

    _classCallCheck(this, Calendar);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Calendar).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "gotoPreviousMonth", function () {
      var viewableMonth = _this.props.viewableMonth - 1;
      var date = new Date(_this.props.viewableYear, viewableMonth);

      _this.props.changeViewableDate(date.getMonth(), date.getFullYear());
    });

    _defineProperty(_assertThisInitialized(_this), "gotoNextMonth", function () {
      var viewableMonth = _this.props.viewableMonth + 1;
      var date = new Date(_this.props.viewableYear, viewableMonth);

      _this.props.changeViewableDate(date.getMonth(), date.getFullYear());
    });

    _defineProperty(_assertThisInitialized(_this), "gotoMonthFromMonthCalendar", function (month) {
      _this.props.changeViewableDate(month, _this.props.viewableYear);

      _this.setState({
        showCalendarType: 0
      });
    });

    _defineProperty(_assertThisInitialized(_this), "gotoYear", function (year) {
      _this.props.changeViewableDate(_this.props.viewableMonth, year);
    });

    _this.state = {
      showCalendarType: 0
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "getDatesInWeekArray",
    value: function getDatesInWeekArray() {
      var weekDay = new Date(this.props.viewableYear, this.props.viewableMonth).getDay();
      weekDay = weekDay == 0 ? 6 : weekDay - 1;
      var lastMonthDays = 32 - new Date(this.props.viewableYear, this.props.viewableMonth - 1, 32).getDate();
      var noDaysCurrentMonth = 32 - new Date(this.props.viewableYear, this.props.viewableMonth, 32).getDate();
      var nextMonthDate = 1;
      var weekArray = [];
      var dateNo = 1;
      var weekDateRow = []; //render Previous Month

      for (var i = 0; i < weekDay; i++) {
        weekDateRow.push(lastMonthDays - weekDay + 1 + i);
      }

      var noDatesInWeek = weekDay;

      while (dateNo <= noDaysCurrentMonth) {
        if (noDatesInWeek == 7) {
          weekArray.push(weekDateRow);
          weekDateRow = [];
          noDatesInWeek = 0;
        }

        weekDateRow.push(dateNo);
        dateNo++;
        noDatesInWeek++;
      } //next Month


      if (noDatesInWeek < 7) for (var j = noDatesInWeek; j < 7; j++) {
        weekDateRow.push(nextMonthDate++);
      }
      weekArray.push(weekDateRow);

      if (weekArray.length < 6) {
        weekDateRow = [];

        for (var _j = 0; _j < 7; _j++) {
          weekDateRow.push(nextMonthDate++);
        }

        weekArray.push(weekDateRow);
      }

      return weekArray;
    }
  }, {
    key: "getMonthName",
    value: function getMonthName() {
      var _this$props = this.props,
          monthNameArray = _this$props.monthNameArray,
          viewableMonth = _this$props.viewableMonth;
      var month = monthNameArray.find(function (data) {
        return data.value == viewableMonth;
      });
      return month.label;
    }
  }, {
    key: "renderMonthsCalendar",
    value: function renderMonthsCalendar() {
      var _this2 = this;

      var _this$props2 = this.props,
          monthNameArray = _this$props2.monthNameArray,
          viewableMonth = _this$props2.viewableMonth;

      var renderMonth = function renderMonth(row) {
        return _react["default"].createElement("div", {
          key: row.value,
          className: row.value == viewableMonth ? 'rcal-calendar-month-item rcal-calendar-month-selected' : 'rcal-calendar-month-item',
          onClick: function onClick() {
            return _this2.gotoMonthFromMonthCalendar(row.value);
          },
          role: "button"
        }, _react["default"].createElement("div", {
          className: "rcal-calendar-month-color-item"
        }, row.label));
      };

      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(CalendarHeader, {
        nextClick: function nextClick() {
          return _this2.gotoYear(_this2.props.viewableYear + 1);
        },
        prevClick: function prevClick() {
          return _this2.gotoYear(_this2.props.viewableYear - 1);
        }
      }, _react["default"].createElement("button", {
        className: "rcal-header-label-item",
        onClick: function onClick() {
          return _this2.setState({
            showCalendarType: 2
          });
        }
      }, this.props.viewableYear)), _react["default"].createElement("div", {
        className: "rcal-calendar-month"
      }, _react["default"].createElement("div", {
        className: "rcal-calendar-month-row"
      }, monthNameArray.slice(0, 3).map(function (row) {
        return renderMonth(row);
      })), _react["default"].createElement("div", {
        className: "rcal-calendar-month-row"
      }, monthNameArray.slice(3, 6).map(function (row) {
        return renderMonth(row);
      })), _react["default"].createElement("div", {
        className: "rcal-calendar-month-row"
      }, monthNameArray.slice(6, 9).map(function (row) {
        return renderMonth(row);
      })), _react["default"].createElement("div", {
        className: "rcal-calendar-month-row"
      }, monthNameArray.slice(9).map(function (row) {
        return renderMonth(row);
      }))));
    }
  }, {
    key: "renderDecadesCalendar",
    value: function renderDecadesCalendar(decadeStart) {
      var _this3 = this;

      var _this$props3 = this.props,
          viewableYear = _this$props3.viewableYear,
          changeDecade = _this$props3.changeDecade;
      var decade = decadeStart - decadeStart % 10;
      var decadeArray = [];

      for (var i = -1; i <= 10; i++) {
        decadeArray.push(decade + i);
      }

      var renderDecadeItem = function renderDecadeItem(row) {
        var className = 'rcal-calendar-decade-item';
        className += row == viewableYear ? ' rcal-calendar-decade-selected' : '';
        className += row == decade - 1 || row == decade + 10 ? ' rcal-calendar-deacde-out-scope' : '';
        return _react["default"].createElement("div", {
          key: row,
          className: className,
          onClick: function onClick() {
            _this3.gotoYear(row);

            _this3.setState({
              showCalendarType: 1
            });
          }
        }, _react["default"].createElement("div", {
          className: "rcal-calendar-decade-color-item"
        }, row));
      };

      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(CalendarHeader, {
        nextClick: function nextClick() {
          return changeDecade(decade + 10);
        },
        prevClick: function prevClick() {
          return changeDecade(decade - 10);
        }
      }, _react["default"].createElement("div", {
        className: "rcal-header-decade-label-item"
      }, decade, " - ", decade + 10)), _react["default"].createElement("div", {
        className: "rcal-calendar-decade"
      }, _react["default"].createElement("tr", {
        className: "rcal-calendar-decade-row"
      }, decadeArray.slice(0, 3).map(function (row) {
        return renderDecadeItem(row);
      })), _react["default"].createElement("tr", {
        className: "rcal-calendar-decade-row"
      }, decadeArray.slice(3, 6).map(function (row) {
        return renderDecadeItem(row);
      })), _react["default"].createElement("tr", {
        className: "rcal-calendar-decade-row"
      }, decadeArray.slice(6, 9).map(function (row) {
        return renderDecadeItem(row);
      })), _react["default"].createElement("tr", {
        className: "rcal-calendar-decade-row"
      }, decadeArray.slice(9, 12).map(function (row) {
        return renderDecadeItem(row);
      }))));
    }
  }, {
    key: "renderDatesCalendar",
    value: function renderDatesCalendar() {
      var _this4 = this;

      var weekNameArray = this.props.weekNameArray;
      return _react["default"].createElement(_react["default"].Fragment, null, _react["default"].createElement(CalendarHeader, {
        nextClick: this.gotoNextMonth,
        prevClick: this.gotoPreviousMonth
      }, _react["default"].createElement("button", {
        className: "rcal-header-label-item",
        onClick: function onClick() {
          return _this4.setState({
            showCalendarType: 1
          });
        }
      }, this.getMonthName()), _react["default"].createElement("button", {
        className: "rcal-header-label-item",
        onClick: function onClick() {
          return _this4.setState({
            showCalendarType: 2
          });
        }
      }, this.props.viewableYear)), _react["default"].createElement("div", {
        className: "rcal-calendar-days"
      }, _react["default"].createElement("div", {
        className: "rcal-week-header"
      }, weekNameArray.map(function (data, index) {
        return _react["default"].createElement("div", {
          className: "rcal-week-item",
          key: index
        }, data);
      })), this.renderDates()));
    }
  }, {
    key: "renderDates",
    value: function renderDates() {
      var renderDate = this.props.renderDate;
      var datesArray = this.getDatesInWeekArray();
      return datesArray.map(function (tr, index) {
        return _react["default"].createElement("div", {
          className: "rcal-calendar-days-row",
          key: index
        }, tr.map(function (td) {
          if (index > 3 && td <= 16) return renderDate(td, 'next-month');
          if (index == 0 && td > 8) return renderDate(td, 'prev-month');
          return renderDate(td);
        }));
      });
    }
  }, {
    key: "render",
    value: function render() {
      return _react["default"].createElement("div", {
        className: "rcal-calendar"
      }, this.state.showCalendarType == 0 && this.renderDatesCalendar(), this.state.showCalendarType == 1 && this.renderMonthsCalendar(), this.state.showCalendarType == 2 && this.renderDecadesCalendar(this.props.viewableDecade));
    }
  }]);

  return Calendar;
}(_react.Component);

var CalendarHeader = function CalendarHeader(props) {
  return _react["default"].createElement("div", {
    className: "rcal-calendar-header"
  }, _react["default"].createElement("button", {
    className: "rcal-calendar-header-prev",
    onClick: props.prevClick
  }, "<"), _react["default"].createElement("div", {
    className: "rcal-calendar-header-label"
  }, props.children), _react["default"].createElement("button", {
    className: "rcal-calendar-header-next",
    onClick: props.nextClick
  }, ">"));
};

var _default = Calendar;
exports["default"] = _default;