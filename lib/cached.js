
function _noop (value) {
  return value;
}

function cachedFn () {
  if( this.firstTime || arguments.length ) {
    this.firstTime = false;
    this.data = this.fn.apply(this.arg || this, arguments);
  }
  return this.data;
}

function _cached(_fn, cacheAnyway, thisArg) {

  var fn = _fn === undefined ? _noop : ( _fn instanceof Function ? _fn : function () { return _fn; } ),
      cached = { firstTime: true, arg: thisArg, fn: fn };

  _cached.flush.listeners.push(function () {
    cached.data = undefined;
  });

  return cachedFn.bind(cached);
}

_cached.flush = function () {
  _cached.flush.listeners.forEach(function (listener) {
    listener();
  });
};

_cached.flush.listeners = [];

module.exports = _cached;
