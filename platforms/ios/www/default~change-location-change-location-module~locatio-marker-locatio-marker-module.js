(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~change-location-change-location-module~locatio-marker-locatio-marker-module"],{

/***/ "./node_modules/@mapbox/fusspot/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@mapbox/fusspot/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Validators are functions which assert certain type.
 * They can return a string which can then be used
 * to display a helpful error message.
 * They can also return a function for a custom error message.
 */
var isPlainObject = __webpack_require__(/*! is-plain-obj */ "./node_modules/is-plain-obj/index.js");
var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");

var DEFAULT_ERROR_PATH = 'value';
var NEWLINE_INDENT = '\n  ';

var v = {};

/**
 * Runners
 *
 * Take root validators and run assertion
 */
v.assert = function(rootValidator, options) {
  options = options || {};
  return function(value) {
    var message = validate(rootValidator, value);
    // all good
    if (!message) {
      return;
    }

    var errorMessage = processMessage(message, options);

    if (options.apiName) {
      errorMessage = options.apiName + ': ' + errorMessage;
    }

    throw new Error(errorMessage);
  };
};

/**
 * Higher Order Validators
 *
 * validators which take other validators as input
 * and output a new validator
 */
v.shape = function shape(validatorObj) {
  var validators = objectEntries(validatorObj);
  return function shapeValidator(value) {
    var validationResult = validate(v.plainObject, value);

    if (validationResult) {
      return validationResult;
    }

    var key, validator;
    var errorMessages = [];

    for (var i = 0; i < validators.length; i++) {
      key = validators[i].key;
      validator = validators[i].value;
      validationResult = validate(validator, value[key]);

      if (validationResult) {
        // return [key].concat(validationResult);
        errorMessages.push([key].concat(validationResult));
      }
    }

    if (errorMessages.length < 2) {
      return errorMessages[0];
    }

    // enumerate all the error messages
    return function(options) {
      errorMessages = errorMessages.map(function(message) {
        var key = message[0];
        var renderedMessage = processMessage(message, options)
          .split('\n')
          .join(NEWLINE_INDENT); // indents any inner nesting
        return '- ' + key + ': ' + renderedMessage;
      });

      var objectId = options.path.join('.');
      var ofPhrase = objectId === DEFAULT_ERROR_PATH ? '' : ' of ' + objectId;

      return (
        'The following properties' +
        ofPhrase +
        ' have invalid values:' +
        NEWLINE_INDENT +
        errorMessages.join(NEWLINE_INDENT)
      );
    };
  };
};

v.strictShape = function strictShape(validatorObj) {
  var shapeValidator = v.shape(validatorObj);
  return function strictShapeValidator(value) {
    var shapeResult = shapeValidator(value);
    if (shapeResult) {
      return shapeResult;
    }

    var invalidKeys = Object.keys(value).reduce(function(memo, valueKey) {
      if (validatorObj[valueKey] === undefined) {
        memo.push(valueKey);
      }
      return memo;
    }, []);

    if (invalidKeys.length !== 0) {
      return function() {
        return 'The following keys are invalid: ' + invalidKeys.join(', ');
      };
    }
  };
};

v.arrayOf = function arrayOf(validator) {
  return createArrayValidator(validator);
};

v.tuple = function tuple() {
  var validators = Array.isArray(arguments[0])
    ? arguments[0]
    : Array.prototype.slice.call(arguments);
  return createArrayValidator(validators);
};

// Currently array validation fails when the first invalid item is found.
function createArrayValidator(validators) {
  var validatingTuple = Array.isArray(validators);
  var getValidator = function(index) {
    if (validatingTuple) {
      return validators[index];
    }
    return validators;
  };

  return function arrayValidator(value) {
    var validationResult = validate(v.plainArray, value);
    if (validationResult) {
      return validationResult;
    }

    if (validatingTuple && value.length !== validators.length) {
      return 'an array with ' + validators.length + ' items';
    }

    for (var i = 0; i < value.length; i++) {
      validationResult = validate(getValidator(i), value[i]);
      if (validationResult) {
        return [i].concat(validationResult);
      }
    }
  };
}

v.required = function required(validator) {
  function requiredValidator(value) {
    if (value == null) {
      return function(options) {
        return formatErrorMessage(
          options,
          isArrayCulprit(options.path)
            ? 'cannot be undefined/null.'
            : 'is required.'
        );
      };
    }
    return validator.apply(this, arguments);
  }
  requiredValidator.__required = true;

  return requiredValidator;
};

v.oneOfType = function oneOfType() {
  var validators = Array.isArray(arguments[0])
    ? arguments[0]
    : Array.prototype.slice.call(arguments);
  return function oneOfTypeValidator(value) {
    var messages = validators
      .map(function(validator) {
        return validate(validator, value);
      })
      .filter(Boolean);

    // If we don't have as many messages as no. of validators,
    // then at least one validator was ok with the value.
    if (messages.length !== validators.length) {
      return;
    }

    // check primitive type
    if (
      messages.every(function(message) {
        return message.length === 1 && typeof message[0] === 'string';
      })
    ) {
      return orList(
        messages.map(function(m) {
          return m[0];
        })
      );
    }

    // Complex oneOfTypes like
    // `v.oneOftypes(v.shape({name: v.string})`, `v.shape({name: v.number}))`
    // are complex ¯\_(ツ)_/¯. For the current scope only returning the longest message.
    return messages.reduce(function(max, arr) {
      return arr.length > max.length ? arr : max;
    });
  };
};

/**
 * Meta Validators
 * which take options as argument (not validators)
 * and return a new primitive validator
 */
v.equal = function equal(compareWith) {
  return function equalValidator(value) {
    if (value !== compareWith) {
      return JSON.stringify(compareWith);
    }
  };
};

v.oneOf = function oneOf() {
  var options = Array.isArray(arguments[0])
    ? arguments[0]
    : Array.prototype.slice.call(arguments);
  var validators = options.map(function(value) {
    return v.equal(value);
  });

  return v.oneOfType.apply(this, validators);
};

v.range = function range(compareWith) {
  var min = compareWith[0];
  var max = compareWith[1];
  return function rangeValidator(value) {
    var validationResult = validate(v.number, value);

    if (validationResult || value < min || value > max) {
      return 'number between ' + min + ' & ' + max + ' (inclusive)';
    }
  };
};

/**
 * Primitive validators
 *
 * simple validators which return a string or undefined
 */
v.any = function any() {
  return;
};

v.boolean = function boolean(value) {
  if (typeof value !== 'boolean') {
    return 'boolean';
  }
};

v.number = function number(value) {
  if (typeof value !== 'number') {
    return 'number';
  }
};

v.plainArray = function plainArray(value) {
  if (!Array.isArray(value)) {
    return 'array';
  }
};

v.plainObject = function plainObject(value) {
  if (!isPlainObject(value)) {
    return 'object';
  }
};

v.string = function string(value) {
  if (typeof value !== 'string') {
    return 'string';
  }
};

v.func = function func(value) {
  if (typeof value !== 'function') {
    return 'function';
  }
};

function validate(validator, value) {
  // assertions are optional by default unless wrapped in v.require
  if (value == null && !validator.hasOwnProperty('__required')) {
    return;
  }

  var result = validator(value);

  if (result) {
    return Array.isArray(result) ? result : [result];
  }
}

function processMessage(message, options) {
  // message array follows the convention
  // [...path, result]
  // path is an array of object keys / array indices
  // result is output of the validator
  var len = message.length;

  var result = message[len - 1];
  var path = message.slice(0, len - 1);

  if (path.length === 0) {
    path = [DEFAULT_ERROR_PATH];
  }
  options = xtend(options, { path: path });

  return typeof result === 'function'
    ? result(options) // allows customization of result
    : formatErrorMessage(options, prettifyResult(result));
}

function orList(list) {
  if (list.length < 2) {
    return list[0];
  }
  if (list.length === 2) {
    return list.join(' or ');
  }
  return list.slice(0, -1).join(', ') + ', or ' + list.slice(-1);
}

function prettifyResult(result) {
  return 'must be ' + addArticle(result) + '.';
}

function addArticle(nounPhrase) {
  if (/^an? /.test(nounPhrase)) {
    return nounPhrase;
  }
  if (/^[aeiou]/i.test(nounPhrase)) {
    return 'an ' + nounPhrase;
  }
  if (/^[a-z]/i.test(nounPhrase)) {
    return 'a ' + nounPhrase;
  }
  return nounPhrase;
}

function formatErrorMessage(options, prettyResult) {
  var arrayCulprit = isArrayCulprit(options.path);
  var output = options.path.join('.') + ' ' + prettyResult;
  var prepend = arrayCulprit ? 'Item at position ' : '';

  return prepend + output;
}

function isArrayCulprit(path) {
  return typeof path[path.length - 1] == 'number' || typeof path[0] == 'number';
}

function objectEntries(obj) {
  return Object.keys(obj || {}).map(function(key) {
    return { key: key, value: obj[key] };
  });
}

v.validate = validate;
v.processMessage = processMessage;

module.exports = v;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var require;var require;(function(f){if(true){module.exports=f()}else { var g; }})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return require(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';
var isObj = require('is-obj');
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Sources cannot be null or undefined');
	}

	return Object(val);
}

function assignKey(to, from, key) {
	var val = from[key];

	if (val === undefined || val === null) {
		return;
	}

	if (hasOwnProperty.call(to, key)) {
		if (to[key] === undefined || to[key] === null) {
			throw new TypeError('Cannot convert undefined or null to object (' + key + ')');
		}
	}

	if (!hasOwnProperty.call(to, key) || !isObj(val)) {
		to[key] = val;
	} else {
		to[key] = assign(Object(to[key]), from[key]);
	}
}

function assign(to, from) {
	if (to === from) {
		return to;
	}

	from = Object(from);

	for (var key in from) {
		if (hasOwnProperty.call(from, key)) {
			assignKey(to, from, key);
		}
	}

	if (Object.getOwnPropertySymbols) {
		var symbols = Object.getOwnPropertySymbols(from);

		for (var i = 0; i < symbols.length; i++) {
			if (propIsEnumerable.call(from, symbols[i])) {
				assignKey(to, from, symbols[i]);
			}
		}
	}

	return to;
}

module.exports = function deepAssign(target) {
	target = toObject(target);

	for (var s = 1; s < arguments.length; s++) {
		assign(target, arguments[s]);
	}

	return target;
};

},{"is-obj":4}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],3:[function(require,module,exports){
/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

var root = this;

var fuzzy = {};

// Use in node or in browser
if (typeof exports !== 'undefined') {
  module.exports = fuzzy;
} else {
  root.fuzzy = fuzzy;
}

// Return all elements of `array` that have a fuzzy
// match against `pattern`.
fuzzy.simpleFilter = function(pattern, array) {
  return array.filter(function(str) {
    return fuzzy.test(pattern, str);
  });
};

// Does `pattern` fuzzy match `str`?
fuzzy.test = function(pattern, str) {
  return fuzzy.match(pattern, str) !== null;
};

// If `pattern` matches `str`, wrap each matching character
// in `opts.pre` and `opts.post`. If no match, return null
fuzzy.match = function(pattern, str, opts) {
  opts = opts || {};
  var patternIdx = 0
    , result = []
    , len = str.length
    , totalScore = 0
    , currScore = 0
    // prefix
    , pre = opts.pre || ''
    // suffix
    , post = opts.post || ''
    // String to compare against. This might be a lowercase version of the
    // raw string
    , compareString =  opts.caseSensitive && str || str.toLowerCase()
    , ch;

  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for(var idx = 0; idx < len; idx++) {
    ch = str[idx];
    if(compareString[idx] === pattern[patternIdx]) {
      ch = pre + ch + post;
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if(patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    totalScore = (compareString === pattern) ? Infinity : totalScore;
    return {rendered: result.join(''), score: totalScore};
  }

  return null;
};

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
//
//     [{
//         string:   '<b>lah' // The rendered string
//       , index:    2        // The index of the element in `arr`
//       , original: 'blah'   // The original element in `arr`
//     }]
//
// `opts` is an optional argument bag. Details:
//
//    opts = {
//        // string to put before a matching character
//        pre:     '<b>'
//
//        // string to put after matching character
//      , post:    '</b>'
//
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  if(!arr || arr.length === 0) {
    return [];
  }
  if (typeof pattern !== 'string') {
    return arr;
  }
  opts = opts || {};
  return arr
    .reduce(function(prev, element, idx, arr) {
      var str = element;
      if(opts.extract) {
        str = opts.extract(element);
      }
      var rendered = fuzzy.match(pattern, str, opts);
      if(rendered != null) {
        prev[prev.length] = {
            string: rendered.rendered
          , score: rendered.score
          , index: idx
          , original: element
        };
      }
      return prev;
    }, [])

    // Sort by score. Browsers are inconsistent wrt stable/unstable
    // sorting, so force stable by using the index in the case of tie.
    // See http://ofb.net/~sethml/is-sort-stable.html
    .sort(function(a,b) {
      var compare = b.score - a.score;
      if(compare) return compare;
      return a.index - b.index;
    });
};


}());


},{}],4:[function(require,module,exports){
'use strict';
module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};

},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to match template delimiters. */
var reInterpolate = /<%=([\s\S]+?)%>/g;

module.exports = reInterpolate;

},{}],6:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var reInterpolate = require('lodash._reinterpolate'),
    templateSettings = require('lodash.templatesettings');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match empty string literals in compiled template source. */
var reEmptyStringLeading = /\b__p \+= '';/g,
    reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
    reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

/**
 * Used to match
 * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
 */
var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to ensure capturing order of template delimiters. */
var reNoMatch = /($^)/;

/** Used to match unescaped characters in compiled string literals. */
var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

/** Used to escape characters for inclusion in compiled string literals. */
var stringEscapes = {
  '\\': '\\',
  "'": "'",
  '\n': 'n',
  '\r': 'r',
  '\u2028': 'u2028',
  '\u2029': 'u2029'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}

/**
 * Used by `_.template` to escape characters for inclusion in compiled string literals.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeStringChar(chr) {
  return '\\' + stringEscapes[chr];
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  return (objectToString.call(value) == errorTag) ||
    (typeof value.message == 'string' && typeof value.name == 'string');
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * Creates a compiled template function that can interpolate data properties
 * in "interpolate" delimiters, HTML-escape interpolated data properties in
 * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
 * properties may be accessed as free variables in the template. If a setting
 * object is given, it takes precedence over `_.templateSettings` values.
 *
 * **Note:** In the development build `_.template` utilizes
 * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
 * for easier debugging.
 *
 * For more information on precompiling templates see
 * [lodash's custom builds documentation](https://lodash.com/custom-builds).
 *
 * For more information on Chrome extension sandboxes see
 * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The template string.
 * @param {Object} [options={}] The options object.
 * @param {RegExp} [options.escape=_.templateSettings.escape]
 *  The HTML "escape" delimiter.
 * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
 *  The "evaluate" delimiter.
 * @param {Object} [options.imports=_.templateSettings.imports]
 *  An object to import into the template as free variables.
 * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
 *  The "interpolate" delimiter.
 * @param {string} [options.sourceURL='templateSources[n]']
 *  The sourceURL of the compiled template.
 * @param {string} [options.variable='obj']
 *  The data object variable name.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Function} Returns the compiled template function.
 * @example
 *
 * // Use the "interpolate" delimiter to create a compiled template.
 * var compiled = _.template('hello <%= user %>!');
 * compiled({ 'user': 'fred' });
 * // => 'hello fred!'
 *
 * // Use the HTML "escape" delimiter to escape data property values.
 * var compiled = _.template('<b><%- value %></b>');
 * compiled({ 'value': '<script>' });
 * // => '<b>&lt;script&gt;</b>'
 *
 * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
 * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the internal `print` function in "evaluate" delimiters.
 * var compiled = _.template('<% print("hello " + user); %>!');
 * compiled({ 'user': 'barney' });
 * // => 'hello barney!'
 *
 * // Use the ES delimiter as an alternative to the default "interpolate" delimiter.
 * var compiled = _.template('hello ${ user }!');
 * compiled({ 'user': 'pebbles' });
 * // => 'hello pebbles!'
 *
 * // Use backslashes to treat delimiters as plain text.
 * var compiled = _.template('<%= "\\<%- value %\\>" %>');
 * compiled({ 'value': 'ignored' });
 * // => '<%- value %>'
 *
 * // Use the `imports` option to import `jQuery` as `jq`.
 * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
 * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
 * compiled({ 'users': ['fred', 'barney'] });
 * // => '<li>fred</li><li>barney</li>'
 *
 * // Use the `sourceURL` option to specify a custom sourceURL for the template.
 * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
 * compiled(data);
 * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
 *
 * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
 * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
 * compiled.source;
 * // => function(data) {
 * //   var __t, __p = '';
 * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
 * //   return __p;
 * // }
 *
 * // Use custom template delimiters.
 * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
 * var compiled = _.template('hello {{ user }}!');
 * compiled({ 'user': 'mustache' });
 * // => 'hello mustache!'
 *
 * // Use the `source` property to inline compiled templates for meaningful
 * // line numbers in error messages and stack traces.
 * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
 *   var JST = {\
 *     "main": ' + _.template(mainText).source + '\
 *   };\
 * ');
 */
function template(string, options, guard) {
  // Based on John Resig's `tmpl` implementation
  // (http://ejohn.org/blog/javascript-micro-templating/)
  // and Laura Doktorova's doT.js (https://github.com/olado/doT).
  var settings = templateSettings.imports._.templateSettings || templateSettings;

  if (guard && isIterateeCall(string, options, guard)) {
    options = undefined;
  }
  string = toString(string);
  options = assignInWith({}, options, settings, assignInDefaults);

  var imports = assignInWith({}, options.imports, settings.imports, assignInDefaults),
      importsKeys = keys(imports),
      importsValues = baseValues(imports, importsKeys);

  var isEscaping,
      isEvaluating,
      index = 0,
      interpolate = options.interpolate || reNoMatch,
      source = "__p += '";

  // Compile the regexp to match each delimiter.
  var reDelimiters = RegExp(
    (options.escape || reNoMatch).source + '|' +
    interpolate.source + '|' +
    (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
    (options.evaluate || reNoMatch).source + '|$'
  , 'g');

  // Use a sourceURL for easier debugging.
  var sourceURL = 'sourceURL' in options ? '//# sourceURL=' + options.sourceURL + '\n' : '';

  string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
    interpolateValue || (interpolateValue = esTemplateValue);

    // Escape characters that can't be included in string literals.
    source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

    // Replace delimiters with snippets.
    if (escapeValue) {
      isEscaping = true;
      source += "' +\n__e(" + escapeValue + ") +\n'";
    }
    if (evaluateValue) {
      isEvaluating = true;
      source += "';\n" + evaluateValue + ";\n__p += '";
    }
    if (interpolateValue) {
      source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
    }
    index = offset + match.length;

    // The JS engine embedded in Adobe products needs `match` returned in
    // order to produce the correct `offset` value.
    return match;
  });

  source += "';\n";

  // If `variable` is not specified wrap a with-statement around the generated
  // code to add the data object to the top of the scope chain.
  var variable = options.variable;
  if (!variable) {
    source = 'with (obj) {\n' + source + '\n}\n';
  }
  // Cleanup code by stripping empty strings.
  source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
    .replace(reEmptyStringMiddle, '$1')
    .replace(reEmptyStringTrailing, '$1;');

  // Frame code as the function body.
  source = 'function(' + (variable || 'obj') + ') {\n' +
    (variable
      ? ''
      : 'obj || (obj = {});\n'
    ) +
    "var __t, __p = ''" +
    (isEscaping
       ? ', __e = _.escape'
       : ''
    ) +
    (isEvaluating
      ? ', __j = Array.prototype.join;\n' +
        "function print() { __p += __j.call(arguments, '') }\n"
      : ';\n'
    ) +
    source +
    'return __p\n}';

  var result = attempt(function() {
    return Function(importsKeys, sourceURL + 'return ' + source)
      .apply(undefined, importsValues);
  });

  // Provide the compiled function's source by its `toString` method or
  // the `source` property as a convenience for inlining compiled templates.
  result.source = source;
  if (isError(result)) {
    throw result;
  }
  return result;
}

/**
 * Attempts to invoke `func`, returning either the result or the caught error
 * object. Any additional arguments are provided to `func` when it's invoked.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Util
 * @param {Function} func The function to attempt.
 * @param {...*} [args] The arguments to invoke `func` with.
 * @returns {*} Returns the `func` result or error object.
 * @example
 *
 * // Avoid throwing errors for invalid selectors.
 * var elements = _.attempt(function(selector) {
 *   return document.querySelectorAll(selector);
 * }, '>_>');
 *
 * if (_.isError(elements)) {
 *   elements = [];
 * }
 */
var attempt = baseRest(function(func, args) {
  try {
    return apply(func, undefined, args);
  } catch (e) {
    return isError(e) ? e : new Error(e);
  }
});

module.exports = template;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash._reinterpolate":5,"lodash.templatesettings":9}],9:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var reInterpolate = require('lodash._reinterpolate');

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match HTML entities and HTML characters. */
var reUnescapedHtml = /[&<>"'`]/g,
    reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

/** Used to match template delimiters. */
var reEscape = /<%-([\s\S]+?)%>/g,
    reEvaluate = /<%([\s\S]+?)%>/g;

/** Used to map characters to HTML entities. */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#96;'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} chr The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
var escapeHtmlChar = basePropertyOf(htmlEscapes);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * By default, the template delimiters used by lodash are like those in
 * embedded Ruby (ERB). Change the following template settings to use
 * alternative delimiters.
 *
 * @static
 * @memberOf _
 * @type {Object}
 */
var templateSettings = {

  /**
   * Used to detect `data` property values to be HTML-escaped.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'escape': reEscape,

  /**
   * Used to detect code to be evaluated.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'evaluate': reEvaluate,

  /**
   * Used to detect `data` property values to inject.
   *
   * @memberOf _.templateSettings
   * @type {RegExp}
   */
  'interpolate': reInterpolate,

  /**
   * Used to reference the data object in the template text.
   *
   * @memberOf _.templateSettings
   * @type {string}
   */
  'variable': '',

  /**
   * Used to import variables into the compiled template.
   *
   * @memberOf _.templateSettings
   * @type {Object}
   */
  'imports': {

    /**
     * A reference to the `lodash` function.
     *
     * @memberOf _.templateSettings.imports
     * @type {Function}
     */
    '_': { 'escape': escape }
  }
};

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts the characters "&", "<", ">", '"', "'", and "\`" in `string` to
 * their corresponding HTML entities.
 *
 * **Note:** No other characters are escaped. To escape additional
 * characters use a third-party library like [_he_](https://mths.be/he).
 *
 * Though the ">" character is escaped for symmetry, characters like
 * ">" and "/" don't need escaping in HTML and have no special meaning
 * unless they're part of a tag or unquoted attribute value. See
 * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
 * (under "semi-related fun fact") for more details.
 *
 * Backticks are escaped because in IE < 9, they can break out of
 * attribute values or HTML comments. See [#59](https://html5sec.org/#59),
 * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
 * [#133](https://html5sec.org/#133) of the
 * [HTML5 Security Cheatsheet](https://html5sec.org/) for more details.
 *
 * When working with HTML you should always
 * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
 * XSS vectors.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('fred, barney, & pebbles');
 * // => 'fred, barney, &amp; pebbles'
 */
function escape(string) {
  string = toString(string);
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;
}

module.exports = templateSettings;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash._reinterpolate":5}],10:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":17}],11:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":10,"./_getRawTag":14,"./_objectToString":15}],12:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":16}],14:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":10}],15:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],16:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],17:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":12}],18:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],19:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":11,"./_getPrototype":13,"./isObjectLike":18}],20:[function(require,module,exports){
'use strict';

/**
 * Based off of [the offical Google document](https://developers.google.com/maps/documentation/utilities/polylinealgorithm)
 *
 * Some parts from [this implementation](http://facstaff.unca.edu/mcmcclur/GoogleMaps/EncodePolyline/PolylineEncoder.js)
 * by [Mark McClure](http://facstaff.unca.edu/mcmcclur/)
 *
 * @module polyline
 */

var polyline = {};

function encode(coordinate, factor) {
    coordinate = Math.round(coordinate * factor);
    coordinate <<= 1;
    if (coordinate < 0) {
        coordinate = ~coordinate;
    }
    var output = '';
    while (coordinate >= 0x20) {
        output += String.fromCharCode((0x20 | (coordinate & 0x1f)) + 63);
        coordinate >>= 5;
    }
    output += String.fromCharCode(coordinate + 63);
    return output;
}

