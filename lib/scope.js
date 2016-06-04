'use strict';

var evalExpression = require('./eval');

var Scope = function (data) {
		if(!this) {
			return new Scope(data);
		}

    if( data instanceof Object ) {
        this.extend(data);
    }
};

Scope.prototype.new = function(data) {
    var S = function () {
        this.extend(data);
    };
    S.prototype = this;
    return new S(data);
};

Scope.prototype.extend = function(data) {
    for( var key in data ) {
        this[key] = data[key];
    }
    return this;
};

Scope.prototype.eval = function ( expression, thisArg ) {
    return evalExpression(expression)(this, thisArg);
};

module.exports = function (data) {
  var s = new Scope();
  if( data !== undefined ) {
    s.extend(data);
  }
  return s;
};
