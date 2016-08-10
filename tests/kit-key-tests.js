
var assert = require('assert'),
    _ = require('../key');

describe('Object handling by Key', function () {

  it('_.key get', function () {
		var o = { foo: 'bar' };

		assert.strictEqual( _.key(o, 'foo'), 'bar');
	});

	it('_.key get undefined', function () {
		var o = { foo: 'bar' };

		assert.strictEqual( _.key(o, 'foo.bar'), undefined);
	});

	it('_.key set', function () {
		var o = { foo: 'bar' };

		_.key(o, 'foo', 'changed');

		assert.strictEqual( o.foo, 'changed');
	});

	it('_.key set 2nd level', function () {
		var o = {};

		_.key(o, 'foo.bar', 'foobar');

		assert.strictEqual( o.foo.bar, 'foobar');
	});

});
