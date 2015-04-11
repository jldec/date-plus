/**
 * date-plus.js
 * parses and returns native date extended with dateformat
 *
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
**/

var dateformat = require('dateformat');

module.exports = date;

function date(s,a2,a3,a4,a5,a6,a7) {

  // treat - like / to prevent UTC treatment of yyyy-mm-dd strings
  if (/^\d\d\d\d-\d\d?-\d\d?$/.test(s)) { s = s.replace(/-/g,'/'); }

  var d;

  switch (arguments.length) {
    case 0: d = new Date(); break;
    case 1: d = new Date(s); break;
    case 2: d = new Date(s,a2); break;
    case 3: d = new Date(s,a2,a3); break;
    case 4: d = new Date(s,a2,a3,a4); break;
    case 5: d = new Date(s,a2,a3,a4,a5); break;
    case 6: d = new Date(s,a2,a3,a4,a5,a6); break;
    default: d = new Date(s,a2,a3,a4,a5,a6,a7); break;
  }

  d.valid = !isNaN(d);

  d.isValid = function() { return d.valid; };

  d.format = function format(fmt) {
    return d.valid ? dateformat(d, fmt) : d.toString();
  };

  d.addDays = function addDays(days) {
    return date(d.valueOf() + days*24*60*60*1000);
  };
  
  return d;
}

// set language globally
date.lang = function lang(l) {
  dateformat.i18n = require('./lang/' + l)
  return date;
}