/**
 * Decodes to a [latitude, longitude] coordinates array.
 *
 * This is adapted from the implementation in Project-OSRM.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Array}
 *
 * @see https://github.com/Project-OSRM/osrm-frontend/blob/master/WebContent/routing/OSRM.RoutingGeometry.js
 */
polyline.decode = function(str, precision) {
    var index = 0,
        lat = 0,
        lng = 0,
        coordinates = [],
        shift = 0,
        result = 0,
        byte = null,
        latitude_change,
        longitude_change,
        factor = Math.pow(10, precision || 5);

    // Coordinates have variable length when encoded, so just keep
    // track of whether we've hit the end of the string. In each
    // loop iteration, a single coordinate is decoded.
    while (index < str.length) {

        // Reset shift, result, and byte
        byte = null;
        shift = 0;
        result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        latitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        shift = result = 0;

        do {
            byte = str.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        longitude_change = ((result & 1) ? ~(result >> 1) : (result >> 1));

        lat += latitude_change;
        lng += longitude_change;

        coordinates.push([lat / factor, lng / factor]);
    }

    return coordinates;
};

/**
 * Encodes the given [latitude, longitude] coordinates array.
 *
 * @param {Array.<Array.<Number>>} coordinates
 * @param {Number} precision
 * @returns {String}
 */
polyline.encode = function(coordinates, precision) {
    if (!coordinates.length) { return ''; }

    var factor = Math.pow(10, precision || 5),
        output = encode(coordinates[0][0], factor) + encode(coordinates[0][1], factor);

    for (var i = 1; i < coordinates.length; i++) {
        var a = coordinates[i], b = coordinates[i - 1];
        output += encode(a[0] - b[0], factor);
        output += encode(a[1] - b[1], factor);
    }

    return output;
};

function flipped(coords) {
    var flipped = [];
    for (var i = 0; i < coords.length; i++) {
        flipped.push(coords[i].slice().reverse());
    }
    return flipped;
}

/**
 * Encodes a GeoJSON LineString feature/geometry.
 *
 * @param {Object} geojson
 * @param {Number} precision
 * @returns {String}
 */
polyline.fromGeoJSON = function(geojson, precision) {
    if (geojson && geojson.type === 'Feature') {
        geojson = geojson.geometry;
    }
    if (!geojson || geojson.type !== 'LineString') {
        throw new Error('Input must be a GeoJSON LineString');
    }
    return polyline.encode(flipped(geojson.coordinates), precision);
};

/**
 * Decodes to a GeoJSON LineString geometry.
 *
 * @param {String} str
 * @param {Number} precision
 * @returns {Object}
 */
polyline.toGeoJSON = function(str, precision) {
    var coords = polyline.decode(str, precision);
    return {
        type: 'LineString',
        coordinates: flipped(coords)
    };
};

if (typeof module === 'object' && module.exports) {
    module.exports = polyline;
}

},{}],21:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":26}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],25:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
}).call(this,require('_process'))
},{"./createStore":27,"./utils/warning":29,"_process":21,"lodash/isPlainObject":19}],26:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}
},{}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":19,"symbol-observable":33}],28:[function(require,module,exports){
(function (process){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
}).call(this,require('_process'))
},{"./applyMiddleware":23,"./bindActionCreators":24,"./combineReducers":25,"./compose":26,"./createStore":27,"./utils/warning":29,"_process":21}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],30:[function(require,module,exports){
'use strict';

/**
 * A typeahead component for inputs
 * @class Suggestions
 *
 * @param {HTMLInputElement} el A valid HTML input element
 * @param {Array} data An array of data used for results
 * @param {Object} options
 * @param {Number} [options.limit=5] Max number of results to display in the auto suggest list.
 * @param {Number} [options.minLength=2] Number of characters typed into an input to trigger suggestions.
 * @return {Suggestions} `this`
 * @example
 * // in the browser
 * var input = document.querySelector('input');
 * var data = [
 *   'Roy Eldridge',
 *   'Roy Hargrove',
 *   'Rex Stewart'
 * ];
 *
 * new Suggestions(input, data);
 *
 * // with options
 * var input = document.querySelector('input');
 * var data = [{
 *   name: 'Roy Eldridge',
 *   year: 1911
 * }, {
 *   name: 'Roy Hargrove',
 *   year: 1969
 * }, {
 *   name: 'Rex Stewart',
 *   year: 1907
 * }];
 *
 * var typeahead = new Suggestions(input, data, {
 *   filter: false, // Disable filtering
 *   minLength: 3, // Number of characters typed into an input to trigger suggestions.
 *   limit: 3 //  Max number of results to display.
 * });
 *
 * // As we're passing an object of an arrays as data, override
 * // `getItemValue` by specifying the specific property to search on.
 * typeahead.getItemValue = function(item) { return item.name };
 *
 * input.addEventListener('change', function() {
 *   console.log(typeahead.selected); // Current selected item.
 * });
 *
 * // With browserify
 * var Suggestions = require('suggestions');
 *
 * new Suggestions(input, data);
 */
var Suggestions = require('./src/suggestions');
window.Suggestions = module.exports = Suggestions;

},{"./src/suggestions":32}],31:[function(require,module,exports){
'Use strict';

var List = function(component) {
  this.component = component;
  this.items = [];
  this.active = 0;
  this.element = document.createElement('ul');
  this.element.className = 'suggestions';

  // selectingListItem is set to true in the time between the mousedown and mouseup when clicking an item in the list
  // mousedown on a list item will cause the input to blur which normally hides the list, so this flag is used to keep
  // the list open until the mouseup
  this.selectingListItem = false;

  component.el.parentNode.insertBefore(this.element, component.el.nextSibling);
  return this;
};

List.prototype.show = function() {
  this.element.style.display = 'block';
};

List.prototype.hide = function() {
  this.element.style.display = 'none';
};

List.prototype.add = function(item) {
  this.items.push(item);
};

List.prototype.clear = function() {
  this.items = [];
  this.active = 0;
};

List.prototype.isEmpty = function() {
  return !this.items.length;
};

List.prototype.draw = function() {
  this.element.innerHTML = '';

  if (this.items.length === 0) {
    this.hide();
    return;
  }

  for (var i = 0; i < this.items.length; i++) {
    this.drawItem(this.items[i], this.active === i);
  }

  this.show();
};

List.prototype.drawItem = function(item, active) {
  var li = document.createElement('li'),
    a = document.createElement('a');

  if (active) li.className += ' active';

  a.innerHTML = item.string;

  li.appendChild(a);
  this.element.appendChild(li);

  li.addEventListener('mousedown', function() {
    this.selectingListItem = true;
  }.bind(this));

  li.addEventListener('mouseup', function() {
    this.handleMouseUp.call(this, item);
  }.bind(this));
};

List.prototype.handleMouseUp = function(item) {
  this.selectingListItem = false;
  this.component.value(item.original);
  this.clear();
  this.draw();
};

List.prototype.move = function(index) {
  this.active = index;
  this.draw();
};

List.prototype.previous = function() {
  this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
};

List.prototype.next = function() {
  this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
};

module.exports = List;

},{}],32:[function(require,module,exports){
'use strict';

var extend = require('xtend');
var fuzzy = require('fuzzy');
var List = require('./list');

var Suggestions = function(el, data, options) {
  options = options || {};

  this.options = extend({
    minLength: 2,
    limit: 5,
    filter: true
  }, options);

  this.el = el;
  this.data = data || [];
  this.list = new List(this);

  this.query = '';
  this.selected = null;

  this.list.draw();

  this.el.addEventListener('keyup', function(e) {
    this.handleKeyUp(e.keyCode);
  }.bind(this), false);

  this.el.addEventListener('keydown', function(e) {
    this.handleKeyDown(e);
  }.bind(this));

  this.el.addEventListener('focus', function() {
    this.handleFocus();
  }.bind(this));

  this.el.addEventListener('blur', function() {
    this.handleBlur();
  }.bind(this));

  this.el.addEventListener('paste', function(e) {
    this.handlePaste(e);
  }.bind(this));

  return this;
};

Suggestions.prototype.handleKeyUp = function(keyCode) {
  // 40 - DOWN
  // 38 - UP
  // 27 - ESC
  // 13 - ENTER
  // 9 - TAB

  if (keyCode === 40 ||
      keyCode === 38 ||
      keyCode === 27 ||
      keyCode === 13 ||
      keyCode === 9) return;

  this.handleInputChange(this.el.value);
};

Suggestions.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case 13: // ENTER
    case 9:  // TAB
      e.preventDefault();
      if (!this.list.isEmpty()) {
        this.value(this.list.items[this.list.active].original);
        this.list.hide();
      }
    break;
    case 27: // ESC
      if (!this.list.isEmpty()) this.list.hide();
    break;
    case 38: // UP
      this.list.previous();
    break;
    case 40: // DOWN
      this.list.next();
    break;
  }
};

Suggestions.prototype.handleBlur = function() {
  if (!this.list.selectingListItem) {
    this.list.hide();
  }
};

Suggestions.prototype.handlePaste = function(e) {
  if (e.clipboardData) {
    this.handleInputChange(e.clipboardData.getData('Text'));
  } else {
    var self = this;
    setTimeout(function () {
      self.handleInputChange(e.target.value);
    }, 100);
  }
};

Suggestions.prototype.handleInputChange = function(query) {
  this.query = this.normalize(query);

  this.list.clear();

  if (this.query.length < this.options.minLength) {
    this.list.draw();
    return;
  }

  this.getCandidates(function(data) {
    for (var i = 0; i < data.length; i++) {
      this.list.add(data[i]);
      if (i === (this.options.limit - 1)) break;
    }
    this.list.draw();
  }.bind(this));
};

Suggestions.prototype.handleFocus = function() {
  if (!this.list.isEmpty()) this.list.show();
  this.list.selectingListItem = false;
};

/**
 * Update data previously passed
 *
 * @param {Array} revisedData
 */
Suggestions.prototype.update = function(revisedData) {
  this.data = revisedData;
  this.handleKeyUp();
};

/**
 * Clears data
 */
Suggestions.prototype.clear = function() {
  this.data = [];
  this.list.clear();
};

/**
 * Normalize the results list and input value for matching
 *
 * @param {String} value
 * @return {String}
 */
Suggestions.prototype.normalize = function(value) {
  value = value.toLowerCase();
  return value;
};

/**
 * Evaluates whether an array item qualifies as a match with the current query
 *
 * @param {String} candidate a possible item from the array passed
 * @param {String} query the current query
 * @return {Boolean}
 */
Suggestions.prototype.match = function(candidate, query) {
  return candidate.indexOf(query) > -1;
};

Suggestions.prototype.value = function(value) {
  this.selected = value;
  this.el.value = this.getItemValue(value);

  if (document.createEvent) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent('change', true, false);
    this.el.dispatchEvent(e);
  } else {
    this.el.fireEvent('onchange');
  }
};

Suggestions.prototype.getCandidates = function(callback) {
  var options = {
    pre: '<strong>',
    post: '</strong>',
    extract: function(d) { return this.getItemValue(d); }.bind(this)
  };

  var results = this.options.filter ?
    fuzzy.filter(this.query, this.data, options) :
    this.data.map(function(d) {
      var boldString = this.getItemValue(d);
      var indexString = this.normalize(boldString);
      var indexOfQuery = indexString.lastIndexOf(this.query);
      while(indexOfQuery > -1) {
        var endIndexOfQuery = indexOfQuery + this.query.length;
        boldString = boldString.slice(0, indexOfQuery) + '<strong>' + boldString.slice(indexOfQuery, endIndexOfQuery) + '</strong>' + boldString.slice(endIndexOfQuery);
        indexOfQuery = indexString.slice(0, indexOfQuery).lastIndexOf(this.query);
      }
      return {
        original: d,
        string: boldString
      };
    }.bind(this));

  callback(results);
};

/**
 * For a given item in the data array, return what should be used as the candidate string
 *
 * @param {Object|String} item an item from the data array
 * @return {String} item
 */
Suggestions.prototype.getItemValue = function(item) {
  return item;
};

module.exports = Suggestions;

},{"./list":31,"fuzzy":3,"xtend":37}],33:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill.js');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill.js":34}],34:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],35:[function(require,module,exports){
var each = require('turf-meta').coordEach;

/**
 * Takes any {@link GeoJSON} object, calculates the extent of all input features, and returns a bounding box.
 *
 * @module turf/extent
 * @category measurement
 * @param {GeoJSON} input any valid GeoJSON Object
 * @return {Array<number>} the bounding box of `input` given
 * as an array in WSEN order (west, south, east, north)
 * @example
 * var input = {
 *   "type": "FeatureCollection",
 *   "features": [
 *     {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [114.175329, 22.2524]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [114.170007, 22.267969]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [114.200649, 22.274641]
 *       }
 *     }, {
 *       "type": "Feature",
 *       "properties": {},
 *       "geometry": {
 *         "type": "Point",
 *         "coordinates": [114.186744, 22.265745]
 *       }
 *     }
 *   ]
 * };
 *
 * var bbox = turf.extent(input);
 *
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * var resultFeatures = input.features.concat(bboxPolygon);
 * var result = {
 *   "type": "FeatureCollection",
 *   "features": resultFeatures
 * };
 *
 * //=result
 */
module.exports = function(layer) {
    var extent = [Infinity, Infinity, -Infinity, -Infinity];
    each(layer, function(coord) {
      if (extent[0] > coord[0]) extent[0] = coord[0];
      if (extent[1] > coord[1]) extent[1] = coord[1];
      if (extent[2] < coord[0]) extent[2] = coord[0];
      if (extent[3] < coord[1]) extent[3] = coord[1];
    });
    return extent;
};

},{"turf-meta":36}],36:[function(require,module,exports){
/**
 * Lazily iterate over coordinates in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @param {Object} layer any GeoJSON object
 * @param {Function} callback a method that takes (value)
 * @param {boolean=} excludeWrapCoord whether or not to include
 * the final coordinate of LinearRings that wraps the ring in its iteration.
 * @example
 * var point = { type: 'Point', coordinates: [0, 0] };
 * coordEach(point, function(coords) {
 *   // coords is equal to [0, 0]
 * });
 */
function coordEach(layer, callback, excludeWrapCoord) {
  var i, j, k, g, geometry, stopG, coords,
    geometryMaybeCollection,
    wrapShrink = 0,
    isGeometryCollection,
    isFeatureCollection = layer.type === 'FeatureCollection',
    isFeature = layer.type === 'Feature',
    stop = isFeatureCollection ? layer.features.length : 1;

  // This logic may look a little weird. The reason why it is that way
  // is because it's trying to be fast. GeoJSON supports multiple kinds
  // of objects at its root: FeatureCollection, Features, Geometries.
  // This function has the responsibility of handling all of them, and that
  // means that some of the `for` loops you see below actually just don't apply
  // to certain inputs. For instance, if you give this just a
  // Point geometry, then both loops are short-circuited and all we do
  // is gradually rename the input until it's called 'geometry'.
  //
  // This also aims to allocate as few resources as possible: just a
  // few numbers and booleans, rather than any temporary arrays as would
  // be required with the normalization approach.
  for (i = 0; i < stop; i++) {

    geometryMaybeCollection = (isFeatureCollection ? layer.features[i].geometry :
        (isFeature ? layer.geometry : layer));
    isGeometryCollection = geometryMaybeCollection.type === 'GeometryCollection';
    stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

    for (g = 0; g < stopG; g++) {

      geometry = isGeometryCollection ?
          geometryMaybeCollection.geometries[g] : geometryMaybeCollection;
      coords = geometry.coordinates;

      wrapShrink = (excludeWrapCoord &&
        (geometry.type === 'Polygon' || geometry.type === 'MultiPolygon')) ?
        1 : 0;

      if (geometry.type === 'Point') {
        callback(coords);
      } else if (geometry.type === 'LineString' || geometry.type === 'MultiPoint') {
        for (j = 0; j < coords.length; j++) callback(coords[j]);
      } else if (geometry.type === 'Polygon' || geometry.type === 'MultiLineString') {
        for (j = 0; j < coords.length; j++)
          for (k = 0; k < coords[j].length - wrapShrink; k++)
            callback(coords[j][k]);
      } else if (geometry.type === 'MultiPolygon') {
        for (j = 0; j < coords.length; j++)
          for (k = 0; k < coords[j].length; k++)
            for (l = 0; l < coords[j][k].length - wrapShrink; l++)
              callback(coords[j][k][l]);
      } else {
        throw new Error('Unknown Geometry Type');
      }
    }
  }
}
module.exports.coordEach = coordEach;

/**
 * Lazily reduce coordinates in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all coordinates is unnecessary.
 *
 * @param {Object} layer any GeoJSON object
 * @param {Function} callback a method that takes (memo, value) and returns
 * a new memo
 * @param {boolean=} excludeWrapCoord whether or not to include
 * the final coordinate of LinearRings that wraps the ring in its iteration.
 * @param {*} memo the starting value of memo: can be any type.
 */
function coordReduce(layer, callback, memo, excludeWrapCoord) {
  coordEach(layer, function(coord) {
    memo = callback(memo, coord);
  }, excludeWrapCoord);
  return memo;
}
module.exports.coordReduce = coordReduce;

/**
 * Lazily iterate over property objects in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @param {Object} layer any GeoJSON object
 * @param {Function} callback a method that takes (value)
 * @example
 * var point = { type: 'Feature', geometry: null, properties: { foo: 1 } };
 * propEach(point, function(props) {
 *   // props is equal to { foo: 1}
 * });
 */
function propEach(layer, callback) {
  var i;
  switch (layer.type) {
      case 'FeatureCollection':
        features = layer.features;
        for (i = 0; i < layer.features.length; i++) {
            callback(layer.features[i].properties);
        }
        break;
      case 'Feature':
        callback(layer.properties);
        break;
  }
}
module.exports.propEach = propEach;

/**
 * Lazily reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @param {Object} layer any GeoJSON object
 * @param {Function} callback a method that takes (memo, coord) and returns
 * a new memo
 * @param {*} memo the starting value of memo: can be any type.
 */
function propReduce(layer, callback, memo) {
  propEach(layer, function(prop) {
    memo = callback(memo, prop);
  });
  return memo;
}
module.exports.propReduce = propReduce;

},{}],37:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],38:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryOrigin = queryOrigin;
exports.queryDestination = queryDestination;
exports.queryOriginCoordinates = queryOriginCoordinates;
exports.queryDestinationCoordinates = queryDestinationCoordinates;
exports.clearOrigin = clearOrigin;
exports.clearDestination = clearDestination;
exports.setOptions = setOptions;
exports.hoverMarker = hoverMarker;
exports.setRouteIndex = setRouteIndex;
exports.createOrigin = createOrigin;
exports.createDestination = createDestination;
exports.setProfile = setProfile;
exports.reverse = reverse;
exports.setOriginFromCoordinates = setOriginFromCoordinates;
exports.setDestinationFromCoordinates = setDestinationFromCoordinates;
exports.addWaypoint = addWaypoint;
exports.setWaypoint = setWaypoint;
exports.removeWaypoint = removeWaypoint;
exports.eventSubscribe = eventSubscribe;
exports.eventEmit = eventEmit;

var _action_types = require('../constants/action_types');

var types = _interopRequireWildcard(_action_types);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var request = new XMLHttpRequest();

function originPoint(coordinates) {
  return function (dispatch) {
    var origin = _utils2.default.createPoint(coordinates, {
      id: 'origin',
      'marker-symbol': 'A'
    });

    dispatch({ type: types.ORIGIN, origin: origin });
    dispatch(eventEmit('origin', { feature: origin }));
  };
}

function destinationPoint(coordinates) {
  return function (dispatch) {
    var destination = _utils2.default.createPoint(coordinates, {
      id: 'destination',
      'marker-symbol': 'B'
    });

    dispatch({ type: types.DESTINATION, destination: destination });
    dispatch(eventEmit('destination', { feature: destination }));
  };
}

function setDirections(directions) {
  return function (dispatch) {
    dispatch({
      type: types.DIRECTIONS,
      directions: directions
    });
    dispatch(eventEmit('route', { route: directions }));
  };
}

function updateWaypoints(waypoints) {
  return {
    type: types.WAYPOINTS,
    waypoints: waypoints
  };
}

function setHoverMarker(feature) {
  return {
    type: types.HOVER_MARKER,
    hoverMarker: feature
  };
}

function fetchDirections() {
  return function (dispatch, getState) {
    var _getState = getState(),
        api = _getState.api,
        accessToken = _getState.accessToken,
        routeIndex = _getState.routeIndex,
        profile = _getState.profile,
        alternatives = _getState.alternatives,
        congestion = _getState.congestion,
        destination = _getState.destination;
    // if there is no destination set, do not make request because it will fail


    if (!(destination && destination.geometry)) return;

    var query = buildDirectionsQuery(getState);

    // Request params
    var options = [];
    options.push('geometries=polyline');
    if (alternatives) options.push('alternatives=true');
    if (congestion) options.push('annotations=congestion');
    options.push('steps=true');
    options.push('overview=full');
    if (accessToken) options.push('access_token=' + accessToken);
    request.abort();
    request.open('GET', '' + api + profile + '/' + query + '.json?' + options.join('&'), true);

    request.onload = function () {
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.responseText);
        if (data.error) {
          dispatch(setDirections([]));
          return dispatch(setError(data.error));
        }

        dispatch(setError(null));
        if (!data.routes[routeIndex]) dispatch(setRouteIndex(0));
        dispatch(setDirections(data.routes));

        // Revise origin / destination points
        dispatch(originPoint(data.waypoints[0].location));
        dispatch(destinationPoint(data.waypoints[data.waypoints.length - 1].location));
      } else {
        dispatch(setDirections([]));
        return dispatch(setError(JSON.parse(request.responseText).message));
      }
    };

    request.onerror = function () {
      dispatch(setDirections([]));
      return dispatch(setError(JSON.parse(request.responseText).message));
    };

    request.send();
  };
}

/*
 * Build query used to fetch directions
 *
 * @param {Function} state
 */
function buildDirectionsQuery(state) {
  var _state = state(),
      origin = _state.origin,
      destination = _state.destination,
      waypoints = _state.waypoints;

  var query = [];
  query.push(origin.geometry.coordinates.join(','));
  query.push(';');

  // Add any waypoints.
  if (waypoints.length) {
    waypoints.forEach(function (waypoint) {
      query.push(waypoint.geometry.coordinates.join(','));
      query.push(';');
    });
  }

  query.push(destination.geometry.coordinates.join(','));
  return encodeURIComponent(query.join(''));
}

function normalizeWaypoint(waypoint) {
  var properties = { id: 'waypoint' };
  return Object.assign(waypoint, {
    properties: waypoint.properties ? Object.assign(waypoint.properties, properties) : properties
  });
}

function setError(error) {
  return function (dispatch) {
    dispatch({
      type: 'ERROR',
      error: error
    });
    if (error) dispatch(eventEmit('error', { error: error }));
  };
}

function queryOrigin(query) {
  return {
    type: types.ORIGIN_QUERY,
    query: query
  };
}

function queryDestination(query) {
  return {
    type: types.DESTINATION_QUERY,
    query: query
  };
}

function queryOriginCoordinates(coords) {
  return {
    type: types.ORIGIN_FROM_COORDINATES,
    coordinates: coords
  };
}

function queryDestinationCoordinates(coords) {
  return {
    type: types.DESTINATION_FROM_COORDINATES,
    coordinates: coords
  };
}

function clearOrigin() {
  return function (dispatch) {
    dispatch({
      type: types.ORIGIN_CLEAR
    });
    dispatch(eventEmit('clear', { type: 'origin' }));
    dispatch(setError(null));
  };
}

function clearDestination() {
  return function (dispatch) {
    dispatch({
      type: types.DESTINATION_CLEAR
    });
    dispatch(eventEmit('clear', { type: 'destination' }));
    dispatch(setError(null));
  };
}

function setOptions(options) {
  return {
    type: types.SET_OPTIONS,
    options: options
  };
}

function hoverMarker(coordinates) {
  return function (dispatch) {
    var feature = coordinates ? _utils2.default.createPoint(coordinates, { id: 'hover' }) : {};
    dispatch(setHoverMarker(feature));
  };
}

function setRouteIndex(routeIndex) {
  return {
    type: types.ROUTE_INDEX,
    routeIndex: routeIndex
  };
}

