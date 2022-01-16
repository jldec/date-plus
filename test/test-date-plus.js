/**
 * test-date-plus.js
 * Copyright (c) 2015-2022 Jürgen Leschner - github.com/jldec - MIT license
 *
**/

var test = require('tape');

var date = require('../date-plus.js');
var dateformat = require('../dateformat.js');

test('date', function(t) {
  var nativeDate = new Date;
  var dd = date(nativeDate);
  t.true(dd.valid);
  t.equal(nativeDate.valueOf(), dd.valueOf());
  t.end();
});

test('invalid', function(t) {
  t.false(date('booger').valid);
  t.false(date(NaN).valid);
  t.false(date('45 min'-1).valid);
  t.false(date([]).valid);
  t.false(date({}).valid);
  t.equal(date('booger').format(),'No Date');
  t.equal(date('booger').format('isoDate'),'No Date');
  t.end();
});

test('now', function(t) {
  t.true(date() - new Date() < 2);
  t.false(date(NaN) - date() < 2);
  t.true(isNaN(date(NaN) - date()));
  t.true(date(undefined) - date() < 2);
  t.true(date(null) - date() < 2);
  t.true(date(false) - date() < 2);
  t.true(date(0) - date() < 2);
  t.true(date('') - date() < 2);
  t.end();
});

test('shortcut', function(t) {
  var s = date().format('isoDateTime');
  t.equal(date(s).format('longDate'), date(s,'longDate'));
  t.equal(date('booger', ''), 'No Date');
  t.equal(date('booger', 'longDate'), 'No Date available');
  t.equal(date('booger', 'fullDate'), 'No Date available');
  t.end();
});

test('ES5 UTC gotcha avoidance', function(t) {
  var d3 = date('2014-04-02');
  t.equal(d3.format('mmmm d, yyyy'), 'April 2, 2014');

  var offset = dateformat('2014/04/02', 'o');
  t.equal(date('2014-4-2'  ).format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('2014/4/2'  ).format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('2014-04-02').format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('2014/04/02').format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('4-2-2014'  ).format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('4/2/2014'  ).format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('04-02-2014').format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.equal(date('04/02/2014').format('isoDateTime'), '2014-04-02T00:00:00'+offset);
  t.end();
});

test('addDays', function(t) {
  t.equal(date('4/2/2014').addDays(2).format('longDate'), 'April 4, 2014');
  t.equal(date('4/2/2014').addDays(-2).format('longDate'), 'March 31, 2014');
  t.equal(date('4/1/2015 01:00 pm').addDays(0.5).format('m/d/yyyy hh:MM tt'), '4/2/2015 01:00 am');
  t.end();
});

test('lang de', function(t) {
  date.lang('de');
  var strings = require('../lang/de');
  var i, dfor;

  for (i=0; i<7; i++) {
    dfor = date(2015, 0, 11 + i);
    t.equal(dfor.format('ddd'), strings.dayNames[i]);
    t.equal(dfor.format('dddd'), strings.dayNames[i+7]);
  }

  for (i=0; i<12; i++) {
    dfor = date(2015, i, 1);
    t.equal(dfor.format('mmm'), strings.monthNames[i]);
    t.equal(dfor.format('mmmm'), strings.monthNames[i+12]);
  }

  t.equal(date('booger', ''), 'Kein Datum');
  t.equal(date('booger', 'longDate'), 'Kein Datum vorhanden');
  t.equal(date('booger', 'fullDate'), 'Kein Datum vorhanden');

  t.end();
});

test('access dateformat masks', function(t) {
  date.dateformat.masks.shortDate = ('yyyy.mm.dd');
  t.equal(date('1/1/2015').format('shortDate'), '2015.01.01');
  t.end();
});
