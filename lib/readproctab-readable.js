'use strict';

var stream = require('readable-stream');
var util = require('util');
var procps = require('procps');

var Readable = stream.Readable;

exports = module.exports = ReadproctabReadable;
exports.flags = procps.readproctab.flags;
exports.flagsFillAll = procps.readproctab.flagsFillAll;

util.inherits(ReadproctabReadable, Readable);
var proto = ReadproctabReadable.prototype;

function ReadproctabReadable (opts) {
  if (!(this instanceof ReadproctabReadable)) return new ReadproctabReadable(opts);

  opts = opts || {};
  opts.objectMode = true;
  this._interval = opts.interval || 1000; // 1 second
  this._flags = opts.flags || exports.flagsFillAll;
  Readable.call(this, opts);
}

function next(self) {
  var r;
  if (self._ending) return self.push(null);
  try {
    r = procps.readproctab(self._flags);
    self.push(r);
  } catch (e) {
    self.emit('error', e);
  }
}

proto._read = function () {
  this._timeout = setTimeout(next, this._interval, this);
}


/**
 * Call this in case you want to tell the state stream to end.
 * Useful for testing and/or when you want to end your debugging session and allow the program to exit.
 * 
 * @name endSoon
 * @function
 */
proto.endSoon = function () {
  this._ending = true;
}
