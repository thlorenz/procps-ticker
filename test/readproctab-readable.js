'use strict';
/*jshint asi: true */

var test = require('tap').test
var readproctab = require('../').readproctab

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

function bycmd(proctab) {
  return proctab.reduce(function (acc, p) {
    acc[p.cmd] = p;
    return acc;
  }, {})
}

test('\ndefault flags', function (t) {
  var data = [], ended;
  var stream = readproctab( { interval: 50 })
    .on('data', [].push.bind(data))
    .on('end', function () { 
      var bc = bycmd(data[0]);
      var proc = bc.node;
      t.equal(data.length, 2, 'pushed two readproctabs')
      t.ok(data[0].length > 10, 'first data point has at least 10 processes')
      t.ok(proc.environ.length > 0, 'includes environ for node process')
      t.end()
    })

  setTimeout(stream.end.bind(stream), 140);
})

test('\ncustom flags', function (t) {
  var data = [], ended;
  var flags = readproctab.flagsFillAll ^ readproctab.flags.PROC_FILLENV;

  var stream = readproctab( { interval: 50, flags: flags })
    .on('data', [].push.bind(data))
    .on('end', function () { 
      var bc = bycmd(data[0]);
      var proc = bc.node;
      t.equal(data.length, 2, 'pushed two readproctabs')
      t.ok(data[0].length > 10, 'first data point has at least 10 processes')
      t.equal(proc.environ.length, 0, 'does not include environ for node process')
      t.end()
    })

  setTimeout(stream.end.bind(stream), 140);
})
