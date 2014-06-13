'use strict';

var stream = require('readable-stream');
var util = require('util');
var meminfo = require('procps').sysinfo.meminfo;

var Readable = stream.Readable;

module.exports = MeminfoReadable;

util.inherits(MeminfoReadable, Readable);

var proto = MeminfoReadable.prototype;

function MeminfoReadable (opts) {
  if (!(this instanceof MeminfoReadable)) return new MeminfoReadable(opts);

  opts = opts || {};
  opts.objectMode = true;
  this._unit = opts.unit;
  this._interval = opts.interval;
  
  Readable.call(this, opts);
}

function next(self) {
  var r;
  try {
    r = meminfo(self._unit);
    self.push(r);
  } catch (e) {
    self.emit('error', e);
  }
}

proto._read = function () {
  this._timeout = setTimeout(next, this._interval, this);
}

proto.end = function () {
  clearTimeout(this._timeout);
  this.push(null);
}
