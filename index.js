var Transform = require('readable-stream/transform')
    , util = require('util')
    , os = require('os')
;

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

    //
    // Set proper separator length so its not computed everytime
    //
    if (this._state.sep) {
        this._state.sepLength = Buffer.byteLength(this._state.sep);
    }

    if (this._state.first && this._state.open) {
        this.push(new Buffer(this._state.open));
    }
}

util.inherits(Stringify, Transform);

Stringify.prototype._transform = function(chunk, encoding, done) {
    var buf, str, length, error = null;

    try {
        str = !Buffer.isBuffer(chunk)? chunk : chunk.toString(encoding);
        str = JSON.stringify(str, this._state.replacer, this._state.space);

        if (!this._state.first && this._state.sep) {
            length = Buffer.byteLength(str, encoding) + this._state.sepLength;
            buf = new Buffer(length);
            buf.write(this._state.sep, 0);
            buf.write(str, this._state.sepLength);
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
