'use strict';

var procps = require('procps');

/**
 * Creates a stream that will emit
 * [readprocdata](https://github.com/thlorenz/procps#readproctabflags_--arrayobject)
 * at the given interval.
 * 
 * @name readproctab
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @param {number=} opts.flags    [readproc flags](https://github.com/thlorenz/procps#readproctabflags)
 * @function
 * @return {ReadableStream} stream that emits readproctab data at the given interval
 */
exports.readproctab = require('./lib/readproctab-readable');

var sysinfo = exports.sysinfo = {};

/**
 * Creates a stream that will emit
 * [meminfo](https://github.com/thlorenz/procps#sysinfomeminfounit--object)
 * at the given interval.
 * 
 * @name meminfo
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @param {number=} opts.unit     `'b'|'k'|'m'|'g'` to return usage in Bytes|KB|MB|GB respectively
 * @function
 * @return {ReadableStream} stream that emits meminfo at the given interval
 */
sysinfo.meminfo      = require('./lib/meminfo-readable');

/**
 * Creates a stream that will emit
 * [vminfo](https://github.com/thlorenz/procps#vminfo--object)
 * at the given interval.
 * 
 * @name vminfo
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits vminfo at the given interval
 */
sysinfo.vminfo       = require('./lib/basic-readable')(procps.sysinfo.vminfo);


/**
 * Creates a stream that will emit
 * [stats](https://github.com/thlorenz/procps#sysinfogetstat--object) 
 * at the given interval.
 * 
 * @name getstat
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits stats at the given interval
 */
sysinfo.getstat      = require('./lib/basic-readable')(procps.sysinfo.getstat);

/**
 * Creates a stream that will emit
 * [disk stats](https://github.com/thlorenz/procps#sysinfogetdiskstat--object) 
 * at the given interval.
 * 
 * @name getdiskstat
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits disk stats at the given interval
 */
sysinfo.getdiskstat  = require('./lib/basic-readable')(procps.sysinfo.getdiskstat);


/**
 * Creates a stream that will emit
 * [uptime info](https://github.com/thlorenz/procps#sysinfouptime--object)
 * at the given interval.
 * 
 * @name uptime
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits uptime info at the given interval
 */
sysinfo.uptime       = require('./lib/basic-readable')(procps.sysinfo.uptime);

/**
 * Creates a stream that will emit
 * [uptime since info](https://github.com/thlorenz/procps#sysinfouptimesince--object)
 * at the given interval.
 * 
 * @name uptimeSince
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits uptime since info at the given interval
 */
sysinfo.uptimeSince  = require('./lib/basic-readable')(procps.sysinfo.uptimeSince);

/**
 * Creates a stream that will emit
 * [loadavg info](https://github.com/thlorenz/procps#sysinfoloadavg--arraynumber)
 * at the given interval.
 * 
 * @name loadavg
 * @param {Object}  opts          options
 * @param {number=} opts.interval interval in milliseconds at which to emit data (default: 1000ms)
 * @function
 * @return {ReadableStream} stream that emits loadavg info at the given interval
 */
sysinfo.loadavg      = require('./lib/basic-readable')(procps.sysinfo.loadavg);

/**
 * Exposes the underlying [procps](https://github.com/thlorenz/procps) library
 * in order to allow calling methods on it directly.
 * 
 * @name procps
 */
exports.procps = procps;
