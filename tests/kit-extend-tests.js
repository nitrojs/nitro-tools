
var assert = require('assert'),
    _ = require('../extend');

describe('Object extend functions', function () {

	it('_.extend', function () {
		var o = { foo: 'bar' };

		_.extend(o, { crash: 'test' }, { test: 'dummy' });

		assert.equal( JSON.stringify(o), '{"foo":"bar","crash":"test","test":"dummy"}');
	});

	it('_.extend no deep', function () {
		var o = { foo: 'bar' };

		_.extend(o, { crash: 'test', test: { dummy: 'oO' } }, { test: 'dummy' });

		assert.equal( JSON.stringify(o), '{"foo":"bar","crash":"test","test":"dummy"}');
	});

	it('_.merge', function () {

		var o = {};

		_.merge(o, { crash: 'test', test: { dummy: 'oO' } }, { test: { foo: 'bar' } });

		assert.equal( JSON.stringify(o), '{"crash":"test","test":{"dummy":"oO","foo":"bar"}}');
	});

	it('_.merge (2)', function () {

		var o = {};

		_.merge(o, { crash: 'test', test: { dummy: 'oO' } }, { test: { foo: 'bar' }, hi: 0 });

		assert.equal( JSON.stringify(o), '{"crash":"test","test":{"dummy":"oO","foo":"bar"},"hi":0}');
	});

	it('_.merge (3)', function () {

		var o = {};

		_.merge(o, { crash: 'test', test: { list: [1,2,3] } }, { test: { list: [4,5,6] } });

		assert.equal( JSON.stringify(o), '{"crash":"test","test":{"list":[1,2,3,4,5,6]}}');
	});

	it('_.copy', function () {

		var o = { foo: 'bar', bar: { foobar: '...' } },
				o2 = _.copy(o);

    o.bar.foobar = 'no-dots';

		assert.equal( o2.foo, 'bar', 'first level');
		assert.equal( o2.bar.foobar, '...', '...');
		assert( o.bar !== o2.bar, 'different instance');
	});

});
