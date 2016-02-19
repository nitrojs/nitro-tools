
var assert = require('assert'),
    _ = require('../lib/kit-lists');

describe('find', function () {

	var item0 = { foo: 'foo', value: 1, common: 1 },
			item1 = { foo: 'bar', value: 2, common: 1 },
			item2 = { foo: 'foobar', value: 3, common: 2 };

	var list = [item0, item1, item2];

	it('_.find', function () {
		assert.strictEqual( _.find(list, { foo: 'bar' }).value, 2);
	});

	it('_.find mismatch', function () {
		assert.strictEqual( _.find(list, { foo: 'bar', value: 0 }), null);
	});

	it('_.find all keys', function () {
		assert.strictEqual( _.find(list, { foo: 'bar', value: 2 }).value, 2);
	});

	it('_.find callback', function () {
		assert.equal( _.find(list, function (item) {
			return item.value === 3;
		}), item2);
	});

	it('_.find callback thisArg', function () {
		assert.strictEqual( _.find(list, function (item) {
			return item.value === this.value;
		}, { value: 3 }), item2);
	});

	it('_.find callback thisArg', function () {
		assert.strictEqual( _.find(list, function (item) {
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
		assert.strictEqual( _.filter(list, { foo: 'bar' })[0], item1);
	});

	it('_.find common', function () {
		assert.strictEqual( JSON.stringify( _.filter(list, { common: 1 }) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

	it('_.find callback', function () {
		assert.strictEqual( JSON.stringify( _.filter(list, function (item) {
			return item.value < 3;
		}) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

	it('_.find callback with thisArg', function () {
		assert.strictEqual( JSON.stringify( _.filter(list, function (item) {
			return item.value < this;
		}, 3) ), '[{"foo":"foo","value":1,"common":1},{"foo":"bar","value":2,"common":1}]');
	});

});

describe('indexOf', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.indexOf value missing', function () {
		var o = { foo: 'bar' };

		assert.strictEqual( _.indexOf(list, o), -1);
	});

	it('_.indexOf value found', function () {
		var o = { foo: 'bar' };

		list.push(o);

		assert.strictEqual( _.indexOf(list, o), 3);
	});

	it('_.indexOf single value missing', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.strictEqual( _.indexOf(numList, 10), -1);
	});

	it('_.indexOf single value found first', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.strictEqual( _.indexOf(numList, 1), 0);
	});

	it('_.indexOf single value found last', function () {
		var numList = [1,2,3,4,5,6,7,8,9];

		assert.strictEqual( _.indexOf(numList, 9), 8);
	});

	it('_.indexOf callback missing', function () {
		assert.strictEqual( _.indexOf(list, function (item) {
			return item && item.foo === 'wrong-value';
		}), -1);
	});

	it('_.indexOf callback found', function () {
		assert.strictEqual( _.indexOf(list, function (item) {
			return item && item.foo === 'bar';
		}), 1);
	});

	it('_.indexOf callback with thisArg found', function () {
		assert.strictEqual( _.indexOf(list, function (item) {
			return item && item.foo === this.key;
		}, { key: 'bar' }), 1);
	});

});

describe('indexBy', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.indexBy string key', function () {
		assert.strictEqual( JSON.stringify(_.indexBy(list, 'foo')), '{"foo":{"foo":"foo"},"bar":{"foo":"bar"},"foobar":{"foo":"foobar"}}');
	});

	it('_.indexBy callback', function () {
		assert.strictEqual( JSON.stringify(_.indexBy(list, function (item) {
			return '_' + item.foo;
		})), '{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
	});

	it('_.indexBy callback with thisArg', function () {
		assert.strictEqual( JSON.stringify(_.indexBy(list, function (item) {
			return this + item.foo;
		}, '_')), '{"_foo":{"foo":"foo"},"_bar":{"foo":"bar"},"_foobar":{"foo":"foobar"}}');
	});

});

describe('_.some array', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.some (foo)', function () {
		assert( _.some(list, function (item) {
      return item.foo === 'foo';
    }) );
	});

  it('_.some (bar)', function () {
		assert( _.some(list, function (item) {
      return item.foo === 'bar';
    }) );
	});

  it('_.some (foobar)', function () {
		assert( _.some(list, function (item) {
      return item.foo === 'foobar';
    }) );
	});

  it('_.some (_OO_)', function () {
		assert( !_.some(list, function (item) {
      return item.foo === '_OO_';
    }) );
	});

});

describe('_.some object', function () {

	var o = {
    foo: 'foo',
    bar: 'foo',
    foobar: 'foobar'
  };

	it('_.some ===', function () {
		assert( _.some(o, function (value, key) {
      return value === key;
    }) );
	});

  it('_.some (foo)', function () {
		assert( _.some(o, function (value, key) {
      return value === 'foo';
    }) );
	});

  it('_.some (bar)', function () {
		assert( !_.some(o, function (value, key) {
      return value === 'bar';
    }) );
	});

});

describe('_.every array', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.every (key)', function () {
		assert( _.some(list, function (item) {
      return item.foo;
    }) );
	});

  it('_.some (bar)', function () {
		assert( !_.every(list, function (item) {
      return item.foo === 'bar';
    }) );
	});

  it('_.every (foobar)', function () {
		assert( !_.every(list, function (item) {
      return item.foo === 'foobar';
    }) );
	});

});