function createOrigin(coordinates) {
  return function (dispatch, getState) {
    var _getState2 = getState(),
        destination = _getState2.destination;

    dispatch(originPoint(coordinates));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

function createDestination(coordinates) {
  return function (dispatch, getState) {
    var _getState3 = getState(),
        origin = _getState3.origin;

    dispatch(destinationPoint(coordinates));
    if (origin.geometry) dispatch(fetchDirections());
  };
}

function setProfile(profile) {
  return function (dispatch, getState) {
    var _getState4 = getState(),
        origin = _getState4.origin,
        destination = _getState4.destination;

    dispatch({ type: types.DIRECTIONS_PROFILE, profile: profile });
    dispatch(eventEmit('profile', { profile: profile }));
    if (origin.geometry && destination.geometry) dispatch(fetchDirections());
  };
}

function reverse() {
  return function (dispatch, getState) {
    var state = getState();
    if (state.destination.geometry) dispatch(originPoint(state.destination.geometry.coordinates));
    if (state.origin.geometry) dispatch(destinationPoint(state.origin.geometry.coordinates));
    if (state.origin.geometry && state.destination.geometry) dispatch(fetchDirections());
  };
}

/*
 * Set origin from coordinates
 *
 * @param {Array<number>} coordinates [lng, lat] array.
 */
function setOriginFromCoordinates(coords) {
  return function (dispatch) {
    if (!_utils2.default.validCoords(coords)) coords = [_utils2.default.wrap(coords[0]), _utils2.default.wrap(coords[1])];
    if (isNaN(coords[0]) && isNaN(coords[1])) return dispatch(setError(new Error('Coordinates are not valid')));
    dispatch(queryOriginCoordinates(coords));
    dispatch(createOrigin(coords));
  };
}

/*
 * Set destination from coordinates
 *
 * @param {Array<number>} coords [lng, lat] array.
 */
function setDestinationFromCoordinates(coords) {
  return function (dispatch) {
    if (!_utils2.default.validCoords(coords)) coords = [_utils2.default.wrap(coords[0]), _utils2.default.wrap(coords[1])];
    if (isNaN(coords[0]) && isNaN(coords[1])) return dispatch(setError(new Error('Coordinates are not valid')));
    dispatch(createDestination(coords));
    dispatch(queryDestinationCoordinates(coords));
  };
}

function addWaypoint(index, waypoint) {
  return function (dispatch, getState) {
    var _getState5 = getState(),
        destination = _getState5.destination,
        waypoints = _getState5.waypoints;

    waypoints.splice(index, 0, normalizeWaypoint(waypoint));
    dispatch(updateWaypoints(waypoints));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

function setWaypoint(index, waypoint) {
  return function (dispatch, getState) {
    var _getState6 = getState(),
        destination = _getState6.destination,
        waypoints = _getState6.waypoints;

    waypoints[index] = normalizeWaypoint(waypoint);
    dispatch(updateWaypoints(waypoints));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

function removeWaypoint(waypoint) {
  return function (dispatch, getState) {
    var _getState7 = getState(),
        destination = _getState7.destination,
        waypoints = _getState7.waypoints;

    waypoints = waypoints.filter(function (way) {
      return !_utils2.default.coordinateMatch(way, waypoint);
    });

    dispatch(updateWaypoints(waypoints));
    if (destination.geometry) dispatch(fetchDirections());
  };
}

function eventSubscribe(type, fn) {
  return function (dispatch, getState) {
    var _getState8 = getState(),
        events = _getState8.events;

    events[type] = events[type] || [];
    events[type].push(fn);
    return {
      type: types.EVENTS,
      events: events
    };
  };
}

function eventEmit(type, data) {
  var _this = this;

  return function (dispatch, getState) {
    var _getState9 = getState(),
        events = _getState9.events;

    if (!events[type]) {
      return {
        type: types.EVENTS,
        events: events
      };
    }

    var listeners = events[type].slice();

    for (var i = 0; i < listeners.length; i++) {
      listeners[i].call(_this, data);
    }
  };
}

},{"../constants/action_types":39,"../utils":47}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DESTINATION = exports.DESTINATION = 'DESTINATION';
var DESTINATION_CLEAR = exports.DESTINATION_CLEAR = 'DESTINATION_CLEAR';
var DESTINATION_QUERY = exports.DESTINATION_QUERY = 'DESTINATION_QUERY';
var DESTINATION_FROM_COORDINATES = exports.DESTINATION_FROM_COORDINATES = 'DESTINATION_FROM_COORDINATES';
var DIRECTIONS = exports.DIRECTIONS = 'DIRECTIONS';
var DIRECTIONS_PROFILE = exports.DIRECTIONS_PROFILE = 'DIRECTIONS_PROFILE';
var EVENTS = exports.EVENTS = 'EVENTS';
var ERROR = exports.ERROR = 'ERROR';
var HOVER_MARKER = exports.HOVER_MARKER = 'HOVER_MARKER';
var ORIGIN = exports.ORIGIN = 'ORIGIN';
var ORIGIN_CLEAR = exports.ORIGIN_CLEAR = 'ORIGIN_CLEAR';
var ORIGIN_QUERY = exports.ORIGIN_QUERY = 'ORIGIN_QUERY';
var ORIGIN_FROM_COORDINATES = exports.ORIGIN_FROM_COORDINATES = 'ORIGIN_FROM_COORDINATES';
var ROUTE_INDEX = exports.ROUTE_INDEX = 'ROUTE_INDEX';
var SET_OPTIONS = exports.SET_OPTIONS = 'SET_OPTIONS';
var WAYPOINTS = exports.WAYPOINTS = 'WAYPOINTS';

},{}],40:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _suggestions = require('suggestions');

var _suggestions2 = _interopRequireDefault(_suggestions);

var _lodash = require('lodash.debounce');

var _lodash2 = _interopRequireDefault(_lodash);

var _events = require('events');

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Geocoder - this slightly mimicks the mapboxl-gl-geocoder but isn't an exact replica.
// Once gl-js plugins can be added to custom divs, we should be able to require mapbox-gl-geocoder
// instead of including it here

var Geocoder = function () {
  function Geocoder(options) {
    _classCallCheck(this, Geocoder);

    this._ev = new _events.EventEmitter();
    this.options = options;
    this.api = options && options.api || 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
  }

  _createClass(Geocoder, [{
    key: 'onAdd',
    value: function onAdd(map) {
      this._map = map;

      this.request = new XMLHttpRequest();

      // Template
      var el = document.createElement('div');
      el.className = 'mapboxgl-ctrl-geocoder';

      var icon = document.createElement('span');
      icon.className = 'geocoder-icon geocoder-icon-search';

      var input = this._inputEl = document.createElement('input');
      input.type = 'text';
      input.placeholder = this.options.placeholder;

      input.addEventListener('keydown', (0, _lodash2.default)(function (e) {
        if (!e.target.value) return this._clearEl.classList.remove('active');

        // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
        if (e.metaKey || [9, 27, 37, 39, 13, 38, 40].indexOf(e.keyCode) !== -1) return;
        this._queryFromInput(e.target.value);
      }.bind(this)), 200);

      input.addEventListener('change', function (e) {
        if (e.target.value) this._clearEl.classList.add('active');

        var selected = this._typeahead.selected;
        if (selected) {
          if (this.options.flyTo) {
            if (selected.bbox && selected.context && selected.context.length <= 3 || selected.bbox && !selected.context) {
              var bbox = selected.bbox;
              map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]]);
            } else {
              map.flyTo({
                center: selected.center,
                zoom: this.options.zoom
              });
            }
          }
          this._input = selected;
          this.fire('result', { result: selected });
        }
      }.bind(this));

      var actions = document.createElement('div');
      actions.classList.add('geocoder-pin-right');

      var clear = this._clearEl = document.createElement('button');
      clear.className = 'geocoder-icon geocoder-icon-close';
      clear.addEventListener('click', this._clear.bind(this));

      var loading = this._loadingEl = document.createElement('span');
      loading.className = 'geocoder-icon geocoder-icon-loading';

      actions.appendChild(clear);
      actions.appendChild(loading);

      el.appendChild(icon);
      el.appendChild(input);
      el.appendChild(actions);

      // Override the control being added to control containers
      if (this.options.container) this.options.position = false;

      this._typeahead = new _suggestions2.default(input, [], { filter: false });
      this._typeahead.getItemValue = function (item) {
        return item.place_name;
      };

      return el;
    }
  }, {
    key: '_geocode',
    value: function _geocode(q, callback) {
      this._loadingEl.classList.add('active');
      this.fire('loading');

      var geocodingOptions = this.options;
      var exclude = ['placeholder', 'zoom', 'flyTo', 'accessToken'];
      var options = Object.keys(this.options).filter(function (key) {
        return exclude.indexOf(key) === -1;
      }).map(function (key) {
        return key + '=' + geocodingOptions[key];
      });

      var accessToken = this.options.accessToken ? this.options.accessToken : mapboxgl.accessToken;
      options.push('access_token=' + accessToken);
      this.request.abort();
      this.request.open('GET', this.api + encodeURIComponent(q.trim()) + '.json?' + options.join('&'), true);
      this.request.onload = function () {
        this._loadingEl.classList.remove('active');
        if (this.request.status >= 200 && this.request.status < 400) {
          var data = JSON.parse(this.request.responseText);
          if (data.features.length) {
            this._clearEl.classList.add('active');
          } else {
            this._clearEl.classList.remove('active');
            this._typeahead.selected = null;
          }

          this.fire('results', { results: data.features });
          this._typeahead.update(data.features);
          return callback(data.features);
        } else {
          this.fire('error', { error: JSON.parse(this.request.responseText).message });
        }
      }.bind(this);

      this.request.onerror = function () {
        this._loadingEl.classList.remove('active');
        this.fire('error', { error: JSON.parse(this.request.responseText).message });
      }.bind(this);

      this.request.send();
    }
  }, {
    key: '_queryFromInput',
    value: function _queryFromInput(q) {
      q = q.trim();
      if (!q) this._clear();
      if (q.length > 2) {
        this._geocode(q, function (results) {
          this._results = results;
        }.bind(this));
      }
    }
  }, {
    key: '_change',
    value: function _change() {
      var onChange = document.createEvent('HTMLEvents');
      onChange.initEvent('change', true, false);
      this._inputEl.dispatchEvent(onChange);
    }
  }, {
    key: '_query',
    value: function _query(input) {
      if (!input) return;
      if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.length) {
        input = [_utils2.default.wrap(input[0]), _utils2.default.wrap(input[1])].join();
      }

      this._geocode(input, function (results) {
        if (!results.length) return;
        var result = results[0];
        this._results = results;
        this._typeahead.selected = result;
        this._inputEl.value = result.place_name;
        this._change();
      }.bind(this));
    }
  }, {
    key: '_setInput',
    value: function _setInput(input) {
      if (!input) return;
      if ((typeof input === 'undefined' ? 'undefined' : _typeof(input)) === 'object' && input.length) {
        input = [_utils2.default.roundWithOriginalPrecision(_utils2.default.wrap(input[0]), input[0]), _utils2.default.roundWithOriginalPrecision(_utils2.default.wrap(input[1]), input[1])].join();
      }

      // Set input value to passed value and clear everything else.
      this._inputEl.value = input;
      this._input = null;
      this._typeahead.selected = null;
      this._typeahead.clear();
      this._change();
    }
  }, {
    key: '_clear',
    value: function _clear() {
      this._input = null;
      this._inputEl.value = '';
      this._typeahead.selected = null;
      this._typeahead.clear();
      this._change();
      this._inputEl.focus();
      this._clearEl.classList.remove('active');
      this.fire('clear');
    }
  }, {
    key: 'getResult',
    value: function getResult() {
      return this._input;
    }

    /**
     * Set & query the input
     * @param {Array|String} query An array of coordinates [lng, lat] or location name as a string.
     * @returns {Geocoder} this
     */

  }, {
    key: 'query',
    value: function query(_query2) {
      this._query(_query2);
      return this;
    }

    /**
     * Set input
     * @param {Array|String} value An array of coordinates [lng, lat] or location name as a string. Calling this function just sets the input and does not trigger an API request.
     * @returns {Geocoder} this
     */

  }, {
    key: 'setInput',
    value: function setInput(value) {
      this._setInput(value);
      return this;
    }

    /**
     * Subscribe to events that happen within the plugin.
     * @param {String} type name of event. Available events and the data passed into their respective event objects are:
     *
     * - __clear__ `Emitted when the input is cleared`
     * - __loading__ `Emitted when the geocoder is looking up a query`
     * - __results__ `{ results } Fired when the geocoder returns a response`
     * - __result__ `{ result } Fired when input is set`
     * - __error__ `{ error } Error as string
     * @param {Function} fn function that's called when the event is emitted.
     * @returns {Geocoder} this;
     */

  }, {
    key: 'on',
    value: function on(type, fn) {
      this._ev.on(type, fn);
      return this;
    }

    /**
     * Fire an event
     * @param {String} type event name.
     * @param {Object} data event data to pass to the function subscribed.
     * @returns {Geocoder} this
     */

  }, {
    key: 'fire',
    value: function fire(type, data) {
      this._ev.emit(type, data);
      return this;
    }

    /**
     * Remove an event
     * @returns {Geocoder} this
     * @param {String} type Event name.
     * @param {Function} fn Function that should unsubscribe to the event emitted.
     */

  }, {
    key: 'off',
    value: function off(type, fn) {
      this._ev.removeListener(type, fn);
      return this;
    }
  }]);

  return Geocoder;
}();

exports.default = Geocoder;
;

},{"../utils":47,"events":2,"lodash.debounce":6,"suggestions":30}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _geocoder = require('./geocoder');

var _geocoder2 = _interopRequireDefault(_geocoder);

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

var _turfExtent = require('turf-extent');

var _turfExtent2 = _interopRequireDefault(_turfExtent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

 // substack/brfs#39
var tmpl = (0, _lodash2.default)("<div class='mapbox-directions-component mapbox-directions-inputs'>\n  <div class='mapbox-directions-component-keyline'>\n    <div class='mapbox-directions-origin'>\n      <label class='mapbox-form-label'>\n        <span class='directions-icon directions-icon-depart'></span>\n      </label>\n      <div id='mapbox-directions-origin-input'></div>\n    </div>\n\n    <button\n      class='directions-icon directions-icon-reverse directions-reverse js-reverse-inputs'\n      title='Reverse origin &amp; destination'>\n    </button>\n\n    <div class='mapbox-directions-destination'>\n      <label class='mapbox-form-label'>\n        <span class='directions-icon directions-icon-arrive'></span>\n      </label>\n      <div id='mapbox-directions-destination-input'></div>\n    </div>\n  </div>\n\n  <% if (controls.profileSwitcher) { %>\n  <div class='mapbox-directions-profile mapbox-directions-component-keyline mapbox-directions-clearfix'><input\n      id='mapbox-directions-profile-driving-traffic'\n      type='radio'\n      name='profile'\n      value='mapbox/driving-traffic'\n      <% if (profile === 'mapbox/driving-traffic') { %>checked<% } %>\n    />\n    <label for='mapbox-directions-profile-driving-traffic'>Traffic</label>\n    <input\n      id='mapbox-directions-profile-driving'\n      type='radio'\n      name='profile'\n      value='mapbox/driving'\n      <% if (profile === 'mapbox/driving') { %>checked<% } %>\n    />\n    <label for='mapbox-directions-profile-driving'>Driving</label>\n    <input\n      id='mapbox-directions-profile-walking'\n      type='radio'\n      name='profile'\n      value='mapbox/walking'\n      <% if (profile === 'mapbox/walking') { %>checked<% } %>\n    />\n    <label for='mapbox-directions-profile-walking'>Walking</label>\n    <input\n      id='mapbox-directions-profile-cycling'\n      type='radio'\n      name='profile'\n      value='mapbox/cycling'\n      <% if (profile === 'mapbox/cycling') { %>checked<% } %>\n    />\n    <label for='mapbox-directions-profile-cycling'>Cycling</label>\n  </div>\n  <% } %>\n</div>\n");

/**
 * Inputs controller
 *
 * @param {HTMLElement} el Summary parent container
 * @param {Object} store A redux store
 * @param {Object} actions Actions an element can dispatch
 * @param {Object} map The mapboxgl instance
 * @private
 */

var Inputs = function () {
  function Inputs(el, store, actions, map) {
    _classCallCheck(this, Inputs);

    var _store$getState = store.getState(),
        originQuery = _store$getState.originQuery,
        destinationQuery = _store$getState.destinationQuery,
        profile = _store$getState.profile,
        controls = _store$getState.controls;

    el.innerHTML = tmpl({
      originQuery: originQuery,
      destinationQuery: destinationQuery,
      profile: profile,
      controls: controls
    });

    this.container = el;
    this.actions = actions;
    this.store = store;
    this._map = map;

    this.onAdd();
    this.render();
  }

  _createClass(Inputs, [{
    key: 'animateToCoordinates',
    value: function animateToCoordinates(mode, coords) {
      var _store$getState2 = this.store.getState(),
          origin = _store$getState2.origin,
          destination = _store$getState2.destination;

      if (origin.geometry && destination.geometry && !(0, _lodash4.default)(origin.geometry, destination.geometry)) {

        // Animate map to fit bounds.
        var bb = (0, _turfExtent2.default)({
          type: 'FeatureCollection',
          features: [origin, destination]
        });

        this._map.fitBounds([[bb[0], bb[1]], [bb[2], bb[3]]], { padding: 80 });
      } else {
        this._map.flyTo({ center: coords });
      }
    }
  }, {
    key: 'onAdd',
    value: function onAdd() {
      var _this = this;

      var _actions = this.actions,
          clearOrigin = _actions.clearOrigin,
          clearDestination = _actions.clearDestination,
          createOrigin = _actions.createOrigin,
          createDestination = _actions.createDestination,
          setProfile = _actions.setProfile,
          reverse = _actions.reverse;

      var _store$getState3 = this.store.getState(),
          geocoder = _store$getState3.geocoder,
          accessToken = _store$getState3.accessToken,
          flyTo = _store$getState3.flyTo,
          placeholderOrigin = _store$getState3.placeholderOrigin,
          placeholderDestination = _store$getState3.placeholderDestination,
          zoom = _store$getState3.zoom;

      this.originInput = new _geocoder2.default(Object.assign({}, {
        accessToken: accessToken
      }, geocoder, { flyTo: flyTo, placeholder: placeholderOrigin, zoom: zoom }));

      var originEl = this.originInput.onAdd(this._map);
      var originContainerEl = this.container.querySelector('#mapbox-directions-origin-input');
      originContainerEl.appendChild(originEl);

      this.destinationInput = new _geocoder2.default(Object.assign({}, {
        accessToken: accessToken
      }, geocoder, { flyTo: flyTo, placeholder: placeholderDestination, zoom: zoom }));

      var destinationEl = this.destinationInput.onAdd(this._map);
      this.container.querySelector('#mapbox-directions-destination-input').appendChild(destinationEl);

      this.originInput.on('result', function (e) {
        var coords = e.result.center;
        createOrigin(coords);
        _this.animateToCoordinates('origin', coords);
      });

      this.originInput.on('clear', clearOrigin);

      this.destinationInput.on('result', function (e) {
        var coords = e.result.center;
        createDestination(coords);
        _this.animateToCoordinates('destination', coords);
      });

      this.destinationInput.on('clear', clearDestination);

      // Driving / Walking / Cycling profiles
      var profiles = this.container.querySelectorAll('input[type="radio"]');
      Array.prototype.forEach.call(profiles, function (el) {
        el.addEventListener('change', function () {
          setProfile(el.value);
        });
      });

      // Reversing Origin / Destination
      this.container.querySelector('.js-reverse-inputs').addEventListener('click', function () {
        var _store$getState4 = _this.store.getState(),
            origin = _store$getState4.origin,
            destination = _store$getState4.destination;

        if (origin) _this.actions.queryDestination(origin.geometry.coordinates);
        if (destination) _this.actions.queryOrigin(destination.geometry.coordinates);
        reverse();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.store.subscribe(function () {
        var _store$getState5 = _this2.store.getState(),
            originQuery = _store$getState5.originQuery,
            destinationQuery = _store$getState5.destinationQuery,
            originQueryCoordinates = _store$getState5.originQueryCoordinates,
            destinationQueryCoordinates = _store$getState5.destinationQueryCoordinates;

        if (originQuery) {
          _this2.originInput.query(originQuery);
          _this2.actions.queryOrigin(null);
        }

        if (destinationQuery) {
          _this2.destinationInput.query(destinationQuery);
          _this2.actions.queryDestination(null);
        }

        if (originQueryCoordinates) {
          _this2.originInput.setInput(originQueryCoordinates);
          _this2.animateToCoordinates('origin', originQueryCoordinates);
          _this2.actions.queryOriginCoordinates(null);
        }

        if (destinationQueryCoordinates) {
          _this2.destinationInput.setInput(destinationQueryCoordinates);
          _this2.animateToCoordinates('destination', destinationQueryCoordinates);
          _this2.actions.queryDestinationCoordinates(null);
        }
      });
    }
  }]);

  return Inputs;
}();

exports.default = Inputs;

},{"./geocoder":40,"lodash.isequal":7,"lodash.template":8,"turf-extent":35}],42:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

var _lodash = require('lodash.template');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.isequal');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

 // substack/brfs#39
var instructionsTemplate = (0, _lodash2.default)("<div class='directions-control directions-control-directions'>\n  <div class='mapbox-directions-component mapbox-directions-route-summary<% if (routes > 1) { %> mapbox-directions-multiple<% } %>'>\n    <% if (routes > 1) { %>\n    <div class='mapbox-directions-routes mapbox-directions-clearfix'>\n      <% for (var i = 0; i < routes; i++) { %>\n        <input type='radio' name='routes' id='<%= i %>' <% if (i === routeIndex) { %>checked<% } %>>\n        <label for='<%= i %>' class='mapbox-directions-route'><%= i + 1 %></label>\n      <% } %>\n    </div>\n    <% } %>\n    <h1><%- duration %></h1>\n    <span><%- distance %></span>\n  </div>\n\n  <div class='mapbox-directions-instructions'>\n    <div class='mapbox-directions-instructions-wrapper'>\n      <ol class='mapbox-directions-steps'>\n        <% steps.forEach(function(step) { %>\n          <%\n            var distance = step.distance ? format(step.distance) : false;\n            var icon = step.maneuver.modifier ? step.maneuver.modifier.replace(/\\s+/g, '-').toLowerCase() : step.maneuver.type.replace(/\\s+/g, '-').toLowerCase();\n\n            if (step.maneuver.type === 'arrive' || step.maneuver.type === 'depart') {\n              icon = step.maneuver.type;\n            }\n\n            if (step.maneuver.type === 'roundabout' || step.maneuver.type === 'rotary') {\n              icon= 'roundabout';\n            }\n\n            var lng = step.maneuver.location[0];\n            var lat = step.maneuver.location[1];\n          %>\n          <li\n            data-lat='<%= lat %>'\n            data-lng='<%= lng %>'\n            class='mapbox-directions-step'>\n            <span class='directions-icon directions-icon-<%= icon %>'></span>\n            <div class='mapbox-directions-step-maneuver'>\n              <%= step.maneuver.instruction %>\n            </div>\n            <% if (distance) { %>\n              <div class='mapbox-directions-step-distance'>\n                <%= distance %>\n              </div>\n            <% } %>\n          </li>\n        <% }); %>\n      </ol>\n    </div>\n  </div>\n</div>\n");
var errorTemplate = (0, _lodash2.default)("<div class='directions-control directions-control-directions'>\n  <div class='mapbox-directions-error'>\n    <%= error %>\n  </div>\n</div>\n");

/**
 * Summary/Instructions controller
 *
 * @param {HTMLElement} el Summary parent container
 * @param {Object} store A redux store
 * @param {Object} actions Actions an element can dispatch
 * @param {Object} map The mapboxgl instance
 * @private
 */

var Instructions = function () {
  function Instructions(el, store, actions, map) {
    _classCallCheck(this, Instructions);

    this.container = el;
    this.actions = actions;
    this.store = store;
    this._map = map;
    this.directions = {};
    this.render();
  }

  _createClass(Instructions, [{
    key: 'render',
    value: function render() {
      var _this = this;

      this.store.subscribe(function () {
        var _actions = _this.actions,
            hoverMarker = _actions.hoverMarker,
            setRouteIndex = _actions.setRouteIndex;

        var _store$getState = _this.store.getState(),
            routeIndex = _store$getState.routeIndex,
            unit = _store$getState.unit,
            directions = _store$getState.directions,
            error = _store$getState.error,
            compile = _store$getState.compile;

        var shouldRender = !(0, _lodash4.default)(directions[routeIndex], _this.directions);

        if (error) {
          _this.container.innerHTML = errorTemplate({ error: error });
          return;
        }

        if (directions.length && shouldRender) {
          var direction = _this.directions = directions[routeIndex];

          if (compile) {
            direction.legs.forEach(function (leg) {
              leg.steps.forEach(function (step) {
                step.maneuver.instruction = compile('en', step);
              });
            });
          }

          _this.container.innerHTML = instructionsTemplate({
            routeIndex: routeIndex,
            routes: directions.length,
            steps: direction.legs[0].steps, // Todo: Respect all legs,
            format: _utils2.default.format[unit],
            duration: _utils2.default.format[unit](direction.distance),
            distance: _utils2.default.format.duration(direction.duration)
          });

          var steps = _this.container.querySelectorAll('.mapbox-directions-step');

          Array.prototype.forEach.call(steps, function (el) {
            var lng = el.getAttribute('data-lng');
            var lat = el.getAttribute('data-lat');

            el.addEventListener('mouseover', function () {
              hoverMarker([lng, lat]);
            });

            el.addEventListener('mouseout', function () {
              hoverMarker(null);
            });

            el.addEventListener('click', function () {
              _this._map.flyTo({
                center: [lng, lat],
                zoom: 16
              });
            });
          });

          var routes = _this.container.querySelectorAll('input[type="radio"]');
          Array.prototype.forEach.call(routes, function (el) {
            el.addEventListener('change', function (e) {
              setRouteIndex(parseInt(e.target.id, 10));
            });
          });
        } else if (_this.container.innerHTML && shouldRender) {
          _this.container.innerHTML = '';
        }
      });
    }
  }]);

  return Instructions;
}();

exports.default = Instructions;

},{"../utils":47,"lodash.isequal":7,"lodash.template":8}],43:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _polyline = require('polyline');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _reducers = require('./reducers');

