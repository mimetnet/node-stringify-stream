var concat = require('concat-stream')
    , os = require('os')
    , streamify = require('stream-array')
    , stringify = require('..')
    , test = require('tape')
;

test('empty array', function(t) {
    streamify([]).pipe(stringify()).pipe(concat(function(res) {
        t.ok(Buffer.isBuffer(res), 'concat results into a Buffer');
        t.equal('', res.toString(), 'result matches expectation');

        t.end();
    }));
});

test('pretty-print empty array', function(t) {
    streamify([]).pipe(stringify({open:'[', close:']'})).pipe(concat(function(res) {
        t.ok(Buffer.isBuffer(res), 'concat results into a Buffer');
        t.equal('[]', res.toString(), 'result matches expectation');

        t.end();
    }));
});
