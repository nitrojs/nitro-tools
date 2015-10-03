'use strict';

var s1, s2, s3,
    assert = require('assert'),
    _ = require('../lib/tools');

function initScopes () {
	s1 = _.scope({ foo: 'bar', overlap: 'v1', obj: { value: 'pristine' }, num: 2 });

	s2 = s1.$$new({ overlap: 'v2' });

	s3 = s2.$$new({ num: s1.num*2 });
	s3.foo = 'changed';

	s3.obj.value = 'dirty';
}

describe('scope inheritance', function () {

  beforeEach(initScopes);

	it('level 1', function () {
		assert.strictEqual(s1.foo, 'bar');
	});

	it('level 1 overlap', function () {
		assert.strictEqual(s1.overlap, 'v1');
	});

	it('level 1 dirty', function () {
		assert.strictEqual(s1.obj.value, 'dirty');
	});

	it('level 2 overlap', function () {
		assert.strictEqual(s2.overlap, 'v2');
	});

	it('level 3 foo', function () {
		assert.strictEqual(s3.foo, 'changed');
	});

	it('num', function () {
		assert.strictEqual(s1.num + s3.num, 6);
	});

});

describe('scope evaluator', function () {

  beforeEach(initScopes);

	it('evaluator (1)', function () {
		assert.strictEqual( s1.$$eval('foo'), 'bar');
	});

	it('evaluator (1.1)', function () {
		assert.strictEqual( s1.$$eval('foo + overlap'), 'barv1');
	});

	it('evaluator (2)', function () {
		assert.strictEqual( s2.$$eval('foo'), 'bar');
	});

	it('evaluator (2.1)', function () {
		assert.strictEqual( s2.$$eval('foo + overlap'), 'barv2');
	});

	it('evaluator (3)', function () {
		assert.strictEqual( s3.$$eval('foo'), 'changed');
	});

	it('evaluator (3.1)', function () {
		assert.strictEqual( s3.$$eval('foo + overlap'), 'changedv2');
	});

});
