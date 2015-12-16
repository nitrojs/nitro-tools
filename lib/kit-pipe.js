function _proccessPipe (pipe, args) {
    var result = pipe[0].apply(null, args);

    for( var i = 1, len = pipe.length; i < len; i++ ) {
        result = pipe[i](result);
    }

    return result;
}

function _addToPipe (pipe, args) {
    for( var i = 0, len = args.length; i < len; i++ ) {
        if( !_isFunction(args[i]) ) {
            throw 'only Functions are allowed as pipe arguments';
        } else {
            pipe.push(args[i]);
        }
    }
}

module.exports = {
  pipe: function () {
      var pipe = [];

      _addToPipe(pipe, arguments);

      var pipeFn = function () {
          return _proccessPipe(pipe, arguments);
      };

      pipeFn.pipe = function () {
          _addToPipe(pipe, arguments);
          return pipeFn;
      };

      return pipeFn;
  }
};
