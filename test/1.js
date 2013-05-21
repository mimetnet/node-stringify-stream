var tap = require('tap')
    , test = tap.test
    , stringify
;

test('require', function(t) {
    stringify = require('..');

    t.ok(stringify, 'stringify-stream exists');
    t.type(stringify, 'function', 'require returns an object');
    t.equal(0, Object.keys(stringify).length, 'No hidden exports exports');
    t.end();
});
