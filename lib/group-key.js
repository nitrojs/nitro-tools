
var _ = require('./group-type');

function _key (o, fullKey, value){
    if( !_.isObject(o) ) {
			return false;
		}
    var oKey, keys = fullKey.split('.');
    if(value !== undefined) {
        if(keys.length) {
            oKey = keys.shift();
            var nextKey = keys.shift();
            while( nextKey ) {
                if( !o[oKey] ) {
									o[oKey] = {};
								}
                o = o[oKey];
                oKey = nextKey;
                nextKey = keys.shift();
            }
            o[oKey] = value;
            return value;
        }
        return false;
    } else {
        for(var k = 0, len = keys.length, inKeys = o || {}; k < len ; k++ ) {
            oKey = keys[k];
            if( oKey in inKeys ) {
							inKeys = inKeys[keys[k]] || {};
						} else {
							return false;
						}
        }
        return inKeys;
    }
}

module.exports = {
  key: _key,
  keys: Object.keys
};
