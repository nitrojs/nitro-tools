
var assert = require('assert'),
    _ = require('../lib/group-key');

describe('Object handling by Key', function () {

	it('_.key get', function () {
		var o = { foo: 'bar' };

		assert.equal( _.key(o, 'foo'), 'bar');
	});

	it('_.key set', function () {
		var o = { foo: 'bar' };

		_.key(o, 'foo', 'changed');

		assert.equal( o.foo, 'changed');
	});

	it('_.key set 2nd level', function () {
		var o = {};

		_.key(o, 'foo.bar', 'foobar');

		assert.equal( o.foo.bar, 'foobar');
	});

});
