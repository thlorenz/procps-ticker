'use strict';

exports.readproctab = require('./lib/readproctab-readable');

var sysinfo = exports.sysinfo = {};
sysinfo.meminfo = require('./lib/meminfo-readable');
