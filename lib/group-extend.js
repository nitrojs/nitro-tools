
var RE_$$ = /^\$\$/,
    arrayShift = [].shift,
    _ = require('./group-type');

function _merge () {
    var dest = arrayShift.call(arguments),
        src = arrayShift.call(arguments),
        key;

    while( src ) {

        if( typeof dest !== typeof src ) {
            dest = _.isArray(src) ? [] : ( _.isObject(src) ? {} : src );
        }

        if( _.isObject(src) ) {

            for( key in src ) {
                if( src[key] !== undefined ) {
                    if( typeof dest[key] !== typeof src[key] ) {
                        dest[key] = _merge(undefined, src[key]);
                    } else if( _.isArray(dest[key]) ) {
                        [].push.apply(dest[key], src[key]);
                    } else if( _.isObject(dest[key]) ) {
                        dest[key] = _merge(dest[key], src[key]);
                    } else {
                        dest[key] = src[key];
                    }
                }
            }
        }
        src = arrayShift.call(arguments);
    }

    return dest;
}

module.exports = {
  extend: require('./extend'),
  merge: _merge,
  copy: function (o) {
      return _merge(undefined, o);
  }
};
