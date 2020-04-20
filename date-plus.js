/**
 * date-plus.js
 * parses and returns native date extended with dateformat
 *
 * copyright 2015-2020, Jürgen Leschner - github.com/jldec - MIT license
**/

var dateformat = require('./dateformat.js');
dateformat.i18n.invalidDates = [ 'No Date', 'No Date available' ];

module.exports = date;

function date(s,a2,a3,a4,a5,a6,a7) {

  var d;

  // treat - like / to prevent UTC treatment of yyyy-mm-dd strings
  if (/^\d\d\d\d-\d\d?-\d\d?$/.test(s)) { s = s.replace(/-/g,'/'); }

  switch (arguments.length) {
  case 7: d = new Date(s,a2,a3,a4,a5,a6,a7); break;
  case 6: d = new Date(s,a2,a3,a4,a5,a6); break;
  case 5: d = new Date(s,a2,a3,a4,a5); break;
  case 4: d = new Date(s,a2,a3,a4); break;
  case 3: d = new Date(s,a2,a3); break;
  case 2: if (typeof a2 !== 'string') { d = new Date(s,a2); break; }
  // fall through when 2nd arg is string
  case 1: if (s || (typeof s !== 'undefined' && isNaN(s))) { d = new Date(s); break; }
  // fall through when 1st arg is empty e.g. '', 0, undefined
  default: d = new Date();
  }

  d.valid = !isNaN(d);

  d.format = function(fmt) {
    return d.valid ? dateformat(d, fmt) :
      (/^longDate$|^fullDate$/.test(fmt) ? dateformat.i18n.invalidDates[1] : dateformat.i18n.invalidDates[0]);
  };

  if (arguments.length === 2 && typeof a2 === 'string') {
    return d.format(a2);
  }

  d.addDays = function(days) {
    return date(d.valueOf() + days*24*60*60*1000);
  };

  d.inspect = function() { return d.format(); };

  return d;
}

// set language globally
date.lang = function lang(l) {
  dateformat.i18n = require('./lang/' + l);
  return date;
};

// access dateformat to extend masks
date.dateformat = dateformat;
