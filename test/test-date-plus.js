/**
 * test-date-plus.js
 * copyright 2015, Jurgen Leschner - github.com/jldec - MIT license
 *
**/

suite('test date-plus');

var date = require('../date-plus.js');
var dateformat = require('dateformat');

var should = require('should');

test('date', function(){
  var nativeDate = new Date;
  var dd = date(nativeDate);
  dd.valid.should.be.true;
  nativeDate.valueOf().should.be.exactly(dd.valueOf());

  var d = date('booger');
  d.valid.should.be.false;
  d.format().should.be.exactly('No Date');
  d.format('isoDate').should.be.exactly('No Date');
});

test('now', function(){
  (date(undefined) - new Date()).should.be.below(2);
  (date() - date(false)).should.be.below(2);
  (date(0) - date(null)).should.be.below(2);
  (date(NaN) - date(undefined)).should.be.below(2);
})

test('shortcut', function(){
  var s = date().format('isoDateTime');
  date(s).format('longDate').should.be.exactly(date(s,'longDate'));
  date('booger', '').should.be.exactly('No Date');
})

test('ES5 UTC gotcha avoidance', function(){
  var d3 = date('2014-04-02');
  d3.format('mmmm d, yyyy').should.be.exactly('April 2, 2014');

  var offset = dateformat('o');
  date('2014-4-2'  ).format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('2014/4/2'  ).format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('2014-04-02').format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('2014/04/02').format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('4-2-2014'  ).format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('4/2/2014'  ).format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('04-02-2014').format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
  date('04/02/2014').format('isoDateTime').should.be.exactly('2014-04-02T00:00:00'+offset);
});

test('addDays', function(){
  date('4/2/2014').addDays(2).format('longDate').should.be.exactly('April 4, 2014');
  date('4/2/2014').addDays(-2).format('longDate').should.be.exactly('March 31, 2014');
  date('4/1/2015 01:00 pm').addDays(0.5).format('m/d/yyyy hh:MM tt').should.be.exactly('4/2/2015 01:00 am');
});

test('lang de', function(){
  date.lang('de');
  var strings = require('../lang/de');
  var d = date('2015/01/11');
  var i, dfor;

  for (i=0; i<7; i++) {
    dfor = date(2015, 0, 11 + i);
    dfor.format('ddd').should.be.exactly(strings.dayNames[i]);
    dfor.format('dddd').should.be.exactly(strings.dayNames[i+7]);
  }

  for (i=0; i<12; i++) {
    dfor = date(2015, i, 1);
    dfor.format('mmm').should.be.exactly(strings.monthNames[i]);
    dfor.format('mmmm').should.be.exactly(strings.monthNames[i+12]);
  }
});

test('access dateformat masks', function(){
  date.dateformat.masks.shortDate = ('yyyy.mm.dd');
  date('1/1/2015').format('shortDate').should.be.exactly('2015.01.01');
});
