var Transform = require('stream').Transform
    , util = require('util')
    , os = require('os')
;

if (!Transform) {
    Transform = require('readable-stream/transform');
}

function Stringify(opts, replacer, space) {
    if (!(this instanceof(Stringify)))
        return new Stringify(opts, replacer, space);

    Transform.call(this, {objectMode:true, decodeStrings:false});

    if (!opts) opts = {};

    this._state = {
        open: opts.open,
        sep: ((!opts.open || !opts.close)? os.EOL : (opts.sep? opts.sep : ',')),
        close: ((opts.open && opts.close)? opts.close : null),
        replacer: replacer,
        space: space,
        first: true
    };

    if (this._state.first && this._state.open) {
        this.push(new Buffer(this._state.open));
    }
}

util.inherits(Stringify, Transform);

Stringify.prototype._transform = function(chunk, encoding, done) {
    var buf, str, error = null;

    try {
        str = !Buffer.isBuffer(chunk)? chunk : chunk.toString(encoding);
        str = JSON.stringify(str, this._state.replacer, this._state.space);

        if (!this._state.first && this._state.sep) {
            buf = new Buffer(str.length + this._state.sep.length);
            buf.write(this._state.sep, 0);
            buf.write(str, this._state.sep.length);
        } else {
            buf = new Buffer(str);
        }

        this.push(buf);
        this._state.first = false;
    } catch (e) {
        error = e;
    }

    done(error);
};

Stringify.prototype._flush = function(done) {
    if (this._state.close) {
        this.push(new Buffer(this._state.close));
    } else if (true === this._state.first) {
        this.push(new Buffer(''));
    }

    done();
};

module.exports = function(opts, replacer, space) {
    return new Stringify(opts, replacer, space);
};
