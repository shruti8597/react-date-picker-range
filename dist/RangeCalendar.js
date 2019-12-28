"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MainCalendar = _interopRequireDefault(require("./MainCalendar"));

var _sidebar = _interopRequireDefault(require("./sidebar"));

var _DateInput = _interopRequireDefault(require("./DateInput"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _moment = _interopRequireDefault(require("moment"));

var utils = _interopRequireWildcard(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

    _defineProperty(_assertThisInitialized(_this), "selectFromDate", function (date, inputFocusNoChange) {
      if (_this.props.disabledFromPicker) return;
      if (_this.state.toDate && _this.state.toDate < date) return;
      if (_this.props.disabled(date)) return;
      var newState = {};
      newState.viewableMonth = date.getMonth();
      newState.viewableYear = date.getFullYear();
      newState.fromDate = date;
      newState.inputFromDate = utils.formatDate(date);
      newState.errorFromInput = false;

      if (!_this.props.disabledToPicker && !inputFocusNoChange) {
        if (_this.state.toDate) newState.viewableMonth = _this.state.toDate.getMonth();
        if (_this.state.toDate) newState.viewableYear = _this.state.toDate.getFullYear();
        newState.focusInputType = 1;
      }

      newState.viewableDecade = newState.viewableYear;

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "selectSideMenuDate", function (date, toDate) {
      var newState = {};

      if (!_this.props.disabledFromPicker) {
        newState.fromDate = date;
        newState.inputFromDate = utils.formatDate(date);
        newState.viewableMonth = date.getMonth();
        newState.viewableYear = date.getFullYear();
        newState.viewableDecade = date.getFullYear();
        newState.focusInputType = 0;
        newState.errorFromInput = false;
      }

      if (!_this.props.disabledToPicker) {
        newState.toDate = toDate;
        newState.inputToDate = utils.formatDate(toDate);
        newState.errorToInput = false;

        if (_this.props.disabledFromPicker) {
          newState.viewableMonth = toDate.getMonth();
          newState.viewableYear = toDate.getFullYear();
          newState.viewableDecade = toDate.getFullYear();
          newState.focusInputType = 1;
        }
      }

      var compareFrom = newState.fromDate || _this.state.fromDate;
      var compareTo = newState.toDate || _this.state.toDate;

      if (!compareFrom || !compareTo || compareFrom <= compareTo) {
        if (compareFrom && _this.props.disabled(compareFrom)) return;
        if (compareTo && _this.props.disabled(compareTo)) return;

        _this.setState(newState);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "selectToDate", function (date, inputFocusNoChange) {
      if (_this.props.disabledToPicker) return;
      if (_this.state.fromDate && _this.state.fromDate > date) return;
      if (_this.props.disabled(date)) return;
      var newState = {};
      newState.viewableMonth = date.getMonth();
      newState.viewableYear = date.getFullYear();
      newState.toDate = date;
      newState.inputToDate = utils.formatDate(date);
      newState.errorToInput = false;

      if (!_this.props.disabledFromPicker && !inputFocusNoChange) {
        if (_this.state.fromDate) newState.viewableMonth = _this.state.fromDate.getMonth();
        if (_this.state.fromDate) newState.viewableYear = _this.state.fromDate.getFullYear();
        newState.focusInputType = 0;
      }

      newState.viewableDecade = newState.viewableYear;

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "selectDate", function (date) {
      if (_this.state.focusInputType == 0) {
        if (!_this.state.toDate || date <= _this.state.toDate) _this.selectFromDate(date);
      } else if (_this.state.focusInputType == 1) if (!_this.state.fromDate || date >= _this.state.fromDate) _this.selectToDate(date);
    });

    _defineProperty(_assertThisInitialized(_this), "changeViewableDate", function (month, year) {
      _this.setState({
        viewableMonth: month,
        viewableYear: year,
        viewableDecade: year
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeDecade", function (decade) {
      _this.setState({
        viewableDecade: decade
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeFromInput", function (input) {
      _this.setState({
        inputFromDate: input
      });

      var valid = utils.checkValidDate(input);
      var validDate = valid && !(_this.state.toDate && _this.state.toDate < valid);
      if (validDate && !_this.props.disabled(valid)) _this.selectFromDate(valid, true);else _this.setState({
        errorFromInput: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeToInput", function (input) {
      _this.setState({
        inputToDate: input
      });

      var valid = utils.checkValidDate(input);
      var validDate = valid && !(_this.state.fromDate && _this.state.fromDate > valid);
      if (validDate && !_this.props.disabled(valid)) _this.selectToDate(valid, true);else _this.setState({
        errorToInput: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderDate", function (date, monthType) {
      var _this$state = _this.state,
          viewableMonth = _this$state.viewableMonth,
          viewableYear = _this$state.viewableYear,
          fromDate = _this$state.fromDate,
          toDate = _this$state.toDate;
      var disabled = _this.props.disabled;

      if (monthType == 'prev-month') {
        var prevDate = new Date(viewableYear, viewableMonth - 1, date);
        viewableMonth = prevDate.getMonth();
        viewableYear = prevDate.getFullYear();
      }

      if (monthType == 'next-month') {
        var nextMonthDate = new Date(viewableYear, viewableMonth + 1, date);
        viewableMonth = nextMonthDate.getMonth();
        viewableYear = nextMonthDate.getFullYear();
      }

      var disabledDate = disabled(new Date(viewableYear, viewableMonth, date));

      if (_this.state.focusInputType == 0) {
        disabledDate = disabledDate || _this.props.disabledFromPicker;
        disabledDate = disabledDate || _this.state.toDate && new Date(viewableYear, viewableMonth, date) > _this.state.toDate;
      } else if (_this.state.focusInputType == 1) {
        disabledDate = disabledDate || _this.props.disabledToPicker;
        disabledDate = disabledDate || _this.state.fromDate && new Date(viewableYear, viewableMonth, date) < _this.state.fromDate;
      } else disabledDate = true;

      var toMonth = toDate && toDate.getMonth();
      var toOfDate = toDate && toDate.getDate();
      var toYear = toDate && toDate.getFullYear();
      var fromMonth = fromDate && fromDate.getMonth();
      var fromOfDate = fromDate && fromDate.getDate();
      var fromYear = fromDate && fromDate.getFullYear();
      var greaterFrom = fromDate && new Date(fromYear, fromMonth, fromOfDate) <= new Date(viewableYear, viewableMonth, date);
      var lessTo = toDate && new Date(toYear, toMonth, toOfDate) >= new Date(viewableYear, viewableMonth, date);
      var to = toMonth == viewableMonth && toYear == viewableYear && toOfDate == date;
      var from = fromMonth == viewableMonth && fromYear == viewableYear && fromOfDate == date;
      var today = new Date().getDate() == date && new Date().getMonth() == viewableMonth && new Date().getFullYear() == viewableYear;
      var className = 'rcal-date-item';
      className += greaterFrom && lessTo ? ' rcal-range-selected' : '';
      className += disabledDate ? ' rcal-date-disabled' : '';
      className += today ? ' rcal-date-today' : '';
      className += to ? ' rcal-date-range-end' : '';
      className += from ? ' rcal-date-range-start' : '';
      className += monthType ? ' rcal-date-out-scope' : '';
      return _react["default"].createElement("div", {
        key: date + '/' + viewableMonth,
        onClick: disabledDate ? null : function () {
          return _this.selectDate(new Date(viewableYear, viewableMonth, date));
        },
        className: className
      }, date);
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdownAfterSave", function () {
      _this.props.onChangeDate(_this.state.fromDate, _this.state.toDate);

      _this.props.closeDropdown();
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputFromClick", function () {
      if (_this.props.disabledFromPicker) return;
      var newState = {
        focusInputType: 0
      };
      var date = _this.state.fromDate;

      if (date) {
        newState.viewableMonth = date.getMonth();
        newState.viewableYear = date.getFullYear();
        newState.viewableDecade = date.getFullYear();
      }

      _this.setState(newState);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputToClick", function () {
      if (_this.props.disabledToPicker) return;
      var newState = {
        focusInputType: 1
      };
      var date = _this.state.toDate;

      if (date) {
        newState.viewableMonth = date.getMonth();
        newState.viewableYear = date.getFullYear();
        newState.viewableDecade = date.getFullYear();
      }

      _this.setState(newState);
    });

    var _today = new Date();

    var dateSelectFrom = _this.props.defaultFromDate || _this.props.defaultToDate || _today;

    var _viewableMonth = dateSelectFrom.getMonth();

    var _viewableYear = dateSelectFrom.getFullYear();

    var focusInputType = _this.props.disabledFromPicker ? _this.props.disabledToPicker ? -1 : 1 : 0;
    _this.state = {
      inputFromDate: utils.formatDate(_this.props.defaultFromDate),
      inputToDate: utils.formatDate(_this.props.defaultToDate),
      fromDate: _this.props.defaultFromDate,
      toDate: _this.props.defaultToDate,
      viewableMonth: _viewableMonth,
      viewableYear: _viewableYear,
      viewableDecade: _viewableYear,
      focusInputType: focusInputType,
      errorToInput: false,
      errorFromInput: false
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          locale = _this$props.locale,
          sideMenu = _this$props.sideMenu,
          disabledFromPicker = _this$props.disabledFromPicker,
          disabledToPicker = _this$props.disabledToPicker;

      _moment["default"].locale(locale);

      var monthLocale = _moment["default"].monthsShort();

      var monthNameArray = monthLocale.map(function (mon, index) {
        return {
          value: index,
          label: mon
        };
      });

      var daysLocale = _moment["default"].weekdaysMin();

      var weekNameArray = daysLocale.slice(1).concat(daysLocale[0]);

      _moment["default"].locale('en');

      var errorInputs = this.state.errorFromInput || this.state.errorToInput;
      return _react["default"].createElement("div", {
        className: "rcal-range-calendar"
      }, _react["default"].createElement("div", {
        className: "rcal-calendar-without-sidebar"
      }, _react["default"].createElement("div", {
        className: "rcal-date-input"
      }, _react["default"].createElement(_DateInput["default"], {
        inputDate: this.state.inputFromDate,
        disabled: disabledFromPicker,
        onChangeInput: this.onChangeFromInput,
        prefix: this.props.fromDatePrefix,
        error: this.state.errorFromInput,
        selected: this.state.focusInputType == 0,
        handleClick: this.handleInputFromClick
      }), _react["default"].createElement(_DateInput["default"], {
        inputDate: this.state.inputToDate,
        disabled: disabledToPicker,
        onChangeInput: this.onChangeToInput,
        prefix: this.props.toDatePrefix,
        error: this.state.errorToInput,
        selected: this.state.focusInputType == 1,
        handleClick: this.handleInputToClick
      })), _react["default"].createElement(_MainCalendar["default"], {
        monthNameArray: monthNameArray,
        changeViewableDate: this.changeViewableDate,
        viewableMonth: this.state.viewableMonth,
        viewableYear: this.state.viewableYear,
        renderDate: this.renderDate,
        weekNameArray: weekNameArray,
        viewableDecade: this.state.viewableDecade,
        changeDecade: this.changeDecade
      }), _react["default"].createElement("div", {
        className: 'rcal-footer'
      }, _react["default"].createElement("button", {
        className: errorInputs ? 'rcal-done-button rcal-done-button-disabled' : 'rcal-done-button',
        onClick: !errorInputs ? this.closeDropdownAfterSave : null
      }, this.props.doneText))), sideMenu && sideMenu.length > 0 && _react["default"].createElement(_sidebar["default"], {
        fromDate: this.state.fromDate,
        toDate: this.state.toDate,
        sideMenu: sideMenu,
        selectDate: this.selectSideMenuDate
      }));
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.defaultProps = {
  locale: 'en',
  disabled: function disabled() {
    return false;
  },
  onChangeDate: function onChangeDate() {},
  disabledFromPicker: false,
  disabledToPicker: false,
  doneText: 'Done',
  fromDatePrefix: 'From:',
  toDatePrefix: 'To:'
};
Calendar.propTypes = {
  locale: _propTypes["default"].string,
  disabled: _propTypes["default"].func,
  sideMenu: _propTypes["default"].array,
  defaultToDate: _propTypes["default"].instanceOf(Date),
  defaultFromDate: _propTypes["default"].instanceOf(Date),
  onChangeDate: _propTypes["default"].func,
  disabledFromPicker: _propTypes["default"].bool,
  disabledToPicker: _propTypes["default"].bool,
  fromDatePrefix: _propTypes["default"].string,
  toDatePrefix: _propTypes["default"].string,
  doneText: _propTypes["default"].string
};
var _default = Calendar;
exports["default"] = _default;