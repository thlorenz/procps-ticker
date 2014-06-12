# procps-ticker [![build status](https://secure.travis-ci.org/thlorenz/procps-ticker.png)](http://travis-ci.org/thlorenz/procps-ticker)

Ticks `proc` info of the host machine at given intervals and exposes it via a stream interface.

```js
var getstat = require('procps-ticker').sysinfo.getstat;

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
```

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](http://doctoc.herokuapp.com/)*

- [Installation](#installation)
- [API](#api)
    - [getdiskstat(opts) → {ReadableStream}](#getdiskstatopts--readablestream)
    - [getstat(opts) → {ReadableStream}](#getstatopts--readablestream)
    - [loadavg(opts) → {ReadableStream}](#loadavgopts--readablestream)
    - [meminfo(opts) → {ReadableStream}](#meminfoopts--readablestream)
    - [readproctab(opts) → {ReadableStream}](#readproctabopts--readablestream)
    - [uptime(opts) → {ReadableStream}](#uptimeopts--readablestream)
    - [uptimeSince(opts) → {ReadableStream}](#uptimesinceopts--readablestream)
    - [vminfo(opts) → {ReadableStream}](#vminfoopts--readablestream)
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L115">lineno 115</a>
</li>
</ul></dd>
</dl>
</dd>
</dl>
<dl>
<dt>
<h4 class="name" id="endSoon"><span class="type-signature"></span>endSoon<span class="signature">()</span><span class="type-signature"></span></h4>
</dt>
<dd>
<div class="description">
<p>Call this in case you want to tell the state stream to end.
Useful for testing and/or when you want to end your debugging session and allow the program to exit.</p>
</div>
<dl class="details">
<dt class="tag-source">Source:</dt>
<dd class="tag-source"><ul class="dummy">
<li>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/lib/readproctab-readable.js">lib/readproctab-readable.js</a>
<span>, </span>
<a href="https://github.com/thlorenz/procps-ticker/blob/master/lib/readproctab-readable.js#L42">lineno 42</a>
</li>
</ul></dd>
</dl>
</dd>
<dt>
<h4 class="name" id="getdiskstat"><span class="type-signature"></span>getdiskstat<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L62">lineno 62</a>
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
<h4 class="name" id="getstat"><span class="type-signature"></span>getstat<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L49">lineno 49</a>
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
<h4 class="name" id="loadavg"><span class="type-signature"></span>loadavg<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L102">lineno 102</a>
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
<h4 class="name" id="meminfo"><span class="type-signature"></span>meminfo<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<h4 class="name" id="uptime"><span class="type-signature"></span>uptime<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L76">lineno 76</a>
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
<h4 class="name" id="uptimeSince"><span class="type-signature"></span>uptimeSince<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
<a href="https://github.com/thlorenz/procps-ticker/blob/master/index.js#L89">lineno 89</a>
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
<h4 class="name" id="vminfo"><span class="type-signature"></span>vminfo<span class="signature">(opts)</span><span class="type-signature"> &rarr; {ReadableStream}</span></h4>
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
