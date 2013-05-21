var tap = require('tap')
    , test = tap.test
    , stringify = require('..')
    , concat = require('concat-stream')
    , os = require('os')
    , streamify = require('stream-array')
;

test('newline separated ints', function(t) {
    streamify([1,2,3]).pipe(stringify()).pipe(concat(function(err, res) {
        var match = [1,2,3].join(os.EOL);

        t.notOk(err, 'No error');
        t.type(res, 'Buffer', 'concat results into a Buffer');
        t.equal(match, res.toString(), 'result matches expectation');

        t.end();
    }));
});

test('array of ints', function(t) {
    var opts = {open:'[', close:']'};

    streamify([1,2,3]).pipe(stringify(opts)).pipe(concat(function(err, res) {
        t.notOk(err, 'No error');
        t.type(res, 'Buffer', 'concat results into a Buffer');
        t.equal('[1,2,3]', res.toString(), 'result matches expectation');

        t.end();
    }));
});

test('pretty-print array of objects', function(t) {
    streamify([{one:1}]).pipe(stringify(null, null, '\t')).pipe(concat(function(err, res) {
        t.notOk(err, 'No error');
        t.type(res, 'Buffer', 'concat results into a Buffer');
        t.equal('{\n\t"one": 1\n}', res.toString(), 'result matches expectation');

        t.end();
    }));
});
