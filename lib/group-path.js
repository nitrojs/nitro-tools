
function _joinPath () {
    var path = (arguments[0] || '').replace(/\/$/, '');

    for( var i = 1, len = arguments.length - 1 ; i < len ; i++ ) {
        path += '/' + arguments[i].replace(/^\/|\/$/, '');
    }
    if( len ) {
        path += arguments[len] ? ( '/' + arguments[len].replace(/^\//, '') ) : '';
    }

    return path;
}

module.exports = {
  joinPath: _joinPath
};
