# procps-ticker [![build status](https://secure.travis-ci.org/thlorenz/procps-ticker.png?branch=master)](http://travis-ci.org/thlorenz/procps-ticker)

Ticks `proc` info of the host machine at given intervals and exposes it via a stream interface.

```js
var getstat = require('procps-ticker').sysinfo.getstat;

function pad(s) {
  return String('          ' + s).slice(-10);
}

function end(stream) {
  stream.end();
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
```

![procps-ticker](https://raw.githubusercontent.com/thlorenz/procps-ticker/master/assets/procps-ticker.gif)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Installation](#installation)
    - [procps](#procps)
- [API](#api)
    - [readproctab(opts) → {ReadableStream}](#readproctabopts--readablestream)
    - [Stream::end()](#streamend)
    - [sysinfo::getdiskstat(opts) → {ReadableStream}](#sysinfogetdiskstatopts--readablestream)
    - [sysinfo::getstat(opts) → {ReadableStream}](#sysinfogetstatopts--readablestream)
    - [sysinfo::loadavg(opts) → {ReadableStream}](#sysinfoloadavgopts--readablestream)
    - [sysinfo::meminfo(opts) → {ReadableStream}](#sysinfomeminfoopts--readablestream)
    - [sysinfo::uptime(opts) → {ReadableStream}](#sysinfouptimeopts--readablestream)
    - [sysinfo::uptimeSince(opts) → {ReadableStream}](#sysinfouptimesinceopts--readablestream)
    - [sysinfo::vminfo(opts) → {ReadableStream}](#sysinfovminfoopts--readablestream)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

    npm install procps-ticker

## API


<!-- START docme generated API please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN docme TO UPDATE -->

<div>
<div class="jsdoc-githubify">
<section>
<article>
<div class="container-overview">
<dl class="details">
</dl>
</div>
<dl>
<dt>
<h4 class="name" id="procps"><span class="type-signature"></span>procps<span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Exposes the underlying <a href="https://github.com/thlorenz/procps">procps</a> library
in order to allow calling methods on it directly.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L114">lineno 114</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="readproctab"><span class="type-signature"></span>readproctab<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#readproctabflags_--arrayobject">readprocdata</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
<tr>
<td class="name"><code>flags</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p><a href="https://github.com/thlorenz/procps#readproctabflags">readproc flags</a></p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L5">lineno 5</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits readproctab data at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="Stream::end"><span class="type-signature"></span>Stream::end<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Call this on any of the returned streams in case you want to tell the state stream to end.
Useful for testing and/or when you want to end your debugging session and allow the program to exit.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/lib/basic-readable.js">lib/basic-readable.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/lib/basic-readable.js#L44">lineno 44</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::getdiskstat"><span class="type-signature"></span>sysinfo::getdiskstat<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfogetdiskstat--object">disk stats</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L61">lineno 61</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits disk stats at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::getstat"><span class="type-signature"></span>sysinfo::getstat<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfogetstat--object">stats</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L48">lineno 48</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits stats at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::loadavg"><span class="type-signature"></span>sysinfo::loadavg<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfoloadavg--arraynumber">loadavg info</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L101">lineno 101</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits loadavg info at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::meminfo"><span class="type-signature"></span>sysinfo::meminfo<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfomeminfounit--object">meminfo</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
<tr>
<td class="name"><code>unit</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p><code>'b'|'k'|'m'|'g'</code> to return usage in Bytes|KB|MB|GB respectively</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L21">lineno 21</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits meminfo at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::uptime"><span class="type-signature"></span>sysinfo::uptime<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfouptime--object">uptime info</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L75">lineno 75</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits uptime info at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::uptimeSince"><span class="type-signature"></span>sysinfo::uptimeSince<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#sysinfouptimesince--object">uptime since info</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L88">lineno 88</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits uptime since info at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
<dt>
<h4 class="name" id="sysinfo::vminfo"><span class="type-signature"></span>sysinfo::vminfo<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
</dt>
<dd>
<div class="description">
<p>Creates a stream that will emit
<a href="https://github.com/thlorenz/procps#vminfo--object">vminfo</a>
at the given interval.</p>
</div>
<h5>Parameters:</h5>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>opts</code></td>
<td class="type">
<span class="param-type">Object</span>
</td>
<td class="description last"><p>options</p>
<h6>Properties</h6>
<table class="params">
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Argument</th>
<th class="last">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td class="name"><code>interval</code></td>
<td class="type">
<span class="param-type">number</span>
</td>
<td class="attributes">
&lt;optional><br>
</td>
<td class="description last"><p>interval in milliseconds at which to emit data (default: 1000ms)</p></td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js">index.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L35">lineno 35</a>
</li>
</ul></dd>
</dl>
<h5>Returns:</h5>
<div class="param-desc">
<p>stream that emits vminfo at the given interval</p>
</div>
<dl>
<dt>
Type
</dt>
<dd>
<span class="param-type">ReadableStream</span>
</dd>
</dl>
</dd>
</dl>
</article>
</section>
</div>

*generated with [docme](https://github.com/thlorenz/docme)*
</div>
<!-- END docme generated API please keep comment here to allow auto update -->

## License

MIT
