"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _MainCalendar = _interopRequireDefault(require("./MainCalendar"));

var _sideBar = _interopRequireDefault(require("./sideBar"));

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

    _defineProperty(_assertThisInitialized(_this), "selectDate", function (date) {
      if (_this.props.disabledPicker) return;
      if (_this.props.disabled(date)) return;

      _this.setState({
        inputDate: utils.formatDate(date),
        selectedDate: date,
        viewableMonth: date.getMonth(),
        viewableYear: date.getFullYear(),
        viewableDecade: date.getFullYear(),
        errorInput: false
      });
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

    _defineProperty(_assertThisInitialized(_this), "onChangeInput", function (input) {
      _this.setState({
        inputDate: input
      });

      var valid = utils.checkValidDate(input);
      if (valid && !_this.props.disabled(valid)) _this.selectDate(valid);else _this.setState({
        errorInput: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeDropdownAfterSave", function () {
      _this.props.onChangeDate(_this.state.selectedDate);

      _this.props.closeDropdown();
    });

    _defineProperty(_assertThisInitialized(_this), "renderDate", function (date, monthType) {
      var _this$state = _this.state,
          viewableMonth = _this$state.viewableMonth,
          viewableYear = _this$state.viewableYear,
          selectedDate = _this$state.selectedDate;
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

      var selectedMonthYear = selectedDate && selectedDate.getMonth() == viewableMonth && selectedDate.getFullYear() == viewableYear;

      var disabledDate = disabled(new Date(viewableYear, viewableMonth, date)) || _this.props.disabledPicker;

      var viewSelectedDate = selectedDate && selectedMonthYear && selectedDate.getDate() == date;
      var className = 'rcal-date-item';
      className += viewSelectedDate ? ' rcal-date-selected' : '';
      className += disabledDate ? ' rcal-date-disabled' : '';
      className += monthType ? ' rcal-date-out-scope' : '';
      className += viewableYear == new Date().getFullYear() && viewableMonth == new Date().getMonth() && date == new Date().getDate() ? ' rcal-date-today' : '';
      return _react["default"].createElement("div", {
        key: date + '/' + viewableMonth,
        onClick: disabledDate ? null : function () {
          return _this.selectDate(new Date(viewableYear, viewableMonth, date));
        },
        className: className
      }, date);
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputClick", function () {
      var date = _this.state.selectedDate;
      if (!date) return;

      _this.setState({
        viewableMonth: date.getMonth(),
        viewableYear: date.getFullYear(),
        viewableDecade: date.getFullYear()
      });
    });

    var defaultDate = _this.props.defaultDate;
    var initialSelectedDate = defaultDate || new Date();

    var _viewableMonth = initialSelectedDate.getMonth();

    var _viewableYear = initialSelectedDate.getFullYear();

    var inputDate = utils.formatDate(defaultDate);
    _this.state = {
      inputDate: inputDate,
      selectedDate: defaultDate,
      viewableMonth: _viewableMonth,
      viewableYear: _viewableYear,
      viewableDecade: _viewableYear,
      errorInput: false
    };
    return _this;
  }

  _createClass(Calendar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          sideMenu = _this$props.sideMenu,
          locale = _this$props.locale;

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

      return _react["default"].createElement("div", {
        className: "rcal-single-calendar"
      }, _react["default"].createElement("div", {
        className: "rcal-calendar-without-sidebar"
      }, _react["default"].createElement("div", {
        className: "rcal-date-input"
      }, _react["default"].createElement(_DateInput["default"], {
        inputDate: this.state.inputDate,
        onChangeInput: this.onChangeInput,
        disabled: this.props.disabledPicker,
        error: this.state.errorInput,
        handleClick: this.handleInputClick,
        prefix: this.props.datePrefix,
        selected: !this.props.disabledPicker
      })), _react["default"].createElement(_MainCalendar["default"], {
        monthNameArray: monthNameArray,
        weekNameArray: weekNameArray,
        changeViewableDate: this.changeViewableDate,
        viewableMonth: this.state.viewableMonth,
        viewableYear: this.state.viewableYear,
        viewableDecade: this.state.viewableDecade,
        renderDate: this.renderDate,
        changeDecade: this.changeDecade
      }), _react["default"].createElement("div", {
        className: 'rcal-footer'
      }, _react["default"].createElement("button", {
        className: this.state.errorInput ? 'rcal-done-button rcal-done-button-disabled' : 'rcal-done-button',
        onClick: !this.state.errorInput ? this.closeDropdownAfterSave : null
      }, this.props.doneText))), sideMenu && sideMenu.length > 0 && _react["default"].createElement(_sideBar["default"], {
        sideMenu: sideMenu,
        fromDate: this.state.selectedDate,
        selectDate: this.selectDate
      }));
    }
  }]);

  return Calendar;
}(_react.Component);

Calendar.propTypes = {
  disabled: _propTypes["default"].func,
  sideMenu: _propTypes["default"].array,
  locale: _propTypes["default"].string,
  onChangeDate: _propTypes["default"].func,
  doneText: _propTypes["default"].string,
  datePrefix: _propTypes["default"].string,
  defaultDate: _propTypes["default"].instanceOf(Date),
  disabledPicker: _propTypes["default"].bool
};
Calendar.defaultProps = {
  disabled: function disabled() {
    return false;
  },
  onChangeDate: function onChangeDate() {},
  locale: 'en',
  doneText: 'Done',
  datePrefix: 'Date: ',
  disabledPicker: false
};
var _default = Calendar;
exports["default"] = _default;