

describe('object type', function () {
  'use strict';

  var assert = require('assert'),
      _ = require('../lib/kit-type'),
      isBrowser = typeof window !== 'undefined';

  it('tools (_) factory should be defined', function () {

    assert( _ !== undefined );

  });

  it('isString', function () {

    assert( _.isString('foobar') === true );
    assert( _.isString(42) === false );

  });

  it('isObject', function () {

    assert( _.isObject({}) === true );
    assert( _.isObject(42) === false );
    assert( _.isObject('foobar') === false );
    assert( _.isObject([1,2,3,4,5,6]) === true ); // take this in mind

  });

  it('isArray', function () {

    assert( _.isArray([1,2,3,4,5,6]) === true );
    assert( _.isArray({}) === false );
    assert( _.isArray(42) === false );

  });

  it('isDate', function () {

    assert( _.isDate(new Date()) === true );
    assert( _.isDate([1,2,3,4,5,6]) === false );
    assert( _.isDate({}) === false );
    assert( _.isDate(42) === false );

  });

  it('isRegExp', function () {

    assert( _.isRegExp(/foobar/) === true );
    assert( _.isRegExp('foobar') === false );
    assert( _.isRegExp([1,2,3,4,5,6]) === false );
    assert( _.isRegExp({}) === false );
    assert( _.isRegExp(42) === false );

  });

  it('isRegExp', function () {

    assert( _.isFunction(function () {}) === true );
    assert( _.isFunction(/foobar/) === false );
    assert( _.isFunction('foobar') === false );
    assert( _.isFunction([1,2,3,4,5,6]) === false );
    assert( _.isFunction({}) === false );
    assert( _.isFunction(42) === false );

  });

  it('isUndefined', function () {

    assert( _.isUndefined(undefined) === true );
    assert( _.isUndefined(function () {}) === false );
    assert( _.isUndefined(/foobar/) === false );
    assert( _.isUndefined('foobar') === false );
    assert( _.isUndefined([1,2,3,4,5,6]) === false );
    assert( _.isUndefined({}) === false );
    assert( _.isUndefined(42) === false );

  });

  if( isBrowser ) {
    it('isElement', function () {

      assert( _.isElement(document.createElement('div')) === true );
      assert( _.isElement(undefined) === false );
      assert( _.isElement(function () {}) === false );
      assert( _.isElement(/foobar/) === false );
      assert( _.isElement('foobar') === false );
      assert( _.isElement([1,2,3,4,5,6]) === false );
      assert( _.isElement({}) === false );
      assert( _.isElement(42) === false );

    });
  }

});
