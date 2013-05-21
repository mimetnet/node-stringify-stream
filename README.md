# stringify-stream

Streaming Transform of objects via JSON.stringify

[![build status][1]][2]

## Usage

### Stream objects into newline separated JSON strings.

```js
var test = require('tap').test
    , concat = require('concat-stream')
    , streamify = require('stream-array')
    , stringify = require('stringify-stream');
;

test('newlines', function(t) {
    streamify([1,2,3]).pipe(stringify()).pipe(concat(function(err, res) {
        t.equal('1\n2\n3', res.toString(), 'result matches expectation');
        t.end();
    }));
});
```

### Stream objects into an Array encoded as a JSON string.

```js
var test = require('tap').test
    , concat = require('concat-stream')
    , streamify = require('stream-array')
    , stringify = require('stringify-stream');
;

test('array', function(t) {
    var opts = {open:'[', close:']'};

    streamify([1,2,3]).pipe(stringify(opts)).pipe(concat(function(err, res) {
        t.equal('[1,2,3]', res.toString(), 'result matches expectation');
        t.end();
    }));
});
```

## Install

```
npm install stringify-stream
```

  [1]: https://api.travis-ci.org/mimetnet/node-stringify-stream.png
  [2]: https://travis-ci.org/mimetnet/node-stringify-stream
