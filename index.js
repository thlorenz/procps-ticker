'use strict';

var procps = require('procps');

exports.readproctab = require('./lib/readproctab-readable');

var sysinfo = exports.sysinfo = {};

sysinfo.meminfo = require('./lib/meminfo-readable');
sysinfo.vminfo  = require('./lib/basic-readable')(procps.sysinfo.vminfo);
