'use strict';

module.exports = function (expression) {
    /* jshint ignore:start */
    return (new Function('model', 'try{ with(model) { return (' + expression + ') }; } catch(err) { return \'\'; }'));
    /* jshint ignore:end */
};
