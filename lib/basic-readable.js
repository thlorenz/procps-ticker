'use strict';

var stream = require('readable-stream');
var util = require('util');

var Readable = stream.Readable;

module.exports = function (info) { 
  return function (opts) { 
    return new BasicReadable(opts, info);
  }
}

util.inherits(BasicReadable, Readable);

var proto = BasicReadable.prototype;

function BasicReadable (opts, info) {
  if (!(this instanceof BasicReadable)) return new BasicReadable(opts, info);

  opts = opts || {};
  opts.objectMode = true;
  this._interval = opts.interval;
  this._info = info;
  
  Readable.call(this, opts);
}

function next(self) {
  var r;
  if (self._ending) return self.push(null);
  try {
    r = self._info();
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
