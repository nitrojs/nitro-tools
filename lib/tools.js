/*
 * nitro-tools
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Jesús Manuel Germade Castiñeiras <jesus@germade.es>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

'use strict';

var extend = require('./extend');

function Chain (value) {
    this.value = value;
}

function _ (value) {
    return new Chain(value);
}

extend(_,
  require('./group-type'),
  require('./group-key'),
  require('./group-extend'),
  require('./group-lists'),
  require('./group-path'),
  // require('./group-pipe'),
  {
    eval: require('./eval'),
    scope: require('./scope')
  }
);

_.each(['key', 'keys', 'each', 'filter', 'find', 'indexOf', 'indexBy', 'pluck', 'remove', 'extend', 'merge', 'copy'], function (nameFn) {
    Chain.prototype[nameFn] = function () {
        [].unshift.call(arguments, this.value);
        _[nameFn].apply(this, arguments);
				return this;
    };
});

module.exports = _;