var _reducers2 = _interopRequireDefault(_reducers);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _directions_style = require('./directions_style');

var _directions_style2 = _interopRequireDefault(_directions_style);

var _inputs = require('./controls/inputs');

var _inputs2 = _interopRequireDefault(_inputs);

var _instructions = require('./controls/instructions');

var _instructions2 = _interopRequireDefault(_instructions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var storeWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);
var store = storeWithMiddleware(_reducers2.default);

// State object management via redux


// Controls

/**
 * The Directions control
 * @class MapboxDirections
 *
 * @param {Object} options
 * @param {Array} [options.styles] Override default layer properties of the [directions source](https://github.com/mapbox/mapbox-gl-directions/blob/master/src/directions_style.js). Documentation for each property are specified in the [Mapbox GL Style Reference](https://www.mapbox.com/mapbox-gl-style-spec/).
 * @param {String} [options.accessToken=null] Required unless `mapboxgl.accessToken` is set globally
 * @param {String} [options.api="https://api.mapbox.com/directions/v5/"] Override default routing endpoint url
 * @param {Boolean} [options.interactive=true] Enable/Disable mouse or touch interactivity from the plugin
 * @param {String} [options.profile="mapbox/driving-traffic"] Routing profile to use. Options: `mapbox/driving-traffic`, `mapbox/driving`, `mapbox/walking`, `mapbox/cycling`
 * @param {Boolean} [options.alternatives=false] Whether to enable alternatives.
 * @param {Boolean} [options.congestion=false] Whether to enable congestion along the route line.
 * @param {String} [options.unit="imperial"] Measurement system to be used in navigation instructions. Options: `imperial`, `metric`
 * @param {Function} [options.compile=null] Provide a custom function for generating instruction, compatible with osrm-text-instructions.
 * @param {Object} [options.geocoder] Accepts an object containing the query parameters as [documented here](https://www.mapbox.com/api-documentation/#search-for-places).
 * @param {Object} [options.controls]
 * @param {Boolean} [options.controls.inputs=true] Hide or display the inputs control.
 * @param {Boolean} [options.controls.instructions=true] Hide or display the instructions control.
 * @param {Boolean} [options.controls.profileSwitcher=true] Hide or display the default profile switch with options for traffic, driving, walking and cycling.
 * @param {Number} [options.zoom=16] If no bbox exists from the geocoder result, the zoom you set here will be used in the flyTo.
 * @param {String} [options.placeholderOrigin="Choose a starting place"] If set, this text will appear as the placeholder attribute for the origin input element.
 * @param {String} [options.placeholderDestination="Choose destination"] If set, this text will appear as the placeholder attribute for the destination input element.
 * @param {Boolean} [options.flyTo=true] If false, animating the map to a selected result is disabled.
 * @example
 * var MapboxDirections = require('../src/index');
 * var directions = new MapboxDirections({
 *   accessToken: 'YOUR-MAPBOX-ACCESS-TOKEN',
 *   unit: 'metric',
 *   profile: 'mapbox/cycling'
 * });
 * // add to your mapboxgl map
 * map.addControl(directions);
 *
 * @return {MapboxDirections} `this`
 */
var MapboxDirections = function () {
  function MapboxDirections(options) {
    _classCallCheck(this, MapboxDirections);

    this.actions = (0, _redux.bindActionCreators)(actions, store.dispatch);
    this.actions.setOptions(options || {});
    this.options = options || {};

    this.onDragDown = this._onDragDown.bind(this);
    this.onDragMove = this._onDragMove.bind(this);
    this.onDragUp = this._onDragUp.bind(this);
    this.move = this._move.bind(this);
    this.onClick = this._clickHandler().bind(this);
  }

  _createClass(MapboxDirections, [{
    key: 'onAdd',
    value: function onAdd(map) {
      var _this = this;

      this._map = map;

      var _store$getState = store.getState(),
          controls = _store$getState.controls;

      var el = this.container = document.createElement('div');
      el.className = 'mapboxgl-ctrl-directions mapboxgl-ctrl';

      // Add controls to the page
      var inputEl = document.createElement('div');
      inputEl.className = 'directions-control directions-control-inputs';
      new _inputs2.default(inputEl, store, this.actions, this._map);

      var directionsEl = document.createElement('div');
      directionsEl.className = 'directions-control directions-control-instructions';

      new _instructions2.default(directionsEl, store, {
        hoverMarker: this.actions.hoverMarker,
        setRouteIndex: this.actions.setRouteIndex
      }, this._map);

      if (controls.inputs) el.appendChild(inputEl);
      if (controls.instructions) el.appendChild(directionsEl);

      this.subscribedActions();
      if (this._map.loaded()) this.mapState();else this._map.on('load', function () {
        return _this.mapState();
      });

      return el;
    }

    /**
     * Removes the control from the map it has been added to. This is called by `map.removeControl`,
     * which is the recommended method to remove controls.
     *
     * @returns {Control} `this`
     */

  }, {
    key: 'onRemove',
    value: function onRemove(map) {
      this.container.parentNode.removeChild(this.container);
      this.removeRoutes();
      map.off('mousedown', this.onDragDown);
      map.off('mousemove', this.move);
      map.off('touchstart', this.onDragDown);
      map.off('touchstart', this.move);
      map.off('click', this.onClick);
      if (this.storeUnsubscribe) {
        this.storeUnsubscribe();
        delete this.storeUnsubscribe;
      }
      _directions_style2.default.forEach(function (layer) {
        if (map.getLayer(layer.id)) map.removeLayer(layer.id);
      });

      if (map.getSource('directions')) map.removeSource('directions');

      this._map = null;
      return this;
    }
  }, {
    key: 'mapState',
    value: function mapState() {
      var _this2 = this;

      var _store$getState2 = store.getState(),
          profile = _store$getState2.profile,
          alternatives = _store$getState2.alternatives,
          congestion = _store$getState2.congestion,
          styles = _store$getState2.styles,
          interactive = _store$getState2.interactive,
          compile = _store$getState2.compile;

      // Emit any default or option set config


      this.actions.eventEmit('profile', { profile: profile });

      var geojson = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      };

      // Add and set data theme layer/style
      this._map.addSource('directions', geojson);

      // Add direction specific styles to the map
      if (styles && styles.length) styles.forEach(function (style) {
        return _this2._map.addLayer(style);
      });
      _directions_style2.default.forEach(function (style) {
        // only add the default style layer if a custom layer wasn't provided
        if (!_this2._map.getLayer(style.id)) _this2._map.addLayer(style);
      });

      if (interactive) {
        this._map.on('mousedown', this.onDragDown);
        this._map.on('mousemove', this.move);
        this._map.on('click', this.onClick);

        this._map.on('touchstart', this.move);
        this._map.on('touchstart', this.onDragDown);
      }
    }
  }, {
    key: 'subscribedActions',
    value: function subscribedActions() {
      var _this3 = this;

      this.storeUnsubscribe = store.subscribe(function () {
        var _store$getState3 = store.getState(),
            origin = _store$getState3.origin,
            destination = _store$getState3.destination,
            hoverMarker = _store$getState3.hoverMarker,
            directions = _store$getState3.directions,
            routeIndex = _store$getState3.routeIndex;

        var geojson = {
          type: 'FeatureCollection',
          features: [origin, destination, hoverMarker].filter(function (d) {
            return d.geometry;
          })
        };

        if (directions.length) {
          directions.forEach(function (feature, index) {

            var features = [];

            var decoded = (0, _polyline.decode)(feature.geometry, 5).map(function (c) {
              return c.reverse();
            });

            decoded.forEach(function (c, i) {
              var previous = features[features.length - 1];
              var congestion = feature.legs[0].annotation && feature.legs[0].annotation.congestion && feature.legs[0].annotation.congestion[i - 1];

              if (previous && (!congestion || previous.properties.congestion === congestion)) {
                previous.geometry.coordinates.push(c);
              } else {
                var segment = {
                  geometry: {
                    type: 'LineString',
                    coordinates: []
                  },
                  properties: {
                    'route-index': index,
                    route: index === routeIndex ? 'selected' : 'alternate'
                  }
                };

                // New segment starts with previous segment's last coordinate.
                if (previous) segment.geometry.coordinates.push(previous.geometry.coordinates[previous.geometry.coordinates.length - 1]);

                segment.geometry.coordinates.push(c);

                if (congestion) {
                  segment.properties.congestion = feature.legs[0].annotation.congestion[i - 1];
                }

                features.push(segment);
              }
            });

            geojson.features = geojson.features.concat(features);

            if (index === routeIndex) {
              // Collect any possible waypoints from steps
              feature.legs[0].steps.forEach(function (d) {
                if (d.maneuver.type === 'waypoint') {
                  geojson.features.push({
                    type: 'Feature',
                    geometry: d.maneuver.location,
                    properties: {
                      id: 'waypoint'
                    }
                  });
                }
              });
            }
          });
        }

        if (_this3._map.style && _this3._map.getSource('directions')) {
          _this3._map.getSource('directions').setData(geojson);
        }
      });
    }
  }, {
    key: '_clickHandler',
    value: function _clickHandler() {
      var timer = null;
      var delay = 250;
      return function (event) {
        if (!timer) {
          var singleClickHandler = this._onSingleClick.bind(this);

          timer = setTimeout(function () {
            singleClickHandler(event);
            timer = null;
          }, delay);
        } else {
          clearTimeout(timer);
          timer = null;
          this._map.zoomIn();
        }
      };
    }
  }, {
    key: '_onSingleClick',
    value: function _onSingleClick(e) {
      var _this4 = this;

      var _store$getState4 = store.getState(),
          origin = _store$getState4.origin;

      var coords = [e.lngLat.lng, e.lngLat.lat];

      if (!origin.geometry) {
        this.actions.setOriginFromCoordinates(coords);
      } else {

        var features = this._map.queryRenderedFeatures(e.point, {
          layers: ['directions-origin-point', 'directions-destination-point', 'directions-waypoint-point', 'directions-route-line-alt']
        });

        if (features.length) {

          // Remove any waypoints
          features.forEach(function (f) {
            if (f.layer.id === 'directions-waypoint-point') {
              _this4.actions.removeWaypoint(f);
            }
          });

          if (features[0].properties.route === 'alternate') {
            var index = features[0].properties['route-index'];
            this.actions.setRouteIndex(index);
          }
        } else {
          this.actions.setDestinationFromCoordinates(coords);
          this._map.flyTo({ center: coords });
        }
      }
    }
  }, {
    key: '_move',
    value: function _move(e) {
      var _this5 = this;

      var _store$getState5 = store.getState(),
          hoverMarker = _store$getState5.hoverMarker;

      var features = this._map.queryRenderedFeatures(e.point, {
        layers: ['directions-route-line-alt', 'directions-route-line', 'directions-origin-point', 'directions-destination-point', 'directions-hover-point']
      });

      this._map.getCanvas().style.cursor = features.length ? 'pointer' : '';

      if (features.length) {
        this.isCursorOverPoint = features[0];
        this._map.dragPan.disable();

        // Add a possible waypoint marker when hovering over the active route line
        features.forEach(function (feature) {
          if (feature.layer.id === 'directions-route-line') {
            _this5.actions.hoverMarker([e.lngLat.lng, e.lngLat.lat]);
          } else if (hoverMarker.geometry) {
            _this5.actions.hoverMarker(null);
          }
        });
      } else if (this.isCursorOverPoint) {
        this.isCursorOverPoint = false;
        this._map.dragPan.enable();
      }
    }
  }, {
    key: '_onDragDown',
    value: function _onDragDown() {
      if (!this.isCursorOverPoint) return;
      this.isDragging = this.isCursorOverPoint;
      this._map.getCanvas().style.cursor = 'grab';

      this._map.on('mousemove', this.onDragMove);
      this._map.on('mouseup', this.onDragUp);

      this._map.on('touchmove', this.onDragMove);
      this._map.on('touchend', this.onDragUp);
    }
  }, {
    key: '_onDragMove',
    value: function _onDragMove(e) {
      if (!this.isDragging) return;

      var coords = [e.lngLat.lng, e.lngLat.lat];
      switch (this.isDragging.layer.id) {
        case 'directions-origin-point':
          this.actions.createOrigin(coords);
          break;
        case 'directions-destination-point':
          this.actions.createDestination(coords);
          break;
        case 'directions-hover-point':
          this.actions.hoverMarker(coords);
          break;
      }
    }
  }, {
    key: '_onDragUp',
    value: function _onDragUp() {
      if (!this.isDragging) return;

      var _store$getState6 = store.getState(),
          hoverMarker = _store$getState6.hoverMarker,
          origin = _store$getState6.origin,
          destination = _store$getState6.destination;

      switch (this.isDragging.layer.id) {
        case 'directions-origin-point':
          this.actions.setOriginFromCoordinates(origin.geometry.coordinates);
          break;
        case 'directions-destination-point':
          this.actions.setDestinationFromCoordinates(destination.geometry.coordinates);
          break;
        case 'directions-hover-point':
          // Add waypoint if a sufficent amount of dragging has occurred.
          if (hoverMarker.geometry && !_utils2.default.coordinateMatch(this.isDragging, hoverMarker)) {
            this.actions.addWaypoint(0, hoverMarker);
          }
          break;
      }

      this.isDragging = false;
      this._map.getCanvas().style.cursor = '';

      this._map.off('touchmove', this.onDragMove);
      this._map.off('touchend', this.onDragUp);

      this._map.off('mousemove', this.onDragMove);
      this._map.off('mouseup', this.onDragUp);
    }

    // API Methods
    // ============================

    /**
     * Turn on or off interactivity
     * @param {Boolean} state sets interactivity based on a state of `true` or `false`.
     * @returns {MapboxDirections} this
     */

  }, {
    key: 'interactive',
    value: function interactive(state) {
      if (state) {
        this._map.on('touchstart', this.move);
        this._map.on('touchstart', this.onDragDown);

        this._map.on('mousedown', this.onDragDown);
        this._map.on('mousemove', this.move);
        this._map.on('click', this.onClick);
      } else {
        this._map.off('touchstart', this.move);
        this._map.off('touchstart', this.onDragDown);

        this._map.off('mousedown', this.onDragDown);
        this._map.off('mousemove', this.move);
        this._map.off('click', this.onClick);
      }

      return this;
    }

    /**
     * Returns the origin of the current route.
     * @returns {Object} origin
     */

  }, {
    key: 'getOrigin',
    value: function getOrigin() {
      return store.getState().origin;
    }

    /**
     * Sets origin. _Note:_ calling this method requires the [map load event](https://www.mapbox.com/mapbox-gl-js/api/#Map.load)
     * to have run.
     * @param {Array<number>|String} query An array of coordinates [lng, lat] or location name as a string.
     * @returns {MapboxDirections} this
     */

  }, {
    key: 'setOrigin',
    value: function setOrigin(query) {
      if (typeof query === 'string') {
        this.actions.queryOrigin(query);
      } else {
        this.actions.setOriginFromCoordinates(query);
      }

      return this;
    }

    /**
     * Returns the destination of the current route.
     * @returns {Object} destination
     */

  }, {
    key: 'getDestination',
    value: function getDestination() {
      return store.getState().destination;
    }

    /**
     * Sets destination. _Note:_ calling this method requires the [map load event](https://www.mapbox.com/mapbox-gl-js/api/#Map.load)
     * to have run.
     * @param {Array<number>|String} query An array of coordinates [lng, lat] or location name as a string.
     * @returns {MapboxDirections} this
     */

  }, {
    key: 'setDestination',
    value: function setDestination(query) {
      if (typeof query === 'string') {
        this.actions.queryDestination(query);
      } else {
        this.actions.setDestinationFromCoordinates(query);
      }

      return this;
    }

    /**
     * Swap the origin and destination.
     * @returns {MapboxDirections} this
     */

  }, {
    key: 'reverse',
    value: function reverse() {
      this.actions.reverse();
      return this;
    }

    /**
     * Add a waypoint to the route. _Note:_ calling this method requires the
     * [map load event](https://www.mapbox.com/mapbox-gl-js/api/#Map.load) to have run.
     * @param {Number} index position waypoint should be placed in the waypoint array
     * @param {Array<number>|Point} waypoint can be a GeoJSON Point Feature or [lng, lat] coordinates.
     * @returns {MapboxDirections} this;
     */

  }, {
    key: 'addWaypoint',
    value: function addWaypoint(index, waypoint) {
      if (!waypoint.type) waypoint = _utils2.default.createPoint(waypoint, { id: 'waypoint' });
      this.actions.addWaypoint(index, waypoint);
      return this;
    }

    /**
     * Change the waypoint at a given index in the route. _Note:_ calling this
     * method requires the [map load event](https://www.mapbox.com/mapbox-gl-js/api/#Map.load)
     * to have run.
     * @param {Number} index indexed position of the waypoint to update
     * @param {Array<number>|Point} waypoint can be a GeoJSON Point Feature or [lng, lat] coordinates.
     * @returns {MapboxDirections} this;
     */

  }, {
    key: 'setWaypoint',
    value: function setWaypoint(index, waypoint) {
      if (!waypoint.type) waypoint = _utils2.default.createPoint(waypoint, { id: 'waypoint' });
      this.actions.setWaypoint(index, waypoint);
      return this;
    }

    /**
     * Remove a waypoint from the route.
     * @param {Number} index position in the waypoints array.
     * @returns {MapboxDirections} this;
     */

  }, {
    key: 'removeWaypoint',
    value: function removeWaypoint(index) {
      var _store$getState7 = store.getState(),
          waypoints = _store$getState7.waypoints;

      this.actions.removeWaypoint(waypoints[index]);
      return this;
    }

    /**
     * Fetch all current waypoints in a route.
     * @returns {Array} waypoints
     */

  }, {
    key: 'getWaypoints',
    value: function getWaypoints() {
      return store.getState().waypoints;
    }

    /**
     * Removes all routes and waypoints from the map.
     *
     * @returns {MapboxDirections} this;
     */

  }, {
    key: 'removeRoutes',
    value: function removeRoutes() {
      this.actions.clearOrigin();
      this.actions.clearDestination();
      return this;
    }

    /**
     * Subscribe to events that happen within the plugin.
     * @param {String} type name of event. Available events and the data passed into their respective event objects are:
     *
     * - __clear__ `{ type: } Type is one of 'origin' or 'destination'`
     * - __loading__ `{ type: } Type is one of 'origin' or 'destination'`
     * - __profile__ `{ profile } Profile is one of 'driving', 'walking', or 'cycling'`
     * - __origin__ `{ feature } Fired when origin is set`
     * - __destination__ `{ feature } Fired when destination is set`
     * - __route__ `{ route } Fired when a route is updated`
     * - __error__ `{ error } Error as string
     * @param {Function} fn function that's called when the event is emitted.
     * @returns {MapboxDirections} this;
     */

  }, {
    key: 'on',
    value: function on(type, fn) {
      this.actions.eventSubscribe(type, fn);
      return this;
    }
  }]);

  return MapboxDirections;
}();

exports.default = MapboxDirections;

},{"./actions":38,"./controls/inputs":41,"./controls/instructions":42,"./directions_style":44,"./reducers":46,"./utils":47,"polyline":20,"redux":28,"redux-thunk":22}],44:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var style = [{
  'id': 'directions-route-line-alt',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#bbb',
    'line-width': 4
  },
  'filter': ['all', ['in', '$type', 'LineString'], ['in', 'route', 'alternate']]
}, {
  'id': 'directions-route-line-casing',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'round',
    'line-join': 'round'
  },
  'paint': {
    'line-color': '#2d5f99',
    'line-width': 12
  },
  'filter': ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']]
}, {
  'id': 'directions-route-line',
  'type': 'line',
  'source': 'directions',
  'layout': {
    'line-cap': 'butt',
    'line-join': 'round'
  },
  'paint': {
    'line-color': {
      'property': 'congestion',
      'type': 'categorical',
      'default': '#4882c5',
      'stops': [['unknown', '#4882c5'], ['low', '#4882c5'], ['moderate', '#f09a46'], ['heavy', '#e34341'], ['severe', '#8b2342']]
    },
    'line-width': 7
  },
  'filter': ['all', ['in', '$type', 'LineString'], ['in', 'route', 'selected']]
}, {
  'id': 'directions-hover-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'id', 'hover']]
}, {
  'id': 'directions-hover-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#3bb2d0'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'id', 'hover']]
}, {
  'id': 'directions-waypoint-point-casing',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 8,
    'circle-color': '#fff'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'id', 'waypoint']]
}, {
  'id': 'directions-waypoint-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 6,
    'circle-color': '#8a8bc9'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'id', 'waypoint']]
}, {
  'id': 'directions-origin-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 18,
    'circle-color': '#3bb2d0'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'A']]
}, {
  'id': 'directions-origin-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'A',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'paint': {
    'text-color': '#fff'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'A']]
}, {
  'id': 'directions-destination-point',
  'type': 'circle',
  'source': 'directions',
  'paint': {
    'circle-radius': 18,
    'circle-color': '#8a8bc9'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'B']]
}, {
  'id': 'directions-destination-label',
  'type': 'symbol',
  'source': 'directions',
  'layout': {
    'text-field': 'B',
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12
  },
  'paint': {
    'text-color': '#fff'
  },
  'filter': ['all', ['in', '$type', 'Point'], ['in', 'marker-symbol', 'B']]
}];

exports.default = style;

},{}],45:[function(require,module,exports){
'use strict';

var _directions = require('./directions');

var _directions2 = _interopRequireDefault(_directions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _directions2.default;

},{"./directions":43}],46:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _action_types = require('../constants/action_types.js');

var types = _interopRequireWildcard(_action_types);

var _deepAssign = require('deep-assign');

var _deepAssign2 = _interopRequireDefault(_deepAssign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = {
  // Options set on initialization
  api: 'https://api.mapbox.com/directions/v5/',
  profile: 'mapbox/driving-traffic',
  alternatives: false,
  congestion: false,
  unit: 'imperial',
  flyTo: true,
  placeholderOrigin: 'Choose a starting place',
  placeholderDestination: 'Choose destination',
  zoom: 16,
  compile: null,
  proximity: false,
  styles: [],

  // UI controls
  controls: {
    profileSwitcher: true,
    inputs: true,
    instructions: true
  },

  // Optional setting to pass options available to mapbox-gl-geocoder
  geocoder: {},

  interactive: true,

  // Container for client registered events
  events: {},

  // Marker feature drawn on the map at any point.
  origin: {},
  destination: {},
  hoverMarker: {},
  waypoints: [],

  // User input strings or result returned from geocoder
  originQuery: null,
  destinationQuery: null,
  originQueryCoordinates: null,
  destinationQueryCoordinates: null,

  // Directions data
  directions: [],
  routeIndex: 0
};

function data() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  switch (action.type) {
    case types.SET_OPTIONS:
      return (0, _deepAssign2.default)({}, state, action.options);

    case types.DIRECTIONS_PROFILE:
      return Object.assign({}, state, {
        profile: action.profile
      });

    case types.ORIGIN:
      return Object.assign({}, state, {
        origin: action.origin,
        hoverMarker: {}
      });

    case types.DESTINATION:
      return Object.assign({}, state, {
        destination: action.destination,
        hoverMarker: {}
      });

    case types.HOVER_MARKER:
      return Object.assign({}, state, {
        hoverMarker: action.hoverMarker
      });

    case types.WAYPOINTS:
      return Object.assign({}, state, {
        waypoints: action.waypoints
      });

    case types.ORIGIN_QUERY:
      return Object.assign({}, state, {
        originQuery: action.query
      });

    case types.DESTINATION_QUERY:
      return Object.assign({}, state, {
        destinationQuery: action.query
      });

    case types.ORIGIN_FROM_COORDINATES:
      return Object.assign({}, state, {
        originQueryCoordinates: action.coordinates
      });

    case types.DESTINATION_FROM_COORDINATES:
      return Object.assign({}, state, {
        destinationQueryCoordinates: action.coordinates
      });

    case types.ORIGIN_CLEAR:
      return Object.assign({}, state, {
        origin: {},
        originQuery: '',
        waypoints: [],
        directions: []
      });

    case types.DESTINATION_CLEAR:
      return Object.assign({}, state, {
        destination: {},
        destinationQuery: '',
        waypoints: [],
        directions: []
      });

    case types.DIRECTIONS:
      return Object.assign({}, state, {
        directions: action.directions
      });

    case types.ROUTE_INDEX:
      return Object.assign({}, state, {
        routeIndex: action.routeIndex
      });

    case types.ERROR:
      return Object.assign({}, state, {
        error: action.error
      });

    default:
      return state;
  }
}

exports.default = data;

},{"../constants/action_types.js":39,"deep-assign":1}],47:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function validCoords(coords) {
  return coords[0] >= -180 && coords[0] <= 180 && coords[1] >= -90 && coords[1] <= 90;
}