describe('_.every object', function () {

  var o = {
    foo: 'foo',
    bar: 'foo',
    foobar: 'foobar'
  };

	var o2 = {
    foo: 'foo',
    bar: 'bar',
    foobar: 'foobar'
  };

	it('_.every (^foo)', function () {
		assert( _.every(o, function (value, key) {
      return /^foo/.test(value);
    }) );
	});

  it('_.every (===)', function () {
		assert( _.every(o2, function (value, key) {
      return value === key;
    }) );
	});

  it('_.every (bar)', function () {
		assert( !_.every(o, function (value, key) {
      return value === 'foo';
    }) );
	});

});

describe('_.map array', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.map (length)', function () {
		assert.strictEqual( _.map(list, function (item) {
      return item.foo;
    }).length, 3 );
	});

  it('_.map (dots)', function () {
		assert.strictEqual( _.map(list, function (item) {
      return item.foo;
    }).join('.'), 'foo.bar.foobar' );
	});

});

describe('_.map object', function () {

  var o = {
    p1: 'foo',
    p2: 'bar',
    p3: 'foobar'
  };

  it('_.map (length)', function () {
		assert.strictEqual( Object.keys( _.map(o, function (value, key) {
      return key + '-' + value;
    }) ).length, 3 );
	});

	it('_.map (-)', function () {
		assert.strictEqual( JSON.stringify( _.map(o, function (value, key) {
      return key + '-' + value;
    }) ), '{"p1":"p1-foo","p2":"p2-bar","p3":"p3-foobar"}' );
	});

});

describe('_.map2List object', function () {

  var o = {
    p1: 'foo',
    p2: 'bar',
    p3: 'foobar'
  };

  it('_.map (length)', function () {
		assert.strictEqual( _.map2List(o, function (value, key) {
      return key + '-' + value;
    }).length, 3 );
	});

	it('_.map2List (-)', function () {
		assert.strictEqual( _.map2List(o, function (value, key) {
      return key + '-' + value;
    }).join(','), 'p1-foo,p2-bar,p3-foobar' );
	});

  it('_.map (length)', function () {
		assert.strictEqual( _.map2List(o, function (value, key) {
      return key + '-' + value;
    }).length, 3 );
	});

	it('_.map2List (key)', function () {
		assert.strictEqual( _.map2List(o, function (value, key) {
      return key;
    }).join(','), 'p1,p2,p3' );
	});

  it('_.map2List (value)', function () {
		assert.strictEqual( _.map2List(o, function (value, key) {
      return value;
    }).join(','), 'foo,bar,foobar' );
	});

});

describe('_.pluck', function () {

	var list = [{ foo: 'foo' }, { foo: 'bar' }, { foo: 'foobar' }];

	it('_.pluck', function () {
		assert.strictEqual( _.pluck(list, 'foo').toString(), 'foo,bar,foobar');
	});

	// _.pluck callback is an alias of map
	it('_.pluck callback', function () {
		assert.strictEqual( _.pluck(list, function (item) {
			return this + item.foo;
		}, '_').toString(), '_foo,_bar,_foobar');
	});

});
