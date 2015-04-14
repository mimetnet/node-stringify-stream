var concat = require('concat-stream')
    , os = require('os')
    , streamify = require('stream-array')
    , stringify = require('..')
    , test = require('tape')
;

test('newline separated ints', function(t) {
    streamify([1,2,3]).pipe(stringify()).pipe(concat(function(res) {
        var match = [1,2,3].join(os.EOL);

        t.ok(Buffer.isBuffer(res), 'concat results into a Buffer');
        t.equal(match, res.toString(), 'result matches expectation');

        t.end();
    }));
});

test('array of ints', function(t) {
    var opts = {open:'[', close:']'};

    streamify([1,2,3]).pipe(stringify(opts)).pipe(concat(function(res) {
        t.ok(Buffer.isBuffer(res), 'concat results into a Buffer');
        t.equal('[1,2,3]', res.toString(), 'result matches expectation');

        t.end();
    }));
});

test('array of objects with unicode', function (t) {
    streamify([{ obj: '\u00bd' }, { otherObj: '\u00bc' }, { lastObj: '\u00be'}])
        .pipe(stringify())
        .pipe(concat(function (res) {
            t.ok(Buffer.isBuffer(res), 'concat results into a buffer');
            t.equals('{"obj":"\u00bd"}\n{"otherObj":"\u00bc"}\n{"lastObj":"\u00be"}', res.toString(), 'result matches expectation');
            t.end();
    }));
});

test('pretty-print array of objects', function(t) {
    streamify([{one:1}]).pipe(stringify(null, null, '\t')).pipe(concat(function(res) {
        t.ok(Buffer.isBuffer(res), 'concat results into a Buffer');
        t.equal('{\n\t"one": 1\n}', res.toString(), 'result matches expectation');

        t.end();
    }));
});