function coordinateMatch(a, b) {
  a = a.geometry.coordinates;
  b = b.geometry.coordinates;
  return a.join() === b.join() || a[0].toFixed(3) === b[0].toFixed(3) && a[1].toFixed(3) === b[1].toFixed(3);
}

function wrap(n) {
  var d = 180 - -180;
  var w = ((n - -180) % d + d) % d + -180;
  return w === -180 ? 180 : w;
}

function roundWithOriginalPrecision(input, original) {
  var precision = 0;
  if (Math.floor(original) !== original) {
    precision = original.toString().split('.')[1].length;
  }
  return input.toFixed(Math.min(precision, 5));
}

function createPoint(coordinates, properties) {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coordinates
    },
    properties: properties ? properties : {}
  };
}

var format = {
  duration: function duration(s) {
    var m = Math.floor(s / 60),
        h = Math.floor(m / 60);
    s %= 60;
    m %= 60;
    if (h === 0 && m === 0) return s + 's';
    if (h === 0) return m + 'min';
    return h + 'h ' + m + 'min';
  },
  imperial: function imperial(m) {
    var mi = m / 1609.344;
    if (mi >= 100) return mi.toFixed(0) + 'mi';
    if (mi >= 10) return mi.toFixed(1) + 'mi';
    if (mi >= 0.1) return mi.toFixed(2) + 'mi';
    return (mi * 5280).toFixed(0) + 'ft';
  },
  metric: function metric(m) {
    if (m >= 100000) return (m / 1000).toFixed(0) + 'km';
    if (m >= 10000) return (m / 1000).toFixed(1) + 'km';
    if (m >= 100) return (m / 1000).toFixed(2) + 'km';
    return m.toFixed(0) + 'm';
  }
};

exports.default = { format: format, coordinateMatch: coordinateMatch, createPoint: createPoint, validCoords: validCoords, wrap: wrap, roundWithOriginalPrecision: roundWithOriginalPrecision };

},{}]},{},[45])(45)
});


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nanoid = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.browser.js")

/**
 * Construct a new mapbox event client to send interaction events to the mapbox event service
 * @param {Object} options options with which to create the service
 * @param {String} options.accessToken the mapbox access token to make requests
 * @param {Number} [options.flushInterval=1000] the number of ms after which to flush the event queue
 * @param {Number} [options.maxQueueSize=100] the number of events to queue before flushing
 * @private
 */
function MapboxEventManager(options) {
  this.origin = options.origin || 'https://api.mapbox.com';
  this.endpoint = 'events/v2';
  this.access_token = options.accessToken;
  this.version = '0.2.0'
  this.sessionID = this.generateSessionID();
  this.userAgent = this.getUserAgent();

  this.options = options;
  this.send = this.send.bind(this);


  // parse global options to be sent with each request
  this.countries = (options.countries) ? options.countries.split(",") : null;
  this.types = (options.types) ? options.types.split(",") : null;
  this.bbox = (options.bbox) ? options.bbox : null;
  this.language = (options.language) ? options.language.split(",") : null;
  this.limit = (options.limit) ? +options.limit : null;
  this.locale = navigator.language || null;
  this.enableEventLogging = this.shouldEnableLogging(options);
  this.eventQueue = new Array();
  this.flushInterval = options.flushInterval || 1000;
  this.maxQueueSize = options.maxQueueSize || 100;
  this.timer = (this.flushInterval) ? setTimeout(this.flush.bind(this), this.flushInterval) : null;
  // keep some state to deduplicate requests if necessary
  this.lastSentInput = "";
  this.lastSentIndex = 0;
}

MapboxEventManager.prototype = {
  /**
     * Send a search.select event to the mapbox events service
     * This event marks the array index of the item selected by the user out of the array of possible options
     * @private
     * @param {Object} selected the geojson feature selected by the user
     * @param {Object} geocoder a mapbox-gl-geocoder instance
     * @returns {Promise}
     */
  select: function(selected, geocoder){
    var resultIndex = this.getSelectedIndex(selected, geocoder);
    var payload = this.getEventPayload('search.select', geocoder);
    payload.resultIndex = resultIndex;
    payload.resultPlaceName  = selected.place_name;
    payload.resultId = selected.id;
    if ((resultIndex === this.lastSentIndex && payload.queryString === this.lastSentInput) || resultIndex == -1) {
      // don't log duplicate events if the user re-selected the same feature on the same search
      return;
    }
    this.lastSentIndex = resultIndex;
    this.lastSentInput = payload.queryString;
    if (!payload.queryString) return; // will be rejected
    return this.push(payload)
  },

  /**
     * Send a search-start event to the mapbox events service
     * This turnstile event marks when a user starts a new search
     * @private
     * @param {Object} geocoder a mapbox-gl-geocoder instance
     * @returns {Promise}
     */
  start: function(geocoder){
    var payload = this.getEventPayload('search.start', geocoder);
    if (!payload.queryString) return; // will be rejected
    return this.push(payload);
  },

  /**
   * Send a search-keyevent event to the mapbox events service
   * This event records each keypress in sequence
   * @private
   * @param {Object} keyEvent the keydown event to log
   * @param {Obeject} geocoder a mapbox-gl-geocoder instance
   * 
   */
  keyevent: function(keyEvent, geocoder){
    //pass invalid event
    if (!keyEvent.key) return;
    // don't send events for keys that don't change the input
    // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
    if (keyEvent.metaKey || [9, 27, 37, 39, 13, 38, 40].indexOf(keyEvent.keyCode) !== -1) return;
    var payload = this.getEventPayload('search.keystroke', geocoder);
    payload.lastAction = keyEvent.key;
    if (!payload.queryString) return; // will be rejected
    return this.push(payload);
  },

  /**
   * Send an event to the events service
   *
   * The event is skipped if the instance is not enabled to send logging events
   *
   * @private
   * @param {Object} payload the http POST body of the event
   * @param {Function} [callback] a callback function to invoke when the send has completed
   * @returns {Promise}
   */
  send: function (payload, callback) {
    if (!this.enableEventLogging) {
      if (callback) return callback();
      return;
    }
    var options = this.getRequestOptions(payload);
    this.request(options, function(err){
      if (err) return this.handleError(err, callback);
      if (callback) {
        return callback();
      }
    }.bind(this))
  },
  /**
   * Get http request options
   * @private
   * @param {*} payload
   */
  getRequestOptions: function(payload){
    if (!Array.isArray(payload)) payload = [payload];
    var options = {
      // events must be sent with POST
      method: "POST",
      host: this.origin,
      path: this.endpoint +  "?access_token=" + this.access_token,
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(payload) //events are arrays
    }
    return options
  },

  /**
   * Get the event payload to send to the events service
   * Most payload properties are shared across all events
   * @private
   * @param {String} event the name of the event to send to the events service. Valid options are 'search.start', 'search.select', 'search.feedback'.
   * @param {Object} geocoder a mapbox-gl-geocoder instance
   * @returns {Object} an event payload
   */
  getEventPayload: function (event, geocoder) {
    var proximity;
    if (!geocoder.options.proximity) proximity = null;
    else proximity = [geocoder.options.proximity.longitude, geocoder.options.proximity.latitude];

    var zoom = (geocoder._map) ? geocoder._map.getZoom() : null;
    var payload = {
      event: event,
      created: +new Date(),
      sessionIdentifier: this.sessionID,
      country: this.countries,
      userAgent: this.userAgent,
      language: this.language,
      bbox: this.bbox,
      types: this.types,
      endpoint: 'mapbox.places',
      // fuzzyMatch: search.fuzzy, //todo  --> add to plugin
      proximity: proximity,
      limit: geocoder.options.limit,
      // routing: search.routing, //todo --> add to plugin
      mapZoom: zoom,
      keyboardLocale: this.locale
    }

    // get the text in the search bar
    if (event === "search.select"){
      payload.queryString = geocoder.inputString;
    }else if (event != "search.select" && geocoder._inputEl){
      payload.queryString = geocoder._inputEl.value;
    }else{
      payload.queryString = geocoder.inputString;
    }
    return payload;
  },

  /**
   * Wraps the request function for easier testing
   * Make an http request and invoke a callback
   * @private
   * @param {Object} opts options describing the http request to be made
   * @param {Function} callback the callback to invoke when the http request is completed
   */
  request: function (opts, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 ) {
        if (this.status == 204){
          //success
          return callback(null);
        }else {
          return callback(this.statusText);
        }
      }
    };

    xhttp.open(opts.method, opts.host + '/' + opts.path, true);
    for (var header in opts.headers){
      var headerValue = opts.headers[header];
      xhttp.setRequestHeader(header, headerValue)
    }
    xhttp.send(opts.body);
  },

  /**
   * Handle an error that occurred while making a request
   * @param {Object} err an error instance to log
   * @private
   */
  handleError: function (err, callback) {
    if (callback) return callback(err);
  },

  /**
   * Generate a session ID to be returned with all of the searches made by this geocoder instance
   * ID is random and cannot be tracked across sessions
   * @private
   */
  generateSessionID: function () {
    return nanoid();
  },

  /**
   * Get a user agent string to send with the request to the events service
   * @private
   */
  getUserAgent: function () {
    return 'mapbox-gl-geocoder.' + this.version + "." + navigator.userAgent;
  },

  /**
     * Get the 0-based numeric index of the item that the user selected out of the list of options
     * @private
     * @param {Object} selected the geojson feature selected by the user
     * @param {Object} geocoder a Mapbox-GL-Geocoder instance
     * @returns {Number} the index of the selected result
     */
  getSelectedIndex: function(selected, geocoder){
    if (!geocoder._typeahead) return;
    var results = geocoder._typeahead.data;
    var selectedID = selected.id;
    var resultIDs = results.map(function (feature) {
      return feature.id;
    });
    var selectedIdx = resultIDs.indexOf(selectedID);
    return selectedIdx;
  },

  /**
     * Check whether events should be logged
     * Clients using a localGeocoder or an origin other than mapbox should not have events logged
     * @private
     */
  shouldEnableLogging: function(options){
    if (options.enableEventLogging === false) return false;
    if (options.origin && options.origin.indexOf('api.mapbox.com') == -1) return false;
    // hard to make sense of events when a local instance is suplementing results from origin
    if (options.localGeocoder) return false;
    // hard to make sense of events when a custom filter is in use
    if (options.filter) return false;
    return true;
  },

  /**
   * Flush out the event queue by sending events to the events service
   * @private
   */
  flush: function(){
    if (this.eventQueue.length > 0){
      this.send(this.eventQueue);
      this.eventQueue = new Array();
    }
    // //reset the timer
    if (this.timer)  clearTimeout(this.timer);
    if (this.flushInterval) this.timer = setTimeout(this.flush.bind(this), this.flushInterval)
  },

  /**
   * Push event into the pending queue
   * @param {Object} evt the event to send to the events service
   * @param {Boolean} forceFlush indicates that the event queue should be flushed after adding this event regardless of size of the queue
   * @private
   */
  push: function(evt, forceFlush){
    this.eventQueue.push(evt);
    if (this.eventQueue.length >= this.maxQueueSize || forceFlush){
      this.flush();
    }
  },

  /**
   * Flush any remaining events from the queue before it is removed
   * @private
   */
  remove: function(){
    this.flush();
  }
}



