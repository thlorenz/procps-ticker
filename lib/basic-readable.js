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


/**
 * Call this on any of the returned streams in case you want to tell the state stream to end.
 * Useful for testing and/or when you want to end your debugging session and allow the program to exit.
 * 
 * @name Stream::end
 * @function
 */
proto.end = function () {
  clearTimeout(this._timeout);
  this.push(null);
}
