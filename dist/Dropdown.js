"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _SingleCalendar = _interopRequireDefault(require("./SingleCalendar"));

var _RangeCalendar = _interopRequireDefault(require("./RangeCalendar"));

var _calendar = _interopRequireDefault(require("./calendar.png"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Dropdown =
/*#__PURE__*/
function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this, props));
    _this.state = {
      openDropdown: false
    };
    _this.closeDropdown = _this.closeDropdown.bind(_assertThisInitialized(_this));
    _this.toggleDropdown = _this.toggleDropdown.bind(_assertThisInitialized(_this));
    _this.handleOutsideClick = _this.handleOutsideClick.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Dropdown, [{
    key: "closeDropdown",
    value: function closeDropdown() {
      this.handleClick();
      this.setState({
        openDropdown: false
      });
    }
  }, {
    key: "handleOutsideClick",
    value: function handleOutsideClick(e) {
      if (this.node && this.node.contains(e.target)) return;
      this.closeDropdown();
    }
  }, {
    key: "handleClick",
    value: function handleClick() {
      if (!this.state.openDropdown) {
        document.addEventListener('mousedown', this.handleOutsideClick, false);
      } else document.removeEventListener('mousedown', this.handleOutsideClick, false);
    }
  }, {
    key: "toggleDropdown",
    value: function toggleDropdown() {
      this.handleClick();
      this.setState({
        openDropdown: !this.state.openDropdown
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var openDropdown = this.state.openDropdown;
      var className = 'rcal-date-picker';
      className += this.props.sideMenu && this.props.sideMenu.length > 0 ? ' rcal-side-menu' : '';
      className += openDropdown ? ' rcal-picker-open' : '';
      return _react["default"].createElement("div", {
        className: className,
        ref: function ref(node) {
          return _this2.node = node;
        }
      }, _react["default"].createElement("div", {
        className: "rcal-picker-header",
        onClick: this.toggleDropdown
      }, _react["default"].createElement("div", {
        className: "rcal-header-content"
      }, _react["default"].createElement("div", {
        className: "rcal-date-header"
      }, this.props.label), _react["default"].createElement("div", {
        className: "rcal-date-value"
      }, this.props.value)), _react["default"].createElement("div", {
        className: "rcal-date-icon"
      }, _react["default"].createElement("img", {
        src: _calendar["default"]
      }))), openDropdown && _react["default"].createElement("div", {
        className: "rcal-picker-body"
      }, this.props.calendarType == 'single' && _react["default"].createElement(_SingleCalendar["default"], _extends({
        closeDropdown: this.closeDropdown
      }, this.props)), this.props.calendarType == 'range' && _react["default"].createElement(_RangeCalendar["default"], _extends({
        closeDropdown: this.closeDropdown
      }, this.props))));
    }
  }]);

  return Dropdown;
}(_react.Component);

exports["default"] = Dropdown;