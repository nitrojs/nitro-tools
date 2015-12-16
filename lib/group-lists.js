
var _ = require('./group-type');

function _eachInList( list, iteratee, thisArg ) {
    for( var i = 0, len = list.length; i < len ; i++ ) {
        iteratee.apply(thisArg, [ list[i], i ]);
    }
}

function _eachInObject( o, iteratee, thisArg ) {
    for( var key in o ) {
        iteratee.call(thisArg, [o[key], key]);
    }
}

function each (o, iteratee, thisArg) {
  if( _.isArray(o) ) {
      _eachInList(o, iteratee, thisArg || this);
  } else if( _.isObject(o) ) {
      _eachInObject(o, iteratee, thisArg || this);
  }
}

function indexOf (list, iteratee, thisArg) {
	if( _.isFunction(iteratee) ) {
    for( var i = 0, len = list.length; i < len; i++ ) {
        if( iteratee.call(thisArg, list[i]) ) {
            return i;
        }
    }
		return -1;
  }
	return list.indexOf(iteratee);
}

function _indexBy (list, iteratee, thisArg) {
	var map = {};
	for( var i = 0, len = list.length; i < len; i++ ) {
      map[iteratee.call(thisArg, list[i])] = list[i];
  }
  return map;
}

function indexBy (list, iteratee, thisArg) {
	if( _.isString(iteratee) ) {
		return _indexBy(list, function (item) { return item[iteratee]; }, thisArg);
	} else if( _.isFunction(iteratee) ) {
		return _indexBy(list, iteratee, thisArg);
	}
	return {};
}

function pluck (list, iteratee, thisArg) {
	if( _.isString(iteratee) ) {
		return list.map(function (item) { return item[iteratee]; }, thisArg);
	} else if( _.isFunction(iteratee) ) {
		return list.map(iteratee, thisArg);
	}
	return [];
}

function remove (list, iteratee, thisArg) {

    if( _.isFunction(iteratee) ) {
			return remove(list, function (item) { return item === iteratee; }, thisArg);
		}

		thisArg = thisArg === undefined ? this : thisArg;

		for( var i = 0, len = list.length; i < len; i++ ) {
				if( iteratee.call(thisArg, list[i]) ) {
						list.splice(i, 1);
						i--;
				}
		}
}

function matchAll (o, filters) {
    for( var key in filters ) {
        if( o[key] !== filters[key] ) {
            return false;
        }
    }
    return true;
}

function matchAny (o, filters) {
    for( var key in filters ) {
        if( o[key] === filters[key] ) {
            return true;
        }
    }
    return false;
}

function iterateeFn (iteratee) {
	if( _.isFunction(iteratee) ) {
		return iteratee;
	}

	if( _.isObject(iteratee) ) {
		return function (item) {
			return matchAll(item, iteratee);
		};
	}

	return function (item) {
		return item === iteratee;
	};
}

function find (list, iteratee, thisArg) {
		thisArg = thisArg === undefined ? this : thisArg;
		iteratee = iterateeFn(iteratee);

		for( var i = 0, len = list.length ; i < len ; i++ ) {
        if( iteratee.call(thisArg, list[i]) ) {
            return list[i];
        }
    }
		return null;
}

function filter (list, iteratee, thisArg) {
    var newList = [];

		thisArg = thisArg === undefined ? this : thisArg;
		iteratee = iterateeFn(iteratee);

		for( var i = 0, len = list.length ; i < len ; i++ ) {
        if( iteratee.call(thisArg, list[i]) ) {
            newList.push(list[i]);
        }
    }

    return newList;
}

module.exports = {
  matchAll: matchAll,
  matchAny: matchAny,
  find: find,
  filter: filter,
  each: each,
  indexOf: indexOf,
  indexBy: indexBy,
  pluck: pluck,
  remove: remove
};
