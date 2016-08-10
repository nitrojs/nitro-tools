
var assert = require('assert'),
    _ = require('../path');

describe('joinPath', function () {

	it('_.joinPath no /', function () {
		assert.equal( _.joinPath('foo', 'bar'), 'foo/bar');
	});

	it('_.joinPath 1st/', function () {
		assert.equal( _.joinPath('foo/', 'bar'), 'foo/bar');
	});

	it('_.joinPath /2nd', function () {
		assert.equal( _.joinPath('foo', '/bar'), 'foo/bar');
	});

	it('_.joinPath 1st/ /2nd', function () {
		assert.equal( _.joinPath('foo/', '/bar'), 'foo/bar');
	});

	it('_.joinPath 1 arg', function () {
		assert.equal( _.joinPath('foobar'), 'foobar');
	});

	it('_.joinPath 3 args', function () {
		assert.equal( _.joinPath('api', 'v1', 'foobar'), 'api/v1/foobar');
	});

	it('_.joinPath 4 args', function () {
		assert.equal( _.joinPath('api', 'v1', 'foo', 'bar'), 'api/v1/foo/bar');
	});

	it('_.joinPath 4 args slashes', function () {
		assert.equal( _.joinPath('/api/', '/v1/', '/foo/', '/bar'), '/api/v1/foo/bar');
	});

	it('_.joinPath 4 args slashes rest', function () {
		assert.equal( _.joinPath('/api/:apiId/', '/v1/:v1Id/', '/foo/:fooId/', '/bar/:barId'), '/api/:apiId/v1/:v1Id/foo/:fooId/bar/:barId');
	});

	it('_.joinPath 4 args slashes-alt rest', function () {
		assert.equal( _.joinPath('/api/:apiId/', 'v1/:v1Id/', '/foo/:fooId/', 'bar/:barId'), '/api/:apiId/v1/:v1Id/foo/:fooId/bar/:barId');
	});

	it('_.joinPath 4 args slashes-alt2 rest', function () {
		assert.equal( _.joinPath('/api/:apiId', '/v1/:v1Id', '/foo/:fooId', '/bar/:barId'), '/api/:apiId/v1/:v1Id/foo/:fooId/bar/:barId');
	});

	it('_.joinPath 4 args slashes-alt2 rest back', function () {
		assert.equal( _.joinPath('/api/:apiId', '/v1/:v1Id', '../../foo/:fooId', '/bar/:barId'), '/api/:apiId/foo/:fooId/bar/:barId');
	});

});
