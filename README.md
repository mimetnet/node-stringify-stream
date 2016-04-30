# stringify-stream

Streaming Transform of objects via JSON.stringify

[![npm version][3]][4] [![build status][1]][2] [![dependencies][5]][6] [![devDependencies][7]][8]

## Usage

### Stream objects into newline separated JSON strings.

```js
var test = require('tape')
    , concat = require('concat-stream')
    , streamify = require('stream-array')
    , stringify = require('stringify-stream')
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
var test = require('tape')
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

```sh
npm install stringify-stream
```

  [1]: https://api.travis-ci.org/mimetnet/node-stringify-stream.svg
  [2]: https://travis-ci.org/mimetnet/node-stringify-stream
  [3]: https://badge.fury.io/js/stringify-stream.svg
  [4]: https://badge.fury.io/js/stringify-stream
  [5]: https://david-dm.org/mimetnet/node-stringify-stream.svg
  [6]: https://david-dm.org/mimetnet/node-stringify-stream
  [7]: https://david-dm.org/mimetnet/node-stringify-stream/dev-status.svg?#info=devDependencies
  [8]: https://david-dm.org/mimetnet/node-stringify-stream/#info=devDependencies

## License

[MIT License](https://github.com/mimetnet/node-stringify-stream/blob/master/LICENSE)
