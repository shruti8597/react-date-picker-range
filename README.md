# react-date-picker-range

A React Date picker for range and single date.

Predefined side options can also be rendered.

# NPM Repository
https://www.npmjs.com/package/react-date-picker-range

# Install
`npm i react-date-picker-range --save`

# Options

Single Calendar

| Prop | Type | Default | Description |
| :---------- |:----------| :-----|:-------|
| locale     | String | 'en' | Locale for multilingual, i.e. 'de','fr' |
| disabled      | Function      |   false | A function that takes date as argument, return true if date need to be disabled  |
| sideMenu | Array - [  {label,from,to} ] |   [] | Predefined Options |
| defaultDate      | Date |   - | Date to be shown when calendar opens |
| onChangeDate| Function | - | Returns Date on OK/Done click |
| disabledPicker | Boolean | false | Disable the date Picker |
| datePrefix | String | "Date:" | Label for the input date field |
| doneText | String | 'Done' | Text for the done/ok button |

Range Calendar

| Prop | Type | Default | Description |
| :---------- |:----------| :-----|:-------|
| locale     | String | 'en' | Locale for multilingual, i.e. 'de','fr' |
| disabled      | Function      |   false | A function that takes date as argument, return true if date need to be disabled  |
| sideMenu | Array - [  {label,from,to} ] |   [] | Predefined Options |
| defaultToDate      | Date |  - | To date to be displayed when calendar opens |
| defaultFromDate | Date | - | From date to be displayed when calendar opens |
| onChangeDate| Function | - | Returns fromDate,toDate on OK/Done click |
| disabledFromPicker | Boolean | false | Disable from Date Picker |
| disabledToPicker | Boolean | false | Disable the to date Picker |
| fromDatePrefix | String | "From:" | Label for the from date field |
| toDatePrefix | String | 'To:'| Label for the to date field |
| doneText | String | 'Done' | Text for the done/ok button |

# Usage
```
import SingleCalendar from 'react-date-picker-range';
import { RangeCalendar } from 'react-date-picker-range';

<SingleCalendar/>
<RangeCalendar/>
```
