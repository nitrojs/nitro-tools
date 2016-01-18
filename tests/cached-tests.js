'use strict';

var _ = { cached: require('../lib/cached') },
    assert = require('assert');

describe('_.cached', function () {

  it('object', function () {

    var foobar = { foo: 'bar' },
        _cached = _.cached(foobar);

    assert( _cached() === foobar );
  });

  it('function', function () {

    var foobar = { foo: 'bar' },
        counter = 0,
        _cached = _.cached(function () {
          counter++;
          return foobar;
        });

    assert.strictEqual( _cached(), foobar);

    _cached();
    assert.equal( counter, 1 );

  });

  it('flush', function () {

    var foobar = { foo: 'bar' },
        counter = 0,
        _cached = _.cached(function () {
          counter++;
          return foobar;
        });

    assert.strictEqual( _cached(), foobar, '_cached() === foobar (1)');

    _cached();
    assert.equal( counter, 1 );

    _.cached.flush();

    assert.strictEqual( _cached(), foobar, '_cached() === foobar (2)');
    assert.equal( counter, 2, 'counter = 2' );

  });

});
