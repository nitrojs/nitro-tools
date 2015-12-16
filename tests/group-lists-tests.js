
var assert = require('assert'),
    _ = require('../lib/group-lists');

describe('find', function () {

	var item0 = { foo: 'foo', value: 1, common: 1 },
			item1 = { foo: 'bar', value: 2, common: 1 },
			item2 = { foo: 'foobar', value: 3, common: 2 };

	var list = [item0, item1, item2];

	it('_.find', function () {
		assert.equal( _.find(list, { foo: 'bar' }).value, 2);
	});

	it('_.find mismatch', function () {
		assert.equal( _.find(list, { foo: 'bar', value: 0 }), null);
	});

	it('_.find all keys', function () {
		assert.equal( _.find(list, { foo: 'bar', value: 2 }).value, 2);
	});

	it('_.find callback', function () {
		assert.equal( _.find(list, function (item) {
			return item.value === 3;
		}), item2);
	});

	it('_.find callback thisArg', function () {
		assert.equal( _.find(list, function (item) {
			return item.value === this.value;
		}, { value: 3 }), item2);
	});

	it('_.find callback thisArg', function () {
		assert.equal( _.find(list, function (item) {
			return item.value === this.valueOf();
		}, 3), item2);
	});

});

describe('filter', function () {

	var item0 = { foo: 'foo', value: 1, common: 1 },
			item1 = { foo: 'bar', value: 2, common: 1 },
			item2 = { foo: 'foobar', value: 3, common: 2 };

	var list = [item0, item1, item2];

	it('_.find', function () {
		assert.equal( _.filter(list, { foo: 'bar' })[0], item1);
	});

	it('_.find common', function () {
		assert.equal( JSON.stringify( _.filter(list, { common: 1 }) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

	it('_.find callback', function () {
		assert.equal( JSON.stringify( _.filter(list, function (item) {
			return item.value < 3;
		}) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

	it('_.find callback with thisArg', function () {
		assert.equal( JSON.stringify( _.filter(list, function (item) {
			return item.value < this;
		}, 3) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

});

describe('indexOf', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.indexOf value missing', function () {
		var o = { foo: 'bar' };

		assert.equal( _.indexOf(list, o), -1);
	});

	it('_.indexOf value found', function () {
		var o = { foo: 'bar' };

		list.push(o);

		assert.equal( _.indexOf(list, o), 3);
	});

	it('_.indexOf single value missing', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.equal( _.indexOf(numList, 10), -1);
	});

	it('_.indexOf single value found first', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.equal( _.indexOf(numList, 1), 0);
	});

	it('_.indexOf single value found last', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.equal( _.indexOf(numList, 9), 8);
	});

	it('_.indexOf callback missing', function () {
		assert.equal( _.indexOf(list, function (item) {
			return item && item.foo === 'wrong-value';
		}), -1);
	});

	it('_.indexOf callback found', function () {
		assert.equal( _.indexOf(list, function (item) {
			return item && item.foo === 'bar';
		}), 1);
	});

	it('_.indexOf callback with thisArg found', function () {
		assert.equal( _.indexOf(list, function (item) {
			return item && item.foo === this.key;
		}, { key: 'bar' }), 1);
	});

});

describe('indexBy', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.indexBy string key', function () {
		assert.equal( JSON.stringify(_.indexBy(list, 'foo')), '{"foo":{"foo":"foo"},"bar":{"foo":"bar"},"foobar":{"foo":"foobar"}}');
	});

	it('_.indexBy callback', function () {
		assert.equal( JSON.stringify(_.indexBy(list, function (item) {
			return '_' + item.foo;
		})), '{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
	});

	it('_.indexBy callback with thisArg', function () {
		assert.equal( JSON.stringify(_.indexBy(list, function (item) {
			return this + item.foo;
		}, '_')), '{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
	});

});

describe('_.pluck', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.pluck', function () {
		assert.equal( _.pluck(list, 'foo').toString(), 'foo,bar,foobar');
	});

	// _.pluck callback is an alias of map
	it('_.pluck callback', function () {
		assert.equal( _.pluck(list, function (item) {
			return this + item.foo;
		}, '_').toString(), '_foo,_bar,_foobar');
	});

});
