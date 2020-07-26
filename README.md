# date-plus
[![CI](https://github.com/jldec/date-plus/workflows/CI/badge.svg)](https://github.com/jldec/date-plus/actions)

Javascript dates extended with [dateformat](https://www.npmjs.com/package/dateformat)

- Tiny wrapper function to create dates
- returns normal Date objects extended with `.format()`
- uses the built-in date parser, fixes a parser annoyance in ES5
- unlike dateformat, format() doesn't throw if the date is invalid
- choice of language strings - currently `de` and `en` are included

## installation

```sh
$ npm install date-plus
```

## usage

```javascript
var date = require('date-plus');

// parse using native javascript parser
var d = date('5/10/2015');

// format
var output = d.format('ddd, dd mmm yyyy HH:MM:ss Z');

// or use a predefined mask
var output = d.format('expiresHeaderFormat');

// shortcut for date(d).format(fmt) - 2nd arg format string
var output = date(d, fmt);

// non-truthy input means current date/time
var now = date('');

var d = date('inva/lid/date');
var isValid = d.valid;          // false
var output = d.format();        // 'No Date'

// set language to german
date.lang('de');

// access dateformat masks
date.dateformat.masks.shortDate = ('yyyy.mm.dd');
```

### format patterns

| pattern     | interpretation                  |
| :---------- | :------------------------------ |
| d           | day                             |
| dd          | day with leading 0              |
| ddd         | day of week abbreviated         |
| dddd        | day of week full                |
| m           | month                           |
| mm          | month with leading 0            |
| mmm         | month abbreviated               |
| mmmm        | month full                      |
| yy          | year 2 digit                    |
| yyyy        | year 4 digit                    |
| h           | hours (12)                      |
| hh          | hours (12) with leading 0       |
| H           | hours (24)                      |
| HH          | hours (24) with leading 0       |
| M           | minutes                         |
| MM          | minutes with leading 0          |
| s           | seconds                         |
| ss          | seconds with leading 0          |
| l           | milliseconds 3 digits           |
| L           | milliseconds 2 digits           |
| t           | a or p for am or pm             |
| tt          | am or pm                        |
| T           | A or P for am or pm             |
| TT          | AM or PM                        |
| Z           | US timezone or GMT-????         |
| o           | UTC offset e.g. +1000 or -0230  |
| S           | day suffix e.g. 'nd' for 2      |
| W           | week in year                    |
| N           | day in week                     |
| UTC:fmt     | render UTC instead of local     |

### format masks

| mask name             | interpretation                  |
| :-------------------- | :------------------------------ |
| default               | ddd mmm dd yyyy HH:MM:ss        |
| shortDate             | m/d/yy                          |
| mediumDate            | mmm d, yyyy                     |
| longDate              | mmmm d, yyyy                    |
| fullDate              | dddd, mmmm d, yyyy              |
| shortTime             | h:MM TT                         |
| mediumTime            | h:MM:ss TT                      |
| longTime              | h:MM:ss TT Z                    |
| isoDate               | yyyy-mm-dd                      |
| isoTime               | HH:MM:ss                        |
| isoDateTime           | yyyy-mm-dd'T'HH:MM:sso          |
| isoUtcDateTime        | UTC:yyyy-mm-dd'T'HH:MM:ss'Z'    |
| expiresHeaderFormat   | ddd, dd mmm yyyy HH:MM:ss Z     |


### parsing `yyyy-mm-dd`

[ES5](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse#ECMAScript_5_ISO-8601_format_support) interprets strings matching `yyyy-mm-dd` as UTC even when running in other timezones.

E.g. `2015-9-15` is assumed to be midnight on that date in the local timezone

But `2015-10-15` is interpreted as midnight on that date in the UTC timezone because the date uses an ISO format and has a 2-digit month.
This is problematic e.g. for code parsing unpadded dates passed via JSON.

This module provides a small polyfill to parse `yyyy-mm-dd` dates as local even in ES5.

## credits
- this package includes dateformat.js from  [dateformat](https://www.npmjs.com/package/dateformat)
- which was based on Steven Levithan's [date-time-format](http://blog.stevenlevithan.com/archives/date-time-format)
- additional inspiration from [PhantomJS-DatePolyfill](https://github.com/kbaltrinic/PhantomJS-DatePolyfill)
