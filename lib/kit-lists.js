
var _ = require('./kit-type');

function _eachInList( list, iteratee, thisArg ) {
    for( var i = 0, len = list.length; i < len ; i++ ) {
        iteratee.call(thisArg, list[i], i);
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

function some (list, iteratee, thisArg) {
  if( _.isArray(list) ) {
    return list.some(iteratee, thisArg);
  } else if( _.isObject(list) ) {
    for( var key in list )  {
      if( iteratee.call(thisArg, list[key], key) ) {
        return true;
      }
    }
    return false;
  }
};

function every (list, iteratee, thisArg) {
  if( _.isArray(list) ) {
    return list.every(iteratee, thisArg);
  } else if( _.isObject(list) ) {
    for( var key in list )  {
      if( !iteratee.call(thisArg, list[key], key) ) {
        return false;
      }
    }
    return true;
  }
};

function _map (list, iteratee, thisArg) {
  if( _.isArray(list) ) {
    return list.map(iteratee, thisArg);
  } else if( _.isObject(list) ) {
    var result = {};
    for( var key in list )  {
      result[key] = iteratee.call(thisArg, list[key], key);
    }
    return result;
  }
};

function map2List (list, iteratee, thisArg) {
  if( _.isArray(list) ) {
    return list.map(iteratee, thisArg);
  }
  var result = [], i = 0;
  for( var key in list )  {
    result[i++] = iteratee.call(thisArg, list[key], key);
  }
  return result;
};

function pluck (list, iteratee, thisArg) {
	if( _.isString(iteratee) ) {
		return list.map(function (item) { return item[iteratee]; }, thisArg);
	} else if( _.isFunction(iteratee) ) {
		return list.map(iteratee, thisArg);
	}
	return [];
}

function remove (list, iteratee, thisArg) {

    if( !_.isFunction(iteratee) ) {
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

function first (list, iteratee, thisArg) {
		thisArg = thisArg === undefined ? this : thisArg;
		iteratee = iterateeFn(iteratee);

		for( var i = 0, len = list.length ; i < len ; i++ ) {
        if( iteratee.call(thisArg, list[i]) ) {
            return list[i];
        }
    }
}

function last (list, iteratee, thisArg) {
		thisArg = thisArg === undefined ? this : thisArg;
		iteratee = iterateeFn(iteratee);

		for( var i = list.length - 1 ; i >= 0 ; i-- ) {
        if( iteratee.call(thisArg, list[i]) ) {
            return list[i];
        }
    }
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
  find: first,
  first: first,
  last: last,
  filter: filter,
  each: each,
  some: some,
  every: every,
  map: _map,
  map2List: map2List,
  indexOf: indexOf,
  indexBy: indexBy,
  pluck: pluck,
  remove: remove,
  if: function (result, fn) {
    if( result !== undefined && fn instanceof Function ) {
      return fn(result);
    }
  }
};