module.exports = MapboxEventManager;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  'fr': {
    'name': 'France',
    'bbox': [[-4.59235, 41.380007], [9.560016, 51.148506]]
  },
  'us': {
    'name': 'United States',
    'bbox': [[-171.791111, 18.91619], [-66.96466, 71.357764]]
  },
  'ru': {
    'name': 'Russia',
    'bbox': [[19.66064, 41.151416], [190.10042, 81.2504]]
  },
  'ca': {
    'name': 'Canada',
    'bbox': [[-140.99778, 41.675105], [-52.648099, 83.23324]]
  }
};


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/lib/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Typeahead = __webpack_require__(/*! suggestions */ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/index.js");
var debounce = __webpack_require__(/*! lodash.debounce */ "./node_modules/lodash.debounce/index.js");
var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");
var EventEmitter = __webpack_require__(/*! events */ "./node_modules/events/events.js").EventEmitter;
var exceptions = __webpack_require__(/*! ./exceptions */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/exceptions.js");
var MapboxClient = __webpack_require__(/*! @mapbox/mapbox-sdk */ "./node_modules/@mapbox/mapbox-sdk/index.js");
var mbxGeocoder = __webpack_require__(/*! @mapbox/mapbox-sdk/services/geocoding */ "./node_modules/@mapbox/mapbox-sdk/services/geocoding.js");
var MapboxEventManager = __webpack_require__(/*! ./events */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/events.js");
var localization = __webpack_require__(/*! ./localization */ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js");
var subtag = __webpack_require__(/*! subtag */ "./node_modules/subtag/subtag.js");

/**
 * A geocoder component using Mapbox Geocoding API
 * @class MapboxGeocoder
 * @param {Object} options
 * @param {String} options.accessToken Required.
 * @param {String} options.origin Use to set a custom API origin. Defaults to https://api.mapbox.com.
 * @param {Object} [options.mapboxgl] A [mapbox-gl](https://github.com/mapbox/mapbox-gl-js) instance to use when creating [Markers](https://docs.mapbox.com/mapbox-gl-js/api/#marker). Required if `options.marker` is true.
 * @param {Number} [options.zoom=16] On geocoded result what zoom level should the map animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
 * @param {Boolean|Object} [options.flyTo] If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, the object will be passed to the map method to specify a custom animation when a result is selected.
 * @param {String} [options.placeholder="Search"] Override the default placeholder attribute value.
 * @param {Object} [options.proximity] a proximity argument: this is
 * a geographical point given as an object with latitude and longitude
 * properties. Search results closer to this point will be given
 * higher priority.
 * @param {Boolean} [options.trackProximity=true] If true, the geocoder proximity will automatically update based on the map view.
 * @param {Boolean} [options.collapsed=false] If true, the geocoder control will collapse until hovered or in focus.
 * @param {Boolean} [options.clearAndBlurOnEsc=false] If true, the geocoder control will clear it's contents and blur when user presses the escape key.
 * @param {Boolean} [options.clearOnBlur=false] If true, the geocoder control will clear its value when the input blurs.
 * @param {Array} [options.bbox] a bounding box argument: this is
 * a bounding box given as an array in the format [minX, minY, maxX, maxY].
 * Search results will be limited to the bounding box.
 * @param {string} [options.countries] a comma separated list of country codes to
 * limit results to specified country or countries.
 * @param {string} [options.types] a comma seperated list of types that filter
 * results to match those specified. See https://docs.mapbox.com/api/search/#data-types
 * for available types.
 * If reverseGeocode is enabled, you should specify one type. If you configure more than one type, the first type will be used.
 * @param {Number} [options.minLength=2] Minimum number of characters to enter before results are shown.
 * @param {Number} [options.limit=5] Maximum number of results to show.
 * @param {string} [options.language] Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas.
 * @param {Function} [options.filter] A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
 * @param {Function} [options.localGeocoder] A function accepting the query string which performs local geocoding to supplement results from the Mapbox Geocoding API. Expected to return an Array of GeoJSON Features in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format.
 * @param {'distance'|'score'} [options.reverseMode='distance'] - Set the factors that are used to sort nearby results.
 * @param {boolean} [options.reverseGeocode] Enable reverse geocoding. Defaults to false. Expects coordinates to be lat, lon.
 * @param {Boolean} [options.enableEventLogging=true] Allow Mapbox to collect anonymous usage statistics from the plugin
 * @param {Boolean|Object} [options.marker=true]  If `true`, a [Marker](https://docs.mapbox.com/mapbox-gl-js/api/#marker) will be added to the map at the location of the user-selected result using a default set of Marker options.  If the value is an object, the marker will be constructed using these options. If `false`, no marker will be added to the map. Requires that `options.mapboxgl` also be set.
 * @param {Function} [options.render] A function that specifies how the results should be rendered in the dropdown menu. Accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object  as input and return a string. Any html in the returned string will be rendered.
 * @param {Function} [options.getItemValue] A function that specifies how the selected result should be rendered in the search bar. This function should accept a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object  as input and return a string. HTML tags in the output string will not be rendered.
 * @example
 * var geocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken });
 * map.addControl(geocoder);
 * @return {MapboxGeocoder} `this`
 *
 */

function MapboxGeocoder(options) {
  this._eventEmitter = new EventEmitter();
  this.options = extend({}, this.options, options);
  this.inputString = '';
  this.fresh = true;
  this.lastSelected = null;
}

MapboxGeocoder.prototype = {
  options: {
    zoom: 16,
    flyTo: true,
    trackProximity: true,
    minLength: 2,
    reverseGeocode: false,
    limit: 5,
    origin: 'https://api.mapbox.com',
    enableEventLogging: true,
    marker: true,
    mapboxgl: null,
    collapsed: false,
    clearAndBlurOnEsc: false,
    clearOnBlur: false,
    getItemValue: function(item) {
      return item.place_name
    },
    render: function(item) {
      var placeName = item.place_name.split(',');
      return '<div class="mapboxgl-ctrl-geocoder--suggestion"><div class="mapboxgl-ctrl-geocoder--suggestion-title">' + placeName[0]+ '</div><div class="mapboxgl-ctrl-geocoder--suggestion-address">' + placeName.splice(1, placeName.length).join(',') + '</div></div>';
    }
  },

  onAdd: function(map) {
    this._map = map;

    this.setLanguage();

    this.geocoderService = mbxGeocoder(
      MapboxClient({
        accessToken: this.options.accessToken,
        origin: this.options.origin
      })
    );

    this.eventManager = new MapboxEventManager(this.options);

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onBlur = this._onBlur.bind(this);
    this._showButton = this._showButton.bind(this);
    this._hideButton = this._hideButton.bind(this);
    this._onQueryResult = this._onQueryResult.bind(this);
    this.clear = this.clear.bind(this);
    this._updateProximity = this._updateProximity.bind(this);
    this._collapse = this._collapse.bind(this);
    this._unCollapse = this._unCollapse.bind(this);
    this._clear = this._clear.bind(this);
    this._clearOnBlur = this._clearOnBlur.bind(this);

    var el = (this.container = document.createElement('div'));
    el.className = 'mapboxgl-ctrl-geocoder mapboxgl-ctrl';

    var searchIcon = this.createIcon('search', '<path d="M7.4 2.5c-2.7 0-4.9 2.2-4.9 4.9s2.2 4.9 4.9 4.9c1 0 1.8-.2 2.5-.8l3.7 3.7c.2.2.4.3.8.3.7 0 1.1-.4 1.1-1.1 0-.3-.1-.5-.3-.8L11.4 10c.4-.8.8-1.6.8-2.5.1-2.8-2.1-5-4.8-5zm0 1.6c1.8 0 3.2 1.4 3.2 3.2s-1.4 3.2-3.2 3.2-3.3-1.3-3.3-3.1 1.4-3.3 3.3-3.3z"/>')

    this._inputEl = document.createElement('input');
    this._inputEl.type = 'text';
    this._inputEl.className = 'mapboxgl-ctrl-geocoder--input';

    this.setPlaceholder();

    if (this.options.collapsed) {
      this._collapse();
      this.container.addEventListener('mouseenter', this._unCollapse);
      this.container.addEventListener('mouseleave', this._collapse);
      this._inputEl.addEventListener('focus', this._unCollapse);
    }

    if (this.options.collapsed || this.options.clearOnBlur) {
      this._inputEl.addEventListener('blur', this._onBlur);
    }

    this._inputEl.addEventListener('keydown', debounce(this._onKeyDown, 200));
    this._inputEl.addEventListener('change', this._onChange);
    this.container.addEventListener('mouseenter', this._showButton);
    this.container.addEventListener('mouseleave', this._hideButton);
    this._inputEl.addEventListener('keyup', function(e){
      this.eventManager.keyevent(e, this);
    }.bind(this));

    var actions = document.createElement('div');
    actions.classList.add('mapboxgl-ctrl-geocoder--pin-right');

    this._clearEl = document.createElement('button');
    this._clearEl.setAttribute('aria-label', 'Clear');
    this._clearEl.addEventListener('click', this.clear);
    this._clearEl.className = 'mapboxgl-ctrl-geocoder--button';

    var buttonIcon = this.createIcon('close', '<path d="M3.8 2.5c-.6 0-1.3.7-1.3 1.3 0 .3.2.7.5.8L7.2 9 3 13.2c-.3.3-.5.7-.5 1 0 .6.7 1.3 1.3 1.3.3 0 .7-.2 1-.5L9 10.8l4.2 4.2c.2.3.7.3 1 .3.6 0 1.3-.7 1.3-1.3 0-.3-.2-.7-.3-1l-4.4-4L15 4.6c.3-.2.5-.5.5-.8 0-.7-.7-1.3-1.3-1.3-.3 0-.7.2-1 .3L9 7.1 4.8 2.8c-.3-.1-.7-.3-1-.3z"/>')
    this._clearEl.appendChild(buttonIcon);

    this._loadingEl = this.createIcon('loading', '<path fill="#333" d="M4.4 4.4l.8.8c2.1-2.1 5.5-2.1 7.6 0l.8-.8c-2.5-2.5-6.7-2.5-9.2 0z"/><path opacity=".1" d="M12.8 12.9c-2.1 2.1-5.5 2.1-7.6 0-2.1-2.1-2.1-5.5 0-7.7l-.8-.8c-2.5 2.5-2.5 6.7 0 9.2s6.6 2.5 9.2 0 2.5-6.6 0-9.2l-.8.8c2.2 2.1 2.2 5.6 0 7.7z"/>');

    actions.appendChild(this._clearEl);
    actions.appendChild(this._loadingEl);

    el.appendChild(searchIcon);
    el.appendChild(this._inputEl);
    el.appendChild(actions);

    this._typeahead = new Typeahead(this._inputEl, [], {
      filter: false,
      minLength: this.options.minLength,
      limit: this.options.limit
    });

    this.setRenderFunction(this.options.render);
    this._typeahead.getItemValue = this.options.getItemValue;

    if (this.options.trackProximity) {
      this._updateProximity();
      this._map.on('moveend', this._updateProximity);
    }

    this.mapMarker = null;
    this._handleMarker = this._handleMarker.bind(this);

    this._mapboxgl = this.options.mapboxgl;
    if (!this._mapboxgl && this.options.marker) {
      console.error("No mapboxgl detected in options. Map markers are disabled. Please set options.mapboxgl.");
      this.options.marker = false;
    }

    return el;
  },

  createIcon: function(name, path) {
    var icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', 'mapboxgl-ctrl-geocoder--icon mapboxgl-ctrl-geocoder--icon-' + name);
    icon.setAttribute('viewBox', '0 0 18 18');
    icon.setAttribute('xml:space','preserve');
    icon.setAttribute('width', 18);
    icon.setAttribute('height', 18);
    icon.innerHTML = path;
    return icon;
  },

  onRemove: function() {
    this.container.parentNode.removeChild(this.container);

    if (this.options.trackProximity) {
      this._map.off('moveend', this._updateProximity);
    }

    this._removeMarker();

    this._map = null;

    return this;
  },

  _onKeyDown: function(e) {
    var ESC_KEY_CODE = 27,
      TAB_KEY_CODE = 9;

    if (e.keyCode === ESC_KEY_CODE && this.options.clearAndBlurOnEsc) {
      this._clear(e);
      return this._inputEl.blur();
    }

    // if target has shadowRoot, then get the actual active element inside the shadowRoot
    var target = e.target && e.target.shadowRoot
      ? e.target.shadowRoot.activeElement
      : e.target;
    var value = target ? target.value : '';
    if (!value) {
      this.fresh = true;
      // the user has removed all the text
      if (e.keyCode !== TAB_KEY_CODE) this.clear(e);
      return (this._clearEl.style.display = 'none');
    }

    // TAB, ESC, LEFT, RIGHT, ENTER, UP, DOWN
    if (e.metaKey || [TAB_KEY_CODE, ESC_KEY_CODE, 37, 39, 13, 38, 40].indexOf(e.keyCode) !== -1)
      return;

    if (target.value.length >= this.options.minLength) {
      this._geocode(target.value);
    }
  },

  _showButton: function() {
    if (this._typeahead.selected) this._clearEl.style.display = 'block';
  },

  _hideButton: function() {
    if (this._typeahead.selected) this._clearEl.style.display = 'none';
  },

  _onBlur: function(e) {
    if (this.options.clearOnBlur) {
      this._clearOnBlur(e);
    }
    if (this.options.collapsed) {
      this._collapse();
    }
  },
  _onChange: function() {
    var selected = this._typeahead.selected;
    if (selected  && selected.id !== this.lastSelected) {
      this._clearEl.style.display = 'none';
      if (this.options.flyTo) {
        var flyOptions;
        if (selected.properties && !exceptions[selected.properties.short_code] && selected.bbox) {
          var bbox = selected.bbox;
          flyOptions = extend({}, this.options.flyTo);
          this._map.fitBounds([[bbox[0], bbox[1]], [bbox[2], bbox[3]]], flyOptions);
        } else if (selected.properties && exceptions[selected.properties.short_code]) {
          // Certain geocoder search results return (and therefore zoom to fit)
          // an unexpectedly large bounding box: for example, both Russia and the
          // USA span both sides of -180/180, or France includes the island of
          // Reunion in the Indian Ocean. An incomplete list of these exceptions
          // at ./exceptions.json provides "reasonable" bounding boxes as a
          // short-term solution; this may be amended as necessary.
          flyOptions = extend({}, this.options.flyTo);
          this._map.fitBounds(exceptions[selected.properties.short_code].bbox, flyOptions);
        } else {
          var defaultFlyOptions = {
            zoom: this.options.zoom
          }
          flyOptions = extend({}, defaultFlyOptions, this.options.flyTo);
          //  ensure that center is not overriden by custom options
          flyOptions.center = selected.center;
          this._map.flyTo(flyOptions);
        }
      }
      if (this.options.marker && this._mapboxgl){
        this._handleMarker(selected);
      }

      // After selecting a feature, re-focus the textarea and set
      // cursor at start.
      this._inputEl.focus();
      this._inputEl.scrollLeft = 0;
      this._inputEl.setSelectionRange(0, 0);

      this._eventEmitter.emit('result', { result: selected });
      this.eventManager.select(selected, this);
      this.lastSelected = selected.id;
    }
  },

  _geocode: function(searchInput) {
    this._loadingEl.style.display = 'block';
    this._eventEmitter.emit('loading', { query: searchInput });
    this.inputString = searchInput;
    // Possible config proprerties to pass to client
    var keys = [
      'bbox',
      'limit',
      'proximity',
      'countries',
      'types',
      'language',
      'reverseMode'
    ];
    var self = this;
    // Create config object
    var config = keys.reduce(function(config, key) {
      if (self.options[key]) {
        // countries, types, and language need to be passed in as arrays to client
        // https://github.com/mapbox/mapbox-sdk-js/blob/master/services/geocoding.js#L38-L47
        ['countries', 'types', 'language'].indexOf(key) > -1
          ? (config[key] = self.options[key].split(/[\s,]+/))
          : (config[key] = self.options[key]);

        if (key === 'proximity' && self.options[key] && self.options[key].longitude && self.options[key].latitude) {
          config[key] = [self.options[key].longitude, self.options[key].latitude]
        }
      }
      return config;
    }, {});

    var request;
    // check if searchInput resembles coordinates, and if it does,
    // make the request a reverseGeocode
    if (
      this.options.reverseGeocode &&
      /(-?\d+\.?\d*)[, ]+(-?\d+\.?\d*)[ ]*$/.test(searchInput)
    ) {
      // parse coordinates
      var coords = searchInput.split(/[\s(,)?]+/).map(function(c) {
        return parseFloat(c, 10);
      }).reverse();

      // client only accepts one type for reverseGeocode, so
      // use first config type if one, if not default to poi
      config.types ? [config.types[0]] : ["poi"];
      config = extend(config, { query: coords, limit: 1 });
      request = this.geocoderService.reverseGeocode(config).send();
    } else {
      config = extend(config, { query: searchInput });
      request = this.geocoderService.forwardGeocode(config).send();
    }

    var localGeocoderRes = [];
    if (this.options.localGeocoder) {
      localGeocoderRes = this.options.localGeocoder(searchInput);
      if (!localGeocoderRes) {
        localGeocoderRes = [];
      }
    }

    request.then(
      function(response) {
        this._loadingEl.style.display = 'none';

        var res = {};

        if (response.statusCode == '200') {
          res = response.body;
        }

        res.config = config;
        if (this.fresh){
          this.eventManager.start(this);
          this.fresh = false;
        }

        // supplement Mapbox Geocoding API results with locally populated results
        res.features = res.features
          ? localGeocoderRes.concat(res.features)
          : localGeocoderRes;

        // apply results filter if provided
        if (this.options.filter && res.features.length) {
          res.features = res.features.filter(this.options.filter);
        }

        if (res.features.length) {
          this._clearEl.style.display = 'block';
          this._eventEmitter.emit('results', res);
          this._typeahead.update(res.features);
        } else {
          this._clearEl.style.display = 'none';
          this._typeahead.selected = null;
          this._renderNoResults();
          this._eventEmitter.emit('results', res);
        }

      }.bind(this)
    );

    request.catch(
      function(err) {
        this._loadingEl.style.display = 'none';

        // in the event of an error in the Mapbox Geocoding API still display results from the localGeocoder
        if (localGeocoderRes.length && this.options.localGeocoder) {
          this._clearEl.style.display = 'block';
          this._typeahead.update(localGeocoderRes);
        } else {
          this._clearEl.style.display = 'none';
          this._typeahead.selected = null;
          this._renderError();
        }

        this._eventEmitter.emit('results', { features: localGeocoderRes });
        this._eventEmitter.emit('error', { error: err });
      }.bind(this)
    );

    return request;
  },

  /**
   * Shared logic for clearing input
   * @param {Event} [ev] the event that triggered the clear, if available
   * @private
   *
   */
  _clear: function(ev) {
    if (ev) ev.preventDefault();
    this._inputEl.value = '';
    this._typeahead.selected = null;
    this._typeahead.clear();
    this._onChange();
    this._clearEl.style.display = 'none';
    this._removeMarker();
    this.lastSelected = null;
    this._eventEmitter.emit('clear');
    this.fresh = true;
  },

  /**
   * Clear and then focus the input.
   * @param {Event} [ev] the event that triggered the clear, if available
   *
   */
  clear: function(ev) {
    this._clear(ev);
    this._inputEl.focus();
  },


  /**
   * Clear the input, without refocusing it. Used to implement clearOnBlur
   * constructor option.
   * @param {Event} [ev] the blur event
   * @private
   */
  _clearOnBlur: function(ev) {
    var ctx = this;

    /**
    * If relatedTarget is not found, assume user targeted the suggestions list.
    * In that case, do not clear on blur. There are other edge cases where
    * ev.relatedTarget could be null. Clicking on list always results in null
    * relatedtarget because of upstream behavior in `suggestions`.
    *
    * The ideal solution would be to check if ev.relatedTarget is a child of
    * the list. See issue #258 for details on why we can't do that yet.
    */
    if (ev.relatedTarget) {
      ctx._clear(ev);
    }
  },

  _onQueryResult: function(response) {
    var results = response.body;
    if (!results.features.length) return;
    var result = results.features[0];
    this._typeahead.selected = result;
    this._inputEl.value = result.place_name;
    this._onChange();
  },

  _updateProximity: function() {
    // proximity is designed for local scale, if the user is looking at the whole world,
    // it doesn't make sense to factor in the arbitrary centre of the map
    if (this._map.getZoom() > 9) {
      var center = this._map.getCenter().wrap();
      this.setProximity({ longitude: center.lng, latitude: center.lat });
    } else {
      this.setProximity(null);
    }
  },

  _collapse: function() {
    // do not collapse if input is in focus
    if (!this._inputEl.value && this._inputEl !== document.activeElement) this.container.classList.add('mapboxgl-ctrl-geocoder--collapsed');
  },

  _unCollapse: function() {
    this.container.classList.remove('mapboxgl-ctrl-geocoder--collapsed');
  },

  /**
   * Set & query the input
   * @param {string} searchInput location name or other search input
   * @returns {MapboxGeocoder} this
   */
  query: function(searchInput) {
    this._geocode(searchInput).then(this._onQueryResult);
    return this;
  },

  _renderError: function(){
    var errorMessage = "<div class='mapbox-gl-geocoder--error'>There was an error reaching the server</div>"
    this._renderMessage(errorMessage);
  },

  _renderNoResults: function(){
    var errorMessage = "<div class='mapbox-gl-geocoder--error mapbox-gl-geocoder--no-results'>No results found</div>";
    this._renderMessage(errorMessage);
  },

  _renderMessage: function(msg){
    this._typeahead.update([]);
    this._typeahead.selected = null;
    this._typeahead.clear();
    this._typeahead.renderError(msg);
  },

  /**
   * Get the text to use as the search bar placeholder
   *
   * If placeholder is provided in options, then use options.placeholder
   * Otherwise, if language is provided in options, then use the localized string of the first language if available
   * Otherwise use the default
   *
   * @returns {String} the value to use as the search bar placeholder
   * @private
   */
  _getPlaceholderText: function(){
    if (this.options.placeholder) return this.options.placeholder;
    if (this.options.language){
      var firstLanguage = this.options.language.split(",")[0];
      var language = subtag.language(firstLanguage);
      var localizedValue = localization.placeholder[language];
      if (localizedValue)  return localizedValue;
    }
    return 'Search';
  },

  /**
   * Set input
   * @param {string} searchInput location name or other search input
   * @returns {MapboxGeocoder} this
   */
  setInput: function(searchInput) {
    // Set input value to passed value and clear everything else.
    this._inputEl.value = searchInput;
    this._typeahead.selected = null;
    this._typeahead.clear();
    this._onChange();
    return this;
  },

  /**
   * Set proximity
   * @param {Object} proximity The new options.proximity value. This is a geographical point given as an object with latitude and longitude properties.
   * @returns {MapboxGeocoder} this
   */
  setProximity: function(proximity) {
    this.options.proximity = proximity;
    return this;
  },

  /**
   * Get proximity
   * @returns {Object} The geocoder proximity
   */
  getProximity: function() {
    return this.options.proximity;
  },

  /**
   * Set the render function used in the results dropdown
   * @param {Function} fn The function to use as a render function. This function accepts a single [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) object as input and returns a string.
   * @returns {MapboxGeocoder} this
   */
  setRenderFunction: function(fn){
    if (fn && typeof(fn) == "function"){
      this._typeahead.render = fn;
    }
    return this;
  },

  /**
   * Get the function used to render the results dropdown
   *
   * @returns {Function} the render function
   */
  getRenderFunction: function(){
    return this._typeahead.render;
  },

  /**
   * Get the language to use in UI elements and when making search requests
   *
   * Look first at the explicitly set options otherwise use the browser's language settings
   * @param {String} language Specify the language to use for response text and query result weighting. Options are IETF language tags comprised of a mandatory ISO 639-1 language code and optionally one or more IETF subtags for country or script. More than one value can also be specified, separated by commas.
   * @returns {MapboxGeocoder} this
   */
  setLanguage: function(language){
    var browserLocale = navigator.language || navigator.userLanguage || navigator.browserLanguage;
    this.options.language = language || this.options.language || browserLocale;
    return this;
  },

  /**
   * Get the language to use in UI elements and when making search requests
   * @returns {String} The language(s) used by the plugin, if any
   */
  getLanguage: function(){
    return this.options.language;
  },

  /**
   * Get the zoom level the map will move to when there is no bounding box on the selected result
   * @returns {Number} the map zoom
   */
  getZoom: function(){
    return this.options.zoom;
  },

  /**
   * Set the zoom level
   * @param {Number} zoom The zoom level that the map should animate to when a `bbox` isn't found in the response. If a `bbox` is found the map will fit to the `bbox`.
   * @returns {MapboxGeocoder} this
   */
  setZoom: function(zoom){
    this.options.zoom = zoom;
    return this;
  },

  /**
   * Get the parameters used to fly to the selected response, if any
   * @returns {MapboxGeocoder} this
   */
  getFlyTo: function(){
    return this.options.flyTo;
  },

  /**
   * Set the flyTo options
   * @param {Object|Boolean} flyTo  If false, animating the map to a selected result is disabled. If true, animating the map will use the default animation parameters. If an object, the object will be passed to the flyTo map method to specify a custom animation.
   */
  setFlyTo: function(flyTo){
    this.options.flyTo = flyTo;
    return this;
  },

  /**
   * Get the value of the placeholder string
   * @returns {String} The input element's placeholder value
   */
  getPlaceholder: function(){
    return this.options.placeholder;
  },

  /**
   * Set the value of the input element's placeholder
   * @param {String} placeholder the text to use as the input element's placeholder
   * @returns {MapboxGeocoder} this
   */
  setPlaceholder: function(placeholder){
    this.placeholder = (placeholder) ? placeholder : this._getPlaceholderText();
    this._inputEl.placeholder = this.placeholder;
    return this
  },

  /**
   * Get the bounding box used by the plugin
   * @returns {Array<Number>} the bounding box, if any
   */
  getBbox: function(){
    return this.options.bbox;
  },

  /**
   * Set the bounding box to limit search results to
   * @param {Array<Number>} bbox a bounding box given as an array in the format [minX, minY, maxX, maxY].
   * @returns {MapboxGeocoder} this
   */
  setBbox: function(bbox){
    this.options.bbox = bbox;
    return this;
  },

  /**
   * Get a list of the countries to limit search results to
   * @returns {String} a comma separated list of countries to limit to, if any
   */
  getCountries: function(){
    return this.options.countries;
  },

  /**
   * Set the countries to limit search results to
   * @param {String} countries a comma separated list of countries to limit to
   * @returns {MapboxGeocoder} this
   */
  setCountries: function(countries){
    this.options.countries = countries;
    return this;
  },

  /**
   * Get a list of the types to limit search results to
   * @returns {String} a comma separated list of types to limit to
   */
  getTypes: function(){
    return this.options.types;
  },

  /**
   * Set the types to limit search results to
   * @param {String} countries a comma separated list of types to limit to
   * @returns {MapboxGeocoder} this
   */
  setTypes: function(types){
    this.options.types = types;
    return this;
  },

  /**
   * Get the minimum number of characters typed to trigger results used in the plugin
   * @returns {Number} The minimum length in characters before a search is triggered
   */
  getMinLength: function(){
    return this.options.minLength;
  },

  /**
   * Set the minimum number of characters typed to trigger results used by the plugin
   * @param {Number} minLength the minimum length in characters
   * @returns {MapboxGeocoder} this
   */
  setMinLength: function(minLength){
    this.options.minLength = minLength;
    if (this._typeahead)  this._typeahead.minLength = minLength;
    return this;
  },

  /**
   * Get the limit value for the number of results to display used by the plugin
   * @returns {Number} The limit value for the number of results to display used by the plugin
   */
  getLimit: function(){
    return this.options.limit;
  },

  /**
   * Set the limit value for the number of results to display used by the plugin
   * @param {Number} limit the number of search results to return
   * @returns {MapboxGeocoder}
   */
  setLimit: function(limit){
    this.options.limit = limit;
    if (this._typeahead) this._typeahead.options.limit = limit;
    return this;
  },

  /**
   * Get the filter function used by the plugin
   * @returns {Function} the filter function
   */
  getFilter: function(){
    return this.options.filter;
  },

  /**
   * Set the filter function used by the plugin.
   * @param {Function} filter A function which accepts a Feature in the [Carmen GeoJSON](https://github.com/mapbox/carmen/blob/master/carmen-geojson.md) format to filter out results from the Geocoding API response before they are included in the suggestions list. Return `true` to keep the item, `false` otherwise.
   * @returns {MapboxGeocoder} this
   */
  setFilter: function(filter){
    this.options.filter = filter;
    return this;
  },

  /**
   * Handle the placement of a result marking the selected result
   * @private
   * @param {Object} selected the selected geojson feature
   * @returns {MapboxGeocoder} this
   */
  _handleMarker: function(selected){
    // clean up any old marker that might be present
    this._removeMarker();
    var defaultMarkerOptions = {
      color: '#4668F2'
    }
    var markerOptions = extend({}, defaultMarkerOptions, this.options.marker)
    this.mapMarker = new this._mapboxgl.Marker(markerOptions);
    this.mapMarker
      .setLngLat(selected.center)
      .addTo(this._map);
    return this;
  },

  /**
   * Handle the removal of a result marker
   * @private
   */
  _removeMarker: function(){
    if (this.mapMarker){
      this.mapMarker.remove();
      this.mapMarker = null;
    }
  },

  /**
   * Subscribe to events that happen within the plugin.
   * @param {String} type name of event. Available events and the data passed into their respective event objects are:
   *
   * - __clear__ `Emitted when the input is cleared`
   * - __loading__ `{ query } Emitted when the geocoder is looking up a query`
   * - __results__ `{ results } Fired when the geocoder returns a response`
   * - __result__ `{ result } Fired when input is set`
   * - __error__ `{ error } Error as string`
   * @param {Function} fn function that's called when the event is emitted.
   * @returns {MapboxGeocoder} this;
   */
  on: function(type, fn) {
    this._eventEmitter.on(type, fn);
    return this;
  },

  /**
   * Remove an event
   * @returns {MapboxGeocoder} this
   * @param {String} type Event name.
   * @param {Function} fn Function that should unsubscribe to the event emitted.
   */
  off: function(type, fn) {
    this._eventEmitter.removeListener(type, fn);
    this.eventManager.remove();
    return this;
  }
};

module.exports = MapboxGeocoder;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/lib/localization.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Localized values for the placeholder string
 * 
 * @private
 */
var placeholder = {
    // list drawn from https://docs.mapbox.com/api/search/#language-coverage
  'de': 'Suche', // german
  'it': 'Ricerca', //italian
  'en': 'Search', // english
  'nl': 'Zoeken', //dutch
  'fr': 'Chercher',  //french
  'ca': 'Cerca', //catalan
  'he': 'לחפש', //hebrew
  'ja': 'サーチ',  //japanese
  'lv': 'Meklēt', //latvian
  'pt': 'Procurar', //portuguese 
  'sr': 'Претрага', //serbian
  'zh': '搜索', //chinese-simplified
  'cs': 'Vyhledávání', //czech
  'hu': 'Keresés', //hungarian
  'ka': 'ძიება', // georgian
  'nb': 'Søke', //norwegian
  'sk': 'Vyhľadávanie', //slovak
  'th': 'ค้นหา', //thai
  'fi': 'Hae',//finnish
  'is': 'Leita',//icelandic
  'ko': '수색',//korean
  'pl':  'Szukaj', //polish
  'sl': 'Iskanje' //slovenian
}

module.exports = {placeholder: placeholder};

/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/index.js":
/*!***********************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/index.js ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A typeahead component for inputs
 * @class Suggestions
 *
 * @param {HTMLInputElement} el A valid HTML input element
 * @param {Array} data An array of data used for results
 * @param {Object} options
 * @param {Number} [options.limit=5] Max number of results to display in the auto suggest list.
 * @param {Number} [options.minLength=2] Number of characters typed into an input to trigger suggestions.
 * @return {Suggestions} `this`
 * @example
 * // in the browser
 * var input = document.querySelector('input');
 * var data = [
 *   'Roy Eldridge',
 *   'Roy Hargrove',
 *   'Rex Stewart'
 * ];
 *
 * new Suggestions(input, data);
 *
 * // with options
 * var input = document.querySelector('input');
 * var data = [{
 *   name: 'Roy Eldridge',
 *   year: 1911
 * }, {
 *   name: 'Roy Hargrove',
 *   year: 1969
 * }, {
 *   name: 'Rex Stewart',
 *   year: 1907
 * }];
 *
 * var typeahead = new Suggestions(input, data, {
 *   filter: false, // Disable filtering
 *   minLength: 3, // Number of characters typed into an input to trigger suggestions.
 *   limit: 3 //  Max number of results to display.
 * });
 *
 * // As we're passing an object of an arrays as data, override
 * // `getItemValue` by specifying the specific property to search on.
 * typeahead.getItemValue = function(item) { return item.name };
 *
 * input.addEventListener('change', function() {
 *   console.log(typeahead.selected); // Current selected item.
 * });
 *
 * // With browserify
 * var Suggestions = require('suggestions');
 *
 * new Suggestions(input, data);
 */
var Suggestions = __webpack_require__(/*! ./src/suggestions */ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/suggestions.js");
window.Suggestions = module.exports = Suggestions;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/list.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/list.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

'Use strict';

var List = function(component) {
  this.component = component;
  this.items = [];
  this.active = 0;
  this.wrapper = document.createElement('div');
  this.wrapper.className = 'suggestions-wrapper';
  this.element = document.createElement('ul');
  this.element.className = 'suggestions';
  this.wrapper.appendChild(this.element);

  // selectingListItem is set to true in the time between the mousedown and mouseup when clicking an item in the list
  // mousedown on a list item will cause the input to blur which normally hides the list, so this flag is used to keep
  // the list open until the mouseup
  this.selectingListItem = false;

  component.el.parentNode.insertBefore(this.wrapper, component.el.nextSibling);
  return this;
};

List.prototype.show = function() {
  this.element.style.display = 'block';
};

List.prototype.hide = function() {
  this.element.style.display = 'none';
};

List.prototype.add = function(item) {
  this.items.push(item);
};

List.prototype.clear = function() {
  this.items = [];
  this.active = 0;
};

List.prototype.isEmpty = function() {
  return !this.items.length;
};

List.prototype.isVisible = function() {
  return this.element.style.display === 'block';
};

List.prototype.draw = function() {
  this.element.innerHTML = '';

  if (this.items.length === 0) {
    this.hide();
    return;
  }

  for (var i = 0; i < this.items.length; i++) {
    this.drawItem(this.items[i], this.active === i);
  }

  this.show();
};

List.prototype.drawItem = function(item, active) {
  var li = document.createElement('li'),
    a = document.createElement('a');

  if (active) li.className += ' active';

  a.innerHTML = item.string;

  li.appendChild(a);
  this.element.appendChild(li);

  li.addEventListener('mousedown', function() {
    this.selectingListItem = true;
  }.bind(this));

  li.addEventListener('mouseup', function() {
    this.handleMouseUp.call(this, item);
  }.bind(this));
};

List.prototype.handleMouseUp = function(item) {
  this.selectingListItem = false;
  this.component.value(item.original);
  this.clear();
  this.draw();
};

List.prototype.move = function(index) {
  this.active = index;
  this.draw();
};

List.prototype.previous = function() {
  this.move(this.active === 0 ? this.items.length - 1 : this.active - 1);
};

List.prototype.next = function() {
  this.move(this.active === this.items.length - 1 ? 0 : this.active + 1);
};

List.prototype.drawError = function(msg){
  var li = document.createElement('li');

  li.innerHTML = msg;

  this.element.appendChild(li);
  this.show();
}

module.exports = List;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/suggestions.js":
/*!*********************************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/suggestions.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");
var fuzzy = __webpack_require__(/*! fuzzy */ "./node_modules/fuzzy/lib/fuzzy.js");
var List = __webpack_require__(/*! ./list */ "./node_modules/@mapbox/mapbox-gl-geocoder/node_modules/suggestions/src/list.js");

var Suggestions = function(el, data, options) {
  options = options || {};

  this.options = extend({
    minLength: 2,
    limit: 5,
    filter: true
  }, options);

  this.el = el;
  this.data = data || [];
  this.list = new List(this);

  this.query = '';
  this.selected = null;

  this.list.draw();

  this.el.addEventListener('keyup', function(e) {
    this.handleKeyUp(e.keyCode);
  }.bind(this), false);

  this.el.addEventListener('keydown', function(e) {
    this.handleKeyDown(e);
  }.bind(this));

  this.el.addEventListener('focus', function() {
    this.handleFocus();
  }.bind(this));

  this.el.addEventListener('blur', function() {
    this.handleBlur();
  }.bind(this));

  this.el.addEventListener('paste', function(e) {
    this.handlePaste(e);
  }.bind(this));

  // use user-provided render function if given, otherwise just use the default
  this.render = (this.options.render) ? this.options.render.bind(this) : this.render.bind(this)

  this.getItemValue = (this.options.getItemValue) ? this.options.getItemValue.bind(this) : this.getItemValue.bind(this);

  return this;
};

Suggestions.prototype.handleKeyUp = function(keyCode) {
  // 40 - DOWN
  // 38 - UP
  // 27 - ESC
  // 13 - ENTER
  // 9 - TAB

  if (keyCode === 40 ||
      keyCode === 38 ||
      keyCode === 27 ||
      keyCode === 13 ||
      keyCode === 9) return;

  this.handleInputChange(this.el.value);
};

Suggestions.prototype.handleKeyDown = function(e) {
  switch (e.keyCode) {
    case 13: // ENTER
    case 9: // TAB
      if (!this.list.isEmpty()) {
        if (this.list.isVisible()) {
          e.preventDefault();
        }
        this.value(this.list.items[this.list.active].original);
        this.list.hide();
      }
    break;
    case 27: // ESC
      if (!this.list.isEmpty()) this.list.hide();
    break;
    case 38: // UP
      this.list.previous();
    break;
    case 40: // DOWN
      this.list.next();
    break;
  }
};

Suggestions.prototype.handleBlur = function() {
  if (!this.list.selectingListItem) {
    this.list.hide();
  }
};

Suggestions.prototype.handlePaste = function(e) {
  if (e.clipboardData) {
    this.handleInputChange(e.clipboardData.getData('Text'));
  } else {
    var self = this;
    setTimeout(function () {
      self.handleInputChange(e.target.value);
    }, 100);
  }
};

Suggestions.prototype.handleInputChange = function(query) {
  this.query = this.normalize(query);

  this.list.clear();

  if (this.query.length < this.options.minLength) {
    this.list.draw();
    return;
  }

  this.getCandidates(function(data) {
    for (var i = 0; i < data.length; i++) {
      this.list.add(data[i]);
      if (i === (this.options.limit - 1)) break;
    }
    this.list.draw();
  }.bind(this));
};

Suggestions.prototype.handleFocus = function() {
  if (!this.list.isEmpty()) this.list.show();
  this.list.selectingListItem = false;
};

/**
 * Update data previously passed
 *
 * @param {Array} revisedData
 */
Suggestions.prototype.update = function(revisedData) {
  this.data = revisedData;
  this.handleKeyUp();
};

/**
 * Clears data
 */
Suggestions.prototype.clear = function() {
  this.data = [];
  this.list.clear();
};

/**
 * Normalize the results list and input value for matching
 *
 * @param {String} value
 * @return {String}
 */
Suggestions.prototype.normalize = function(value) {
  value = value.toLowerCase();
  return value;
};

/**
 * Evaluates whether an array item qualifies as a match with the current query
 *
 * @param {String} candidate a possible item from the array passed
 * @param {String} query the current query
 * @return {Boolean}
 */
Suggestions.prototype.match = function(candidate, query) {
  return candidate.indexOf(query) > -1;
};

Suggestions.prototype.value = function(value) {
  this.selected = value;
  this.el.value = this.getItemValue(value);

  if (document.createEvent) {
    var e = document.createEvent('HTMLEvents');
    e.initEvent('change', true, false);
    this.el.dispatchEvent(e);
  } else {
    this.el.fireEvent('onchange');
  }
};

Suggestions.prototype.getCandidates = function(callback) {
  var options = {
    pre: '<strong>',
    post: '</strong>',
    extract: function(d) { return this.getItemValue(d); }.bind(this)
  };
  var results;
  if(this.options.filter){
    results = fuzzy.filter(this.query, this.data, options);

    results = results.map(function(item){
      return {
        original: item.original,
        string: this.render(item.original, item.string)
      };
    }.bind(this))
  }else{
    results = this.data.map(function(d) {
      var renderedString = this.render(d);
      return {
        original: d,
        string: renderedString
      };
    }.bind(this));
  }
  callback(results);
};

/**
 * For a given item in the data array, return what should be used as the candidate string
 *
 * @param {Object|String} item an item from the data array
 * @return {String} item
 */
Suggestions.prototype.getItemValue = function(item) {
  return item;
};

/**
 * For a given item in the data array, return a string of html that should be rendered in the dropdown
 * @param {Object|String} item an item from the data array
 * @param {String} sourceFormatting a string that has pre-formatted html that should be passed directly through the render function 
 * @return {String} html
 */
Suggestions.prototype.render = function(item, sourceFormatting) {
  if (sourceFormatting){
    // use existing formatting on the source string
    return sourceFormatting;
  }
  var boldString = (item.original) ? this.getItemValue(item.original) : this.getItemValue(item);
  var indexString = this.normalize(boldString);
  var indexOfQuery = indexString.lastIndexOf(this.query);
  while (indexOfQuery > -1) {
    var endIndexOfQuery = indexOfQuery + this.query.length;
    boldString = boldString.slice(0, indexOfQuery) + '<strong>' + boldString.slice(indexOfQuery, endIndexOfQuery) + '</strong>' + boldString.slice(endIndexOfQuery);
    indexOfQuery = indexString.slice(0, indexOfQuery).lastIndexOf(this.query);
  }
  return boldString
}

/**
 * Render an custom error message in the suggestions list
 * @param {String} msg An html string to render as an error message
 */
Suggestions.prototype.renderError = function(msg){
  this.list.drawError(msg);
}

module.exports = Suggestions;

/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/index.js":
/*!**************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var client = __webpack_require__(/*! ./lib/client */ "./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js");

module.exports = client;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var browser = __webpack_require__(/*! ./browser-layer */ "./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-layer.js");
var MapiClient = __webpack_require__(/*! ../classes/mapi-client */ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js");

function BrowserClient(options) {
  MapiClient.call(this, options);
}
BrowserClient.prototype = Object.create(MapiClient.prototype);
BrowserClient.prototype.constructor = BrowserClient;

BrowserClient.prototype.sendRequest = browser.browserSend;
BrowserClient.prototype.abortRequest = browser.browserAbort;

/**
 * Create a client for the browser.
 *
 * @param {Object} options
 * @param {string} options.accessToken
 * @param {string} [options.origin]
 * @returns {MapiClient}
 */
function createBrowserClient(options) {
  return new BrowserClient(options);
}

module.exports = createBrowserClient;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-layer.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-layer.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapiResponse = __webpack_require__(/*! ../classes/mapi-response */ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js");
var MapiError = __webpack_require__(/*! ../classes/mapi-error */ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js");
var constants = __webpack_require__(/*! ../constants */ "./node_modules/@mapbox/mapbox-sdk/lib/constants.js");
var parseHeaders = __webpack_require__(/*! ../helpers/parse-headers */ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-headers.js");

// Keys are request IDs, values are XHRs.
var requestsUnderway = {};

function browserAbort(request) {
  var xhr = requestsUnderway[request.id];
  if (!xhr) return;
  xhr.abort();
  delete requestsUnderway[request.id];
}

function createResponse(request, xhr) {
  return new MapiResponse(request, {
    body: xhr.response,
    headers: parseHeaders(xhr.getAllResponseHeaders()),
    statusCode: xhr.status
  });
}

function normalizeBrowserProgressEvent(event) {
  var total = event.total;
  var transferred = event.loaded;
  var percent = (100 * transferred) / total;
  return {
    total: total,
    transferred: transferred,
    percent: percent
  };
}

function sendRequestXhr(request, xhr) {
  return new Promise(function(resolve, reject) {
    xhr.onprogress = function(event) {
      request.emitter.emit(
        constants.EVENT_PROGRESS_DOWNLOAD,
        normalizeBrowserProgressEvent(event)
      );
    };

    var file = request.file;
    if (file) {
      xhr.upload.onprogress = function(event) {
        request.emitter.emit(
          constants.EVENT_PROGRESS_UPLOAD,
          normalizeBrowserProgressEvent(event)
        );
      };
    }

    xhr.onerror = function(error) {
      reject(error);
    };

    xhr.onabort = function() {
      var mapiError = new MapiError({
        request: request,
        type: constants.ERROR_REQUEST_ABORTED
      });
      reject(mapiError);
    };

    xhr.onload = function() {
      delete requestsUnderway[request.id];
      if (xhr.status < 200 || xhr.status >= 400) {
        var mapiError = new MapiError({
          request: request,
          body: xhr.response,
          statusCode: xhr.status
        });
        reject(mapiError);
        return;
      }
      resolve(xhr);
    };

    var body = request.body;

    // matching service needs to send a www-form-urlencoded request
    if (typeof body === 'string') {
      xhr.send(body);
    } else if (body) {
      xhr.send(JSON.stringify(body));
    } else if (file) {
      xhr.send(file);
    } else {
      xhr.send();
    }

    requestsUnderway[request.id] = xhr;
  }).then(function(xhr) {
    return createResponse(request, xhr);
  });
}

// The accessToken argument gives this function flexibility
// for Mapbox's internal client.
function createRequestXhr(request, accessToken) {
  var url = request.url(accessToken);
  var xhr = new window.XMLHttpRequest();
  xhr.open(request.method, url);
  Object.keys(request.headers).forEach(function(key) {
    xhr.setRequestHeader(key, request.headers[key]);
  });
  return xhr;
}

function browserSend(request) {
  return Promise.resolve().then(function() {
    var xhr = createRequestXhr(request, request.client.accessToken);
    return sendRequestXhr(request, xhr);
  });
}

module.exports = {
  browserAbort: browserAbort,
  sendRequestXhr: sendRequestXhr,
  browserSend: browserSend,
  createRequestXhr: createRequestXhr
};


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js":
/*!********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseToken = __webpack_require__(/*! @mapbox/parse-mapbox-token */ "./node_modules/@mapbox/parse-mapbox-token/index.js");
var MapiRequest = __webpack_require__(/*! ./mapi-request */ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js");
var constants = __webpack_require__(/*! ../constants */ "./node_modules/@mapbox/mapbox-sdk/lib/constants.js");

/**
 * A low-level Mapbox API client. Use it to create service clients
 * that share the same configuration.
 *
 * Services and `MapiRequest`s use the underlying `MapiClient` to
 * determine how to create, send, and abort requests in a way
 * that is appropriate to the configuration and environment
 * (Node or the browser).
 *
 * @class MapiClient
 * @property {string} accessToken - The Mapbox access token assigned
 *   to this client.
 * @property {string} [origin] - The origin
 *   to use for API requests. Defaults to https://api.mapbox.com.
 */

function MapiClient(options) {
  if (!options || !options.accessToken) {
    throw new Error('Cannot create a client without an access token');
  }
  // Try parsing the access token to determine right away if it's valid.
  parseToken(options.accessToken);

  this.accessToken = options.accessToken;
  this.origin = options.origin || constants.API_ORIGIN;
}

MapiClient.prototype.createRequest = function createRequest(requestOptions) {
  return new MapiRequest(this, requestOptions);
};

module.exports = MapiClient;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-error.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(/*! ../constants */ "./node_modules/@mapbox/mapbox-sdk/lib/constants.js");

/**
 * A Mapbox API error.
 *
 * If there's an error during the API transaction,
 * the Promise returned by `MapiRequest`'s [`send`](#send)
 * method should reject with a `MapiError`.
 *
 * @class MapiError
 * @hideconstructor
 * @property {MapiRequest} request - The errored request.
 * @property {string} type - The type of error. Usually this is `'HttpError'`.
 *   If the request was aborted, so the error was
 *   not sent from the server, the type will be
 *   `'RequestAbortedError'`.
 * @property {number} [statusCode] - The numeric status code of
 *   the HTTP response.
 * @property {Object | string} [body] - If the server sent a response body,
 *   this property exposes that response, parsed as JSON if possible.
 * @property {string} [message] - Whatever message could be derived from the
 *   call site and HTTP response.
 *
 * @param {MapiRequest} options.request
 * @param {number} [options.statusCode]
 * @param {string} [options.body]
 * @param {string} [options.message]
 * @param {string} [options.type]
 */
function MapiError(options) {
  var errorType = options.type || constants.ERROR_HTTP;

  var body;
  if (options.body) {
    try {
      body = JSON.parse(options.body);
    } catch (e) {
      body = options.body;
    }
  } else {
    body = null;
  }

  var message = options.message || null;
  if (!message) {
    if (typeof body === 'string') {
      message = body;
    } else if (body && typeof body.message === 'string') {
      message = body.message;
    } else if (errorType === constants.ERROR_REQUEST_ABORTED) {
      message = 'Request aborted';
    }
  }

  this.message = message;
  this.type = errorType;
  this.statusCode = options.statusCode || null;
  this.request = options.request;
  this.body = body;
}

module.exports = MapiError;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-request.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseToken = __webpack_require__(/*! @mapbox/parse-mapbox-token */ "./node_modules/@mapbox/parse-mapbox-token/index.js");
var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");
var EventEmitter = __webpack_require__(/*! eventemitter3 */ "./node_modules/eventemitter3/index.js");
var urlUtils = __webpack_require__(/*! ../helpers/url-utils */ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js");
var constants = __webpack_require__(/*! ../constants */ "./node_modules/@mapbox/mapbox-sdk/lib/constants.js");

var requestId = 1;

/**
 * A Mapbox API request.
 *
 * Note that creating a `MapiRequest` does *not* send the request automatically.
 * Use the request's `send` method to send it off and get a `Promise`.
 *
 * The `emitter` property is an `EventEmitter` that emits the following events:
 *
 * - `'response'` - Listeners will be called with a `MapiResponse`.
 * - `'error'` - Listeners will be called with a `MapiError`.
 * - `'downloadProgress'` - Listeners will be called with `ProgressEvents`.
 * - `'uploadProgress'` - Listeners will be called with `ProgressEvents`.
 *   Upload events are only available when the request includes a file.
 *
 * @class MapiRequest
 * @property {EventEmitter} emitter - An event emitter. See above.
 * @property {MapiClient} client - This request's `MapiClient`.
 * @property {MapiResponse|null} response - If this request has been sent and received
 *   a response, the response is available on this property.
 * @property {MapiError|Error|null} error - If this request has been sent and
 *   received an error in response, the error is available on this property.
 * @property {boolean} aborted - If the request has been aborted
 *   (via [`abort`](#abort)), this property will be `true`.
 * @property {boolean} sent - If the request has been sent, this property will
 *   be `true`. You cannot send the same request twice, so if you need to create
 *   a new request that is the equivalent of an existing one, use
 *   [`clone`](#clone).
 * @property {string} path - The request's path, including colon-prefixed route
 *   parameters.
 * @property {string} origin - The request's origin.
 * @property {string} method - The request's HTTP method.
 * @property {Object} query - A query object, which will be transformed into
 *   a URL query string.
 * @property {Object} params - A route parameters object, whose values will
 *   be interpolated the path.
 * @property {Object} headers - The request's headers.
 * @property {Object|string|null} body - Data to send with the request.
 *   If the request has a body, it will also be sent with the header
 *   `'Content-Type: application/json'`.
 * @property {Blob|ArrayBuffer|string|ReadStream} file - A file to
 *   send with the request. The browser client accepts Blobs and ArrayBuffers;
 *   the Node client accepts strings (filepaths) and ReadStreams.
 */

/**
 * @ignore
 * @param {MapiClient} client
 * @param {Object} options
 * @param {string} options.method
 * @param {string} options.path
 * @param {Object} [options.query={}]
 * @param {Object} [options.params={}]
 * @param {string} [options.origin]
 * @param {Object} [options.headers]
 * @param {Object} [options.body=null]
 * @param {Blob|ArrayBuffer|string|ReadStream} [options.file=null]
 */
function MapiRequest(client, options) {
  if (!client) {
    throw new Error('MapiRequest requires a client');
  }
  if (!options || !options.path || !options.method) {
    throw new Error(
      'MapiRequest requires an options object with path and method properties'
    );
  }

  var defaultHeaders = {};
  if (options.body) {
    defaultHeaders['content-type'] = 'application/json';
  }

  var headersWithDefaults = xtend(defaultHeaders, options.headers);

  // Disallows duplicate header names of mixed case,
  // e.g. Content-Type and content-type.
  var headers = Object.keys(headersWithDefaults).reduce(function(memo, name) {
    memo[name.toLowerCase()] = headersWithDefaults[name];
    return memo;
  }, {});

  this.id = requestId++;
  this._options = options;

  this.emitter = new EventEmitter();
  this.client = client;
  this.response = null;
  this.error = null;
  this.sent = false;
  this.aborted = false;
  this.path = options.path;
  this.method = options.method;
  this.origin = options.origin || client.origin;
  this.query = options.query || {};
  this.params = options.params || {};
  this.body = options.body || null;
  this.file = options.file || null;
  this.headers = headers;
}

/**
 * Get the URL of the request.
 *
 * @param {string} [accessToken] - By default, the access token of the request's
 *   client is used.
 * @return {string}
 */
MapiRequest.prototype.url = function url(accessToken) {
  var url = urlUtils.prependOrigin(this.path, this.origin);
  url = urlUtils.appendQueryObject(url, this.query);
  var routeParams = this.params;
  if (accessToken) {
    url = urlUtils.appendQueryParam(url, 'access_token', accessToken);
    var accessTokenOwnerId = parseToken(accessToken).user;
    routeParams = xtend({ ownerId: accessTokenOwnerId }, routeParams);
  }
  url = urlUtils.interpolateRouteParams(url, routeParams);
  return url;
};

/**
 * Send the request. Returns a Promise that resolves with a `MapiResponse`.
 * You probably want to use `response.body`.
 *
 * `send` only retrieves the first page of paginated results. You can get
 * the next page by using the `MapiResponse`'s [`nextPage`](#nextpage)
 * function, or iterate through all pages using [`eachPage`](#eachpage)
 * instead of `send`.
 *
 * @returns {Promise<MapiResponse>}
 */
MapiRequest.prototype.send = function send() {
  var self = this;

  if (self.sent) {
    throw new Error(
      'This request has already been sent. Check the response and error properties. Create a new request with clone().'
    );
  }
  self.sent = true;

  return self.client.sendRequest(self).then(
    function(response) {
      self.response = response;
      self.emitter.emit(constants.EVENT_RESPONSE, response);
      return response;
    },
    function(error) {
      self.error = error;
      self.emitter.emit(constants.EVENT_ERROR, error);
      throw error;
    }
  );
};

/**
 * Abort the request.
 *
 * Any pending `Promise` returned by [`send`](#send) will be rejected with
 * an error with `type: 'RequestAbortedError'`. If you've created a request
 * that might be aborted, you need to catch and handle such errors.
 *
 * This method will also abort any requests created while fetching subsequent
 * pages via [`eachPage`](#eachpage).
 *
 * If the request has not been sent or has already been aborted, nothing
 * will happen.
 */
MapiRequest.prototype.abort = function abort() {
  if (this._nextPageRequest) {
    this._nextPageRequest.abort();
    delete this._nextPageRequest;
  }

  if (this.response || this.error || this.aborted) return;

  this.aborted = true;
  this.client.abortRequest(this);
};

/**
 * Invoke a callback for each page of a paginated API response.
 *
 * The callback should have the following signature:
 *
 * ```js
 * (
 *   error: MapiError,
 *   response: MapiResponse,
 *   next: () => void
 * ) => void
 * ```
 *
 * **The next page will not be fetched until you've invoked the
 * `next` callback**, indicating that you're ready for it.
 *
 * @param {Function} callback
 */
MapiRequest.prototype.eachPage = function eachPage(callback) {
  var self = this;

  function handleResponse(response) {
    function getNextPage() {
      delete self._nextPageRequest;
      var nextPageRequest = response.nextPage();
      if (nextPageRequest) {
        self._nextPageRequest = nextPageRequest;
        getPage(nextPageRequest);
      }
    }
    callback(null, response, getNextPage);
  }

  function handleError(error) {
    callback(error, null, function() {});
  }

  function getPage(request) {
    request.send().then(handleResponse, handleError);
  }
  getPage(this);
};

/**
 * Clone this request.
 *
 * Each request can only be sent *once*. So if you'd like to send the
 * same request again, clone it and send away.
 *
 * @returns {MapiRequest} - A new `MapiRequest` configured just like this one.
 */
MapiRequest.prototype.clone = function clone() {
  return this._extend();
};

/**
 * @ignore
 */
MapiRequest.prototype._extend = function _extend(options) {
  var extendedOptions = xtend(this._options, options);
  return new MapiRequest(this.client, extendedOptions);
};

module.exports = MapiRequest;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-response.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parseLinkHeader = __webpack_require__(/*! ../helpers/parse-link-header */ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js");

/**
 * A Mapbox API response.
 *
 * @class MapiResponse
 * @property {Object} body - The response body, parsed as JSON.
 * @property {string} rawBody - The raw response body.
 * @property {number} statusCode - The response's status code.
 * @property {Object} headers - The parsed response headers.
 * @property {Object} links - The parsed response links.
 * @property {MapiRequest} request - The response's originating `MapiRequest`.
 */

/**
 * @ignore
 * @param {MapiRequest} request
 * @param {Object} responseData
 * @param {Object} responseData.headers
 * @param {string} responseData.body
 * @param {number} responseData.statusCode
 */
function MapiResponse(request, responseData) {
  this.request = request;
  this.headers = responseData.headers;
  this.rawBody = responseData.body;
  this.statusCode = responseData.statusCode;
  try {
    this.body = JSON.parse(responseData.body || '{}');
  } catch (parseError) {
    this.body = responseData.body;
  }
  this.links = parseLinkHeader(this.headers.link);
}

/**
 * Check if there is a next page that you can fetch.
 *
 * @returns {boolean}
 */
MapiResponse.prototype.hasNextPage = function hasNextPage() {
  return !!this.links.next;
};

/**
 * Create a request for the next page, if there is one.
 * If there is no next page, returns `null`.
 *
 * @returns {MapiRequest | null}
 */
MapiResponse.prototype.nextPage = function nextPage() {
  if (!this.hasNextPage()) return null;
  return this.request._extend({
    path: this.links.next.url
  });
};

module.exports = MapiResponse;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/constants.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/constants.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  API_ORIGIN: 'https://api.mapbox.com',
  EVENT_PROGRESS_DOWNLOAD: 'downloadProgress',
  EVENT_PROGRESS_UPLOAD: 'uploadProgress',
  EVENT_ERROR: 'error',
  EVENT_RESPONSE: 'response',
  ERROR_HTTP: 'HttpError',
  ERROR_REQUEST_ABORTED: 'RequestAbortedError'
};


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-headers.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-headers.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function parseSingleHeader(raw) {
  var boundary = raw.indexOf(':');
  var name = raw
    .substring(0, boundary)
    .trim()
    .toLowerCase();
  var value = raw.substring(boundary + 1).trim();
  return {
    name: name,
    value: value
  };
}

/**
 * Parse raw headers into an object with lowercase properties.
 * Does not fully parse headings into more complete data structure,
 * as larger libraries might do. Also does not deal with duplicate
 * headers because Node doesn't seem to deal with those well, so
 * we shouldn't let the browser either, for consistency.
 *
 * @param {string} raw
 * @returns {Object}
 */
function parseHeaders(raw) {
  var headers = {};
  if (!raw) {
    return headers;
  }

  raw
    .trim()
    .split(/[\r|\n]+/)
    .forEach(function(rawHeader) {
      var parsed = parseSingleHeader(rawHeader);
      headers[parsed.name] = parsed.value;
    });

  return headers;
}

module.exports = parseHeaders;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/helpers/parse-link-header.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Like https://github.com/thlorenz/lib/parse-link-header but without any
// additional dependencies.

function parseParam(param) {
  var parts = param.match(/\s*(.+)\s*=\s*"?([^"]+)"?/);
  if (!parts) return null;

  return {
    key: parts[1],
    value: parts[2]
  };
}

function parseLink(link) {
  var parts = link.match(/<?([^>]*)>(.*)/);
  if (!parts) return null;

  var linkUrl = parts[1];
  var linkParams = parts[2].split(';');
  var rel = null;
  var parsedLinkParams = linkParams.reduce(function(result, param) {
    var parsed = parseParam(param);
    if (!parsed) return result;
    if (parsed.key === 'rel') {
      if (!rel) {
        rel = parsed.value;
      }
      return result;
    }
    result[parsed.key] = parsed.value;
    return result;
  }, {});
  if (!rel) return null;

  return {
    url: linkUrl,
    rel: rel,
    params: parsedLinkParams
  };
}

/**
 * Parse a Link header.
 *
 * @param {string} linkHeader
 * @returns {{
 *   [string]: {
 *     url: string,
 *     params: { [string]: string }
 *   }
 * }}
 */
function parseLinkHeader(linkHeader) {
  if (!linkHeader) return {};

  return linkHeader.split(/,\s*</).reduce(function(result, link) {
    var parsed = parseLink(link);
    if (!parsed) return result;
    // rel value can be multiple whitespace-separated rels.
    var splitRel = parsed.rel.split(/\s+/);
    splitRel.forEach(function(rel) {
      if (!result[rel]) {
        result[rel] = {
          url: parsed.url,
          params: parsed.params
        };
      }
    });
    return result;
  }, {});
}

module.exports = parseLinkHeader;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/lib/helpers/url-utils.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Encode each item of an array individually. The comma
// delimiters should not themselves be encoded.
function encodeArray(arrayValue) {
  return arrayValue.map(encodeURIComponent).join(',');
}

function encodeValue(value) {
  if (Array.isArray(value)) {
    return encodeArray(value);
  }
  return encodeURIComponent(String(value));
}

/**
 * Append a query parameter to a URL.
 *
 * @param {string} url
 * @param {string} key
 * @param {string|number|boolean|Array<*>>} [value] - Provide an array
 *   if the value is a list and commas between values need to be
 *   preserved, unencoded.
 * @returns {string} - Modified URL.
 */
function appendQueryParam(url, key, value) {
  if (value === false || value === null) {
    return url;
  }
  var punctuation = /\?/.test(url) ? '&' : '?';
  var query = encodeURIComponent(key);
  if (value !== undefined && value !== '' && value !== true) {
    query += '=' + encodeValue(value);
  }
  return '' + url + punctuation + query;
}

/**
 * Derive a query string from an object and append it
 * to a URL.
 *
 * @param {string} url
 * @param {Object} [queryObject] - Values should be primitives.
 * @returns {string} - Modified URL.
 */
function appendQueryObject(url, queryObject) {
  if (!queryObject) {
    return url;
  }

  var result = url;
  Object.keys(queryObject).forEach(function(key) {
    var value = queryObject[key];
    if (value === undefined) {
      return;
    }
    if (Array.isArray(value)) {
      value = value
        .filter(function(v) {
          return !!v;
        })
        .join(',');
    }
    result = appendQueryParam(result, key, value);
  });
  return result;
}

/**
 * Prepend an origin to a URL. If the URL already has an
 * origin, do nothing.
 *
 * @param {string} url
 * @param {string} origin
 * @returns {string} - Modified URL.
 */
function prependOrigin(url, origin) {
  if (!origin) {
    return url;
  }

  if (url.slice(0, 4) === 'http') {
    return url;
  }

  var delimiter = url[0] === '/' ? '' : '/';
  return '' + origin.replace(/\/$/, '') + delimiter + url;
}

/**
 * Interpolate values into a route with express-style,
 * colon-prefixed route parameters.
 *
 * @param {string} route
 * @param {Object} [params] - Values should be primitives
 *   or arrays of primitives. Provide an array if the value
 *   is a list and commas between values need to be
 *   preserved, unencoded.
 * @returns {string} - Modified URL.
 */
function interpolateRouteParams(route, params) {
  if (!params) {
    return route;
  }
  return route.replace(/\/:([a-zA-Z0-9]+)/g, function(_, paramId) {
    var value = params[paramId];
    if (value === undefined) {
      throw new Error('Unspecified route parameter ' + paramId);
    }
    var preppedValue = encodeValue(value);
    return '/' + preppedValue;
  });
}

module.exports = {
  appendQueryObject: appendQueryObject,
  appendQueryParam: appendQueryParam,
  prependOrigin: prependOrigin,
  interpolateRouteParams: interpolateRouteParams
};


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/geocoding.js":
/*!***************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/geocoding.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");
var v = __webpack_require__(/*! ./service-helpers/validator */ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js");
var pick = __webpack_require__(/*! ./service-helpers/pick */ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js");
var stringifyBooleans = __webpack_require__(/*! ./service-helpers/stringify-booleans */ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js");
var createServiceFactory = __webpack_require__(/*! ./service-helpers/create-service-factory */ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js");

/**
 * Geocoding API service.
 *
 * Learn more about this service and its responses in
 * [the HTTP service documentation](https://www.mapbox.com/api-documentation/#geocoding).
 */
var Geocoding = {};

var featureTypes = [
  'country',
  'region',
  'postcode',
  'district',
  'place',
  'locality',
  'neighborhood',
  'address',
  'poi',
  'poi.landmark'
];

/**
 * Search for a place.
 *
 * See the [public documentation](https://www.mapbox.com/api-documentation/#search-for-places).
 *
 * @param {Object} config
 * @param {string} config.query - A place name.
 * @param {'mapbox.places'|'mapbox.places-permanent'} [config.mode="mapbox.places"] - Either `mapbox.places` for ephemeral geocoding, or `mapbox.places-permanent` for storing results and batch geocoding.
 * @param {Array<string>} [config.countries] - Limits results to the specified countries.
 *   Each item in the array should be an [ISO 3166 alpha 2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
 * @param {Coordinates} [config.proximity] - Bias local results based on a provided location.
 * @param {Array<'country'|'region'|'postcode'|'district'|'place'|'locality'|'neighborhood'|'address'|'poi'|'poi.landmark'>} [config.types] - Filter results by feature types.
 * @param {boolean} [config.autocomplete=true] - Return autocomplete results or not.
 * @param {BoundingBox} [config.bbox] - Limit results to a bounding box.
 * @param {number} [config.limit=5] - Limit the number of results returned.
 * @param {Array<string>} [config.language] - Specify the language to use for response text and, for forward geocoding, query result weighting.
 *  Options are [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag) comprised of a mandatory
 *  [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and optionally one or more IETF subtags for country or script.
 * @return {MapiRequest}
 */
Geocoding.forwardGeocode = function(config) {
  v.assertShape({
    query: v.required(v.string),
    mode: v.oneOf('mapbox.places', 'mapbox.places-permanent'),
    countries: v.arrayOf(v.string),
    proximity: v.coordinates,
    types: v.arrayOf(v.oneOf(featureTypes)),
    autocomplete: v.boolean,
    bbox: v.arrayOf(v.number),
    limit: v.number,
    language: v.arrayOf(v.string)
  })(config);

  config.mode = config.mode || 'mapbox.places';

  var query = stringifyBooleans(
    xtend(
      { country: config.countries },
      pick(config, [
        'proximity',
        'types',
        'autocomplete',
        'bbox',
        'limit',
        'language'
      ])
    )
  );

  return this.client.createRequest({
    method: 'GET',
    path: '/geocoding/v5/:mode/:query.json',
    params: pick(config, ['mode', 'query']),
    query: query
  });
};

/**
 * Search for places near coordinates.
 *
 * See the [public documentation](https://www.mapbox.com/api-documentation/#retrieve-places-near-a-location).
 *
 * @param {Object} config
 * @param {Coordinates} config.query - Coordinates at which features will be searched.
 * @param {'mapbox.places'|'mapbox.places-permanent'} [config.mode="mapbox.places"] - Either `mapbox.places` for ephemeral geocoding, or `mapbox.places-permanent` for storing results and batch geocoding.
 * @param {Array<string>} [config.countries] - Limits results to the specified countries.
 *   Each item in the array should be an [ISO 3166 alpha 2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2).
 * @param {Array<'country'|'region'|'postcode'|'district'|'place'|'locality'|'neighborhood'|'address'|'poi'|'poi.landmark'>} [config.types] - Filter results by feature types.
 * @param {BoundingBox} [config.bbox] - Limit results to a bounding box.
 * @param {number} [config.limit=1] - Limit the number of results returned. If using this option, you must provide a single item for `types`.
 * @param {Array<string>} [config.language] - Specify the language to use for response text and, for forward geocoding, query result weighting.
 *  Options are [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag) comprised of a mandatory
 *  [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and optionally one or more IETF subtags for country or script.
 * @param {'distance'|'score'} [config.reverseMode='distance'] - Set the factors that are used to sort nearby results.
 * @return {MapiRequest}
 */
Geocoding.reverseGeocode = function(config) {
  v.assertShape({
    query: v.required(v.coordinates),
    mode: v.oneOf('mapbox.places', 'mapbox.places-permanent'),
    countries: v.arrayOf(v.string),
    types: v.arrayOf(v.oneOf(featureTypes)),
    bbox: v.arrayOf(v.number),
    limit: v.number,
    language: v.arrayOf(v.string),
    reverseMode: v.oneOf('distance', 'score')
  })(config);

  config.mode = config.mode || 'mapbox.places';

  var query = stringifyBooleans(
    xtend(
      { country: config.countries },
      pick(config, [
        'country',
        'types',
        'bbox',
        'limit',
        'language',
        'reverseMode'
      ])
    )
  );

  return this.client.createRequest({
    method: 'GET',
    path: '/geocoding/v5/:mode/:query.json',
    params: pick(config, ['mode', 'query']),
    query: query
  });
};

module.exports = createServiceFactory(Geocoding);


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/service-helpers/create-service-factory.js ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var MapiClient = __webpack_require__(/*! ../../lib/classes/mapi-client */ "./node_modules/@mapbox/mapbox-sdk/lib/classes/mapi-client.js");
// This will create the environment-appropriate client.
var createClient = __webpack_require__(/*! ../../lib/client */ "./node_modules/@mapbox/mapbox-sdk/lib/browser/browser-client.js");

function createServiceFactory(ServicePrototype) {
  return function(clientOrConfig) {
    var client;
    if (MapiClient.prototype.isPrototypeOf(clientOrConfig)) {
      client = clientOrConfig;
    } else {
      client = createClient(clientOrConfig);
    }
    var service = Object.create(ServicePrototype);
    service.client = client;
    return service;
  };
}

module.exports = createServiceFactory;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function objectMap(obj, cb) {
  return Object.keys(obj).reduce(function(result, key) {
    result[key] = cb(key, obj[key]);
    return result;
  }, {});
}

module.exports = objectMap;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/service-helpers/pick.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Create a new object by picking properties off an existing object.
 * The second param can be overloaded as a callback for
 * more fine grained picking of properties.
 * @param {Object} source
 * @param {Array<string>|function(string, Object):boolean} keys
 * @returns {Object}
 */
function pick(source, keys) {
  var filter = function(key, val) {
    return keys.indexOf(key) !== -1 && val !== undefined;
  };

  if (typeof keys === 'function') {
    filter = keys;
  }

  return Object.keys(source)
    .filter(function(key) {
      return filter(key, source[key]);
    })
    .reduce(function(result, key) {
      result[key] = source[key];
      return result;
    }, {});
}

module.exports = pick;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/service-helpers/stringify-booleans.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectMap = __webpack_require__(/*! ./object-map */ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/object-map.js");

/**
 * Stringify all the boolean values in an object, so true becomes "true".
 *
 * @param {Object} obj
 * @returns {Object}
 */
function stringifyBoolean(obj) {
  return objectMap(obj, function(_, value) {
    return typeof value === 'boolean' ? JSON.stringify(value) : value;
  });
}

module.exports = stringifyBoolean;


/***/ }),

/***/ "./node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@mapbox/mapbox-sdk/services/service-helpers/validator.js ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xtend = __webpack_require__(/*! xtend */ "./node_modules/xtend/immutable.js");
var v = __webpack_require__(/*! @mapbox/fusspot */ "./node_modules/@mapbox/fusspot/lib/index.js");

function file(value) {
  // If we're in a browser so Blob is available, the file must be that.
  // In Node, however, it could be a filepath or a pipeable (Readable) stream.
  if (typeof window !== 'undefined') {
    if (value instanceof global.Blob || value instanceof global.ArrayBuffer) {
      return;
    }
    return 'Blob or ArrayBuffer';
  }
  if (typeof value === 'string' || value.pipe !== undefined) {
    return;
  }
  return 'Filename or Readable stream';
}

function assertShape(validatorObj, apiName) {
  return v.assert(v.strictShape(validatorObj), apiName);
}

function date(value) {
  var msg = 'date';
  if (typeof value === 'boolean') {
    return msg;
  }
  try {
    var date = new Date(value);
    if (date.getTime && isNaN(date.getTime())) {
      return msg;
    }
  } catch (e) {
    return msg;
  }
}

function coordinates(value) {
  return v.tuple(v.number, v.number)(value);
}

module.exports = xtend(v, {
  file: file,
  date: date,
  coordinates: coordinates,
  assertShape: assertShape
});


/***/ }),

/***/ "./node_modules/@mapbox/parse-mapbox-token/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@mapbox/parse-mapbox-token/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var base64 = __webpack_require__(/*! base-64 */ "./node_modules/base-64/base64.js");

var tokenCache = {};

function parseToken(token) {
  if (tokenCache[token]) {
    return tokenCache[token];
  }

  var parts = token.split('.');
  var usage = parts[0];
  var rawPayload = parts[1];
  if (!rawPayload) {
    throw new Error('Invalid token');
  }

  var parsedPayload = parsePaylod(rawPayload);

  var result = {
    usage: usage,
    user: parsedPayload.u
  };
  if (has(parsedPayload, 'a')) result.authorization = parsedPayload.a;
  if (has(parsedPayload, 'exp')) result.expires = parsedPayload.exp * 1000;
  if (has(parsedPayload, 'iat')) result.created = parsedPayload.iat * 1000;
  if (has(parsedPayload, 'scopes')) result.scopes = parsedPayload.scopes;
  if (has(parsedPayload, 'client')) result.client = parsedPayload.client;
  if (has(parsedPayload, 'll')) result.lastLogin = parsedPayload.ll;
  if (has(parsedPayload, 'iu')) result.impersonator = parsedPayload.iu;

  tokenCache[token] = result;
  return result;
}

function parsePaylod(rawPayload) {
  try {
    return JSON.parse(base64.decode(rawPayload));
  } catch (parseError) {
    throw new Error('Invalid token');
  }
}

function has(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

module.exports = parseToken;


/***/ }),

/***/ "./node_modules/base-64/base64.js":
/*!****************************************!*\
  !*** ./node_modules/base-64/base64.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code, and use
	// it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var InvalidCharacterError = function(message) {
		this.message = message;
	};
	InvalidCharacterError.prototype = new Error;
	InvalidCharacterError.prototype.name = 'InvalidCharacterError';

	var error = function(message) {
		// Note: the error messages used throughout this file match those used by
		// the native `atob`/`btoa` implementation in Chromium.
		throw new InvalidCharacterError(message);
	};

	var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	// http://whatwg.org/html/common-microsyntaxes.html#space-character
	var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

	// `decode` is designed to be fully compatible with `atob` as described in the
	// HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
	// The optimized base64-decoding algorithm used is based on @atk’s excellent
	// implementation. https://gist.github.com/atk/1020396
	var decode = function(input) {
		input = String(input)
			.replace(REGEX_SPACE_CHARACTERS, '');
		var length = input.length;
		if (length % 4 == 0) {
			input = input.replace(/==?$/, '');
			length = input.length;
		}
		if (
			length % 4 == 1 ||
			// http://whatwg.org/C#alphanumeric-ascii-characters
			/[^+a-zA-Z0-9/]/.test(input)
		) {
			error(
				'Invalid character: the string to be decoded is not correctly encoded.'
			);
		}
		var bitCounter = 0;
		var bitStorage;
		var buffer;
		var output = '';
		var position = -1;
		while (++position < length) {
			buffer = TABLE.indexOf(input.charAt(position));
			bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
			// Unless this is the first of a group of 4 characters…
			if (bitCounter++ % 4) {
				// …convert the first 8 bits to a single ASCII character.
				output += String.fromCharCode(
					0xFF & bitStorage >> (-2 * bitCounter & 6)
				);
			}
		}
		return output;
	};

	// `encode` is designed to be fully compatible with `btoa` as described in the
	// HTML Standard: http://whatwg.org/html/webappapis.html#dom-windowbase64-btoa
	var encode = function(input) {
		input = String(input);
		if (/[^\0-\xFF]/.test(input)) {
			// Note: no need to special-case astral symbols here, as surrogates are
			// matched, and the input is supposed to only contain ASCII anyway.
			error(
				'The string to be encoded contains characters outside of the ' +
				'Latin1 range.'
			);
		}
		var padding = input.length % 3;
		var output = '';
		var position = -1;
		var a;
		var b;
		var c;
		var d;
		var buffer;
		// Make sure any padding is handled outside of the loop.
		var length = input.length - padding;

		while (++position < length) {
			// Read three bytes, i.e. 24 bits.
			a = input.charCodeAt(position) << 16;
			b = input.charCodeAt(++position) << 8;
			c = input.charCodeAt(++position);
			buffer = a + b + c;
			// Turn the 24 bits into four chunks of 6 bits each, and append the
			// matching character for each of them to the output.
			output += (
				TABLE.charAt(buffer >> 18 & 0x3F) +
				TABLE.charAt(buffer >> 12 & 0x3F) +
				TABLE.charAt(buffer >> 6 & 0x3F) +
				TABLE.charAt(buffer & 0x3F)
			);
		}

		if (padding == 2) {
			a = input.charCodeAt(position) << 8;
			b = input.charCodeAt(++position);
			buffer = a + b;
			output += (
				TABLE.charAt(buffer >> 10) +
				TABLE.charAt((buffer >> 4) & 0x3F) +
				TABLE.charAt((buffer << 2) & 0x3F) +
				'='
			);
		} else if (padding == 1) {
			buffer = input.charCodeAt(position);
			output += (
				TABLE.charAt(buffer >> 2) +
				TABLE.charAt((buffer << 4) & 0x3F) +
				'=='
			);
		}

		return output;
	};

	var base64 = {
		'encode': encode,
		'decode': decode,
		'version': '0.1.0'
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return base64;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else { var key; }

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./node_modules/eventemitter3/index.js":
/*!*********************************************!*\
  !*** ./node_modules/eventemitter3/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),

/***/ "./node_modules/fuzzy/lib/fuzzy.js":
/*!*****************************************!*\
  !*** ./node_modules/fuzzy/lib/fuzzy.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Fuzzy
 * https://github.com/myork/fuzzy
 *
 * Copyright (c) 2012 Matt York
 * Licensed under the MIT license.
 */

(function() {

var root = this;

var fuzzy = {};

// Use in node or in browser
if (true) {
  module.exports = fuzzy;
} else {}

// Return all elements of `array` that have a fuzzy
// match against `pattern`.
fuzzy.simpleFilter = function(pattern, array) {
  return array.filter(function(str) {
    return fuzzy.test(pattern, str);
  });
};

// Does `pattern` fuzzy match `str`?
fuzzy.test = function(pattern, str) {
  return fuzzy.match(pattern, str) !== null;
};

// If `pattern` matches `str`, wrap each matching character
// in `opts.pre` and `opts.post`. If no match, return null
fuzzy.match = function(pattern, str, opts) {
  opts = opts || {};
  var patternIdx = 0
    , result = []
    , len = str.length
    , totalScore = 0
    , currScore = 0
    // prefix
    , pre = opts.pre || ''
    // suffix
    , post = opts.post || ''
    // String to compare against. This might be a lowercase version of the
    // raw string
    , compareString =  opts.caseSensitive && str || str.toLowerCase()
    , ch;

  pattern = opts.caseSensitive && pattern || pattern.toLowerCase();

  // For each character in the string, either add it to the result
  // or wrap in template if it's the next string in the pattern
  for(var idx = 0; idx < len; idx++) {
    ch = str[idx];
    if(compareString[idx] === pattern[patternIdx]) {
      ch = pre + ch + post;
      patternIdx += 1;

      // consecutive characters should increase the score more than linearly
      currScore += 1 + currScore;
    } else {
      currScore = 0;
    }
    totalScore += currScore;
    result[result.length] = ch;
  }

  // return rendered string if we have a match for every char
  if(patternIdx === pattern.length) {
    // if the string is an exact match with pattern, totalScore should be maxed
    totalScore = (compareString === pattern) ? Infinity : totalScore;
    return {rendered: result.join(''), score: totalScore};
  }

  return null;
};

// The normal entry point. Filters `arr` for matches against `pattern`.
// It returns an array with matching values of the type:
//
//     [{
//         string:   '<b>lah' // The rendered string
//       , index:    2        // The index of the element in `arr`
//       , original: 'blah'   // The original element in `arr`
//     }]
//
// `opts` is an optional argument bag. Details:
//
//    opts = {
//        // string to put before a matching character
//        pre:     '<b>'
//
//        // string to put after matching character
//      , post:    '</b>'
//
//        // Optional function. Input is an entry in the given arr`,
//        // output should be the string to test `pattern` against.
//        // In this example, if `arr = [{crying: 'koala'}]` we would return
//        // 'koala'.
//      , extract: function(arg) { return arg.crying; }
//    }
fuzzy.filter = function(pattern, arr, opts) {
  if(!arr || arr.length === 0) {
    return [];
  }
  if (typeof pattern !== 'string') {
    return arr;
  }
  opts = opts || {};
  return arr
    .reduce(function(prev, element, idx, arr) {
      var str = element;
      if(opts.extract) {
        str = opts.extract(element);
      }
      var rendered = fuzzy.match(pattern, str, opts);
      if(rendered != null) {
        prev[prev.length] = {
            string: rendered.rendered
          , score: rendered.score
          , index: idx
          , original: element
        };
      }
      return prev;
    }, [])

    // Sort by score. Browsers are inconsistent wrt stable/unstable
    // sorting, so force stable by using the index in the case of tie.
    // See http://ofb.net/~sethml/is-sort-stable.html
    .sort(function(a,b) {
      var compare = b.score - a.score;
      if(compare) return compare;
      return a.index - b.index;
    });
};


}());



/***/ }),

/***/ "./node_modules/is-plain-obj/index.js":
/*!********************************************!*\
  !*** ./node_modules/is-plain-obj/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toString = Object.prototype.toString;

module.exports = function (x) {
	var prototype;
	return toString.call(x) === '[object Object]' && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}));
};


/***/ }),

/***/ "./node_modules/lodash.debounce/index.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash.debounce/index.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = debounce;


/***/ }),

