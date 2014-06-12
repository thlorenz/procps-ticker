'use strict';

var getstat = require('../').sysinfo.getstat;

function pad(s) {
  return String('          ' + s).slice(-10);
}

function end(stream) {
  stream.endSoon();
  console.error('\nending');
}

var stream = getstat({ interval: 500 })
stream
  .on('error', console.error)
  .once('data', function (d) { 
    var keys = Object.keys(d).map(function (k) { return pad(k) }).join('');
    process.stdout.write(keys + '\n');
  })
  .on('data', function (d) {
    var vals = Object.keys(d).map(function (k) { return pad(d[k]) }).join('')
    process.stdout.write(vals + '\r');
  })


setTimeout(end, 10000, stream);
