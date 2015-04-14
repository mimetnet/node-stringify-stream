var test = require('tape');

test('require', function(t) {
    var stringify = require('..');

    t.ok(stringify, 'stringify-stream exists');
    t.equal(typeof(stringify), 'function', 'require returns an object');
    t.equal(0, Object.keys(stringify).length, 'No hidden exports exports');
    t.end();
});