/***/ "./node_modules/nanoid/index.browser.js":
/*!**********************************************!*\
  !*** ./node_modules/nanoid/index.browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Your browser does not have secure random generator. ' +
      'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}

var crypto = self.crypto || self.msCrypto

/*
 * This alphabet uses a-z A-Z 0-9 _- symbols.
 * Symbols order was changed for better gzip compression.
 */
var url = 'Uint8ArdomValuesObj012345679BCDEFGHIJKLMNPQRSTWXYZ_cfghkpqvwxyz-'

module.exports = function (size) {
  size = size || 21
  var id = ''
  var bytes = crypto.getRandomValues(new Uint8Array(size))
  while (0 < size--) {
    id += url[bytes[size] & 63]
  }
  return id
}


/***/ }),

/***/ "./node_modules/subtag/subtag.js":
/*!***************************************!*\
  !*** ./node_modules/subtag/subtag.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

!function(root, name, make) {
  if ( true && module.exports) module.exports = make()
  else root[name] = make()
}(this, 'subtag', function() {

  var empty = ''
  var pattern = /^([a-zA-Z]{2,3})(?:[_-]+([a-zA-Z]{3})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{4})(?=$|[_-]+))?(?:[_-]+([a-zA-Z]{2}|[0-9]{3})(?=$|[_-]+))?/

  function match(tag) {
    return tag.match(pattern) || []
  }

  function split(tag) {
    return match(tag).filter(function(v, i) { return v && i })
  }

  function api(tag) {
    tag = match(tag)
    return {
      language: tag[1] || empty,
      extlang: tag[2] || empty,
      script: tag[3] || empty,
      region: tag[4] || empty
    }
  }

  function expose(target, key, value) {
    Object.defineProperty(target, key, {
      value: value,
      enumerable: true
    })
  }

  function part(position, pattern, type) {
    function method(tag) {
      return match(tag)[position] || empty
    }
    expose(method, 'pattern', pattern)
    expose(api, type, method)
  }

  part(1, /^[a-zA-Z]{2,3}$/, 'language')
  part(2, /^[a-zA-Z]{3}$/, 'extlang')
  part(3, /^[a-zA-Z]{4}$/, 'script')
  part(4, /^[a-zA-Z]{2}$|^[0-9]{3}$/, 'region')

  expose(api, 'split', split)

  return api
});


/***/ }),

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./node_modules/xtend/immutable.js":
/*!*****************************************!*\
  !*** ./node_modules/xtend/immutable.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}


/***/ })

}]);
//# sourceMappingURL=default~change-location-change-location-module~locatio-marker-locatio-marker-module.js.map