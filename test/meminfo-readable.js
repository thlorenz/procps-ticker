'use strict';
/*jshint asi: true */

var test = require('tap').test
var meminfo = require('../').sysinfo.meminfo
var travis = process.env.TRAVIS;

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

var nonUnitMainBuffers;
test('\ndefault uint', function (t) {
  var data = [], ended;
  var stream = meminfo( { interval: 50 })
    .on('data', [].push.bind(data))
    .on('end', function () { 
      nonUnitMainBuffers = data[0].mainBuffers;
      t.equal(data.length, 2, 'pushed to meminfos')
      if (!travis) t.ok(nonUnitMainBuffers > 0, 'first meminfo has non zero mainBuffers')
      t.end()
    })

  setTimeout(stream.endSoon.bind(stream), 140);
})

test('\ncustom unit k', function (t) {
  var data = [], ended;
  var stream = meminfo( { interval: 50, unit: 'k' })
    .on('data', [].push.bind(data))
    .on('end', function () { 
      t.equal(data.length, 2, 'pushed to meminfos')
      if (!travis) t.ok(data[0].mainBuffers > 0, 'first meminfo has non zero mainBuffers')
      if (!travis) t.ok(data[0].mainBuffers < nonUnitMainBuffers, 'first meminfo mainBuffers is smaller than non-unit mainBuffers')
      t.end()
    })

  setTimeout(stream.endSoon.bind(stream), 140);
})
