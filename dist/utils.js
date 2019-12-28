"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.checkValidDate = checkValidDate;
exports.compareDate = compareDate;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function formatDate(date) {
  if (date) {
    var day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    var month = date.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    return day + '.' + month + '.' + date.getFullYear();
  }

  return '';
}

function checkValidDate(input) {
  var dateArray = input.split(/['\-','\/','.']/);
  if (!/^\d\d['\-','\/','.']\d\d['\-','\/','.']\d\d\d\d$/.test(input)) return false;
  if (dateArray.length != 3) return false;

  var _dateArray = _slicedToArray(dateArray, 3),
      date = _dateArray[0],
      month = _dateArray[1],
      year = _dateArray[2];

  if (date > 31 || date < 1) return false;
  if (month > 12 || month < 1) return false;
  month = month - 1;
  if (year < 1000 || year > 9999) return false;
  var validDate = new Date(year, month, date);
  var validFlag = validDate.getDate() == date && validDate.getMonth() == month && validDate.getFullYear() == year;
  if (validFlag) return validDate;
  return false;
}

function compareDate(date1, date2) {
  return date1.getDate() == date2.getDate() && date1.getMonth() == date2.getMonth() && date1.getFullYear() == date2.getFullYear();
}