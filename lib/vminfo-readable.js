'use strict';

var stream = require('readable-stream');
var util = require('util');
var vminfo = require('procps').sysinfo.vminfo;

var Readable = stream.Readable;

module.exports = VminfoReadable;

util.inherits(VminfoReadable, Readable);

var proto = VminfoReadable.prototype;

function VminfoReadable (opts) {
  if (!(this instanceof VminfoReadable)) return new VminfoReadable(opts);

  opts = opts || {};
  opts.objectMode = true;
  this._interval = opts.interval;
  
  Readable.call(this, opts);
}

function next(self) {
  var r;
  if (self._ending) return self.push(null);
  try {
    r = vminfo(self._unit);
    self.push(r);
  } catch (e) {
    self.emit('error', e);
  }
}

proto._read = function () {
  this._timeout = setTimeout(next, this._interval, this);
}

proto.endSoon = function () {
  this._ending = true;
}
