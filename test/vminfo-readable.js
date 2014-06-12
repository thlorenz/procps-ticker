'use strict';
/*jshint asi: true */

var test = require('tap').test
var vminfo = require('../').sysinfo.vminfo

function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true));
}

// vminfo uses basic readable, so all functions wrapped
// with basic readable don't have to be tested separately
test('\nvminfo', function (t) {
  var data = [], ended;
  var stream = vminfo ( { interval: 50 })
    .on('data', [].push.bind(data))
    .on('end', function () { 
      t.equal(data.length, 2, 'pushed to vminfos')
      t.ok(data[0].pgpgout > 0, 'first vminfo has non zero pgpgout')
      t.end()
    })

  setTimeout(stream.endSoon.bind(stream), 140);
})
