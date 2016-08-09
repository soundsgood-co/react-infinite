(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Infinite = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";function _objectWithoutProperties(e,t){var i={};for(var o in e)t.indexOf(o)>=0||Object.prototype.hasOwnProperty.call(e,o)&&(i[o]=e[o]);return i}var React=global.React||require("react"),ReactDOM=global.ReactDOM||require("react-dom"),shallowCompare=global.shallowCompare||require("react-addons-shallow-compare");require("./utils/establish-polyfills");var scaleEnum=require("./utils/scaleEnum"),infiniteHelpers=require("./utils/infiniteHelpers"),_isFinite=require("lodash.isfinite"),Scrollbars=require("react-custom-scrollbars").Scrollbars,preloadType=require("./utils/types").preloadType,checkProps=checkProps=require("./utils/checkProps"),Infinite=React.createClass({displayName:"Infinite",propTypes:{children:React.PropTypes.any,handleScroll:React.PropTypes.func,preloadBatchSize:preloadType,preloadAdditionalHeight:preloadType,elementHeight:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.arrayOf(React.PropTypes.number)]).isRequired,containerHeight:React.PropTypes.number,useWindowAsScrollContainer:React.PropTypes.bool,displayBottomUpwards:React.PropTypes.bool.isRequired,infiniteLoadBeginEdgeOffset:React.PropTypes.number,onInfiniteLoad:React.PropTypes.func,loadingSpinnerDelegate:React.PropTypes.node,isInfiniteLoading:React.PropTypes.bool,timeScrollStateLastsForAfterUserScrolls:React.PropTypes.number,className:React.PropTypes.string,styles:React.PropTypes.shape({scrollableStyle:React.PropTypes.object}).isRequired},statics:{containerHeightScaleFactor:function(e){if(!_isFinite(e))throw new Error("The scale factor must be a number.");return{type:scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,amount:e}}},computedProps:{},utils:{},shouldAttachToBottom:!1,preservedScrollState:0,loadingSpinnerHeight:0,deprecationWarned:!1,getDefaultProps:function(){return{handleScroll:function(){},useWindowAsScrollContainer:!1,onInfiniteLoad:function(){},loadingSpinnerDelegate:React.createElement("div",null),displayBottomUpwards:!1,isInfiniteLoading:!1,timeScrollStateLastsForAfterUserScrolls:150,className:"",styles:{}}},getInitialState:function(){var e=this.recomputeInternalStateFromProps(this.props);this.computedProps=e.computedProps,this.utils=e.utils,this.shouldAttachToBottom=this.props.displayBottomUpwards;var t=e.newState;return t.scrollTimeout=void 0,t.isScrolling=!1,t},shouldComponentUpdate:function(e,t){return shallowCompare(this,e,t)},generateComputedProps:function(e){var t=e.containerHeight,i=e.preloadBatchSize,o=e.preloadAdditionalHeight,r=_objectWithoutProperties(e,["containerHeight","preloadBatchSize","preloadAdditionalHeight"]),n=r.children.shift(),s={skippedChild:n,children:r.children};t="number"==typeof t?t:0,s.containerHeight=e.useWindowAsScrollContainer?window.innerHeight:t,void 0!==r.infiniteLoadBeginBottomOffset&&(s.infiniteLoadBeginEdgeOffset=r.infiniteLoadBeginBottomOffset,this.deprecationWarned||(console.error("Warning: React Infinite's infiniteLoadBeginBottomOffset prop\n        has been deprecated as of 0.6.0. Please use infiniteLoadBeginEdgeOffset.\n        Because this is a rather descriptive name, a simple find and replace\n        should suffice."),this.deprecationWarned=!0));var l={type:scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,amount:.5},a=i&&i.type?i:l;"number"==typeof i?s.preloadBatchSize=i:"object"==typeof a&&a.type===scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR?s.preloadBatchSize=s.containerHeight*a.amount:s.preloadBatchSize=0;var c={type:scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR,amount:1},p=o&&o.type?o:c;return"number"==typeof o?s.preloadAdditionalHeight=o:"object"==typeof p&&p.type===scaleEnum.CONTAINER_HEIGHT_SCALE_FACTOR?s.preloadAdditionalHeight=s.containerHeight*p.amount:s.preloadAdditionalHeight=0,Object.assign(r,s)},generateComputedUtilityFunctions:function(e){var t=this,i={};return i.getLoadingSpinnerHeight=function(){var e=0;if(t.refs&&t.refs.loadingSpinner){var i=ReactDOM.findDOMNode(t.refs.loadingSpinner);e=i.offsetHeight||0}return e},e.useWindowAsScrollContainer?(i.subscribeToScrollListener=function(){window.addEventListener("scroll",t.infiniteHandleScroll)},i.unsubscribeFromScrollListener=function(){window.removeEventListener("scroll",t.infiniteHandleScroll)},i.nodeScrollListener=function(){},i.getScrollTop=function(){return window.pageYOffset},i.setScrollTop=function(e){window.scroll(window.pageXOffset,e)},i.scrollShouldBeIgnored=function(){return!1},i.buildScrollableStyle=function(){return{}}):(i.subscribeToScrollListener=function(){},i.unsubscribeFromScrollListener=function(){},i.nodeScrollListener=this.infiniteHandleScroll,i.getScrollTop=function(){return t.refs&&t.refs.scrollable?t.refs.scrollable.getScrollTop():0},i.setScrollTop=function(e){t.refs&&t.refs.scrollable&&t.refs.scrollable.scrollTop(e)},i.scrollShouldBeIgnored=function(e){return e.target!==ReactDOM.findDOMNode(t.refs.scrollable).firstChild},i.buildScrollableStyle=function(){return Object.assign({},{height:t.computedProps.containerHeight,overflow:"hidden",WebkitOverflowScrolling:"touch"},t.computedProps.styles.scrollableStyle||{})}),i},recomputeInternalStateFromProps:function(e){checkProps(e);var t=this.generateComputedProps(e),i=this.generateComputedUtilityFunctions(e),o={};return o.numberOfChildren=React.Children.count(t.children),o.infiniteComputer=infiniteHelpers.createInfiniteComputer(t.elementHeight,t.children,t.displayBottomUpwards),void 0!==t.isInfiniteLoading&&(o.isInfiniteLoading=t.isInfiniteLoading),o.preloadBatchSize=t.preloadBatchSize,o.preloadAdditionalHeight=t.preloadAdditionalHeight,o=Object.assign(o,infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(o,i.getScrollTop())),{computedProps:t,utils:i,newState:o}},componentWillReceiveProps:function(e){var t=this.recomputeInternalStateFromProps(e);this.computedProps=t.computedProps,this.utils=t.utils,this.setState(t.newState)},componentWillUpdate:function(){this.props.displayBottomUpwards&&(this.preservedScrollState=this.utils.getScrollTop()-this.loadingSpinnerHeight)},componentDidUpdate:function(e,t){if(this.loadingSpinnerHeight=this.utils.getLoadingSpinnerHeight(),this.props.displayBottomUpwards){var i=this.getLowestPossibleScrollTop();this.shouldAttachToBottom&&this.utils.getScrollTop()<i?this.utils.setScrollTop(i):e.isInfiniteLoading&&!this.props.isInfiniteLoading&&this.utils.setScrollTop(this.state.infiniteComputer.getTotalScrollableHeight()-t.infiniteComputer.getTotalScrollableHeight()+this.preservedScrollState)}var o=this.state.numberOfChildren!==t.numberOfChildren;if(o){var r=infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(this.state,this.utils.getScrollTop());this.setState(r)}var n=o&&!this.hasAllVisibleItems()&&!this.state.isInfiniteLoading;n&&this.onInfiniteLoad()},componentDidMount:function(){if(this.utils.subscribeToScrollListener(),this.hasAllVisibleItems()||this.onInfiniteLoad(),this.props.displayBottomUpwards){var e=this.getLowestPossibleScrollTop();this.shouldAttachToBottom&&this.utils.getScrollTop()<e&&this.utils.setScrollTop(e)}},componentWillUnmount:function(){this.utils.unsubscribeFromScrollListener()},infiniteHandleScroll:function(e){this.utils.scrollShouldBeIgnored(e)||(this.computedProps.handleScroll(ReactDOM.findDOMNode(this.refs.scrollable)),this.handleScroll(this.utils.getScrollTop()))},manageScrollTimeouts:function(){this.state.scrollTimeout&&clearTimeout(this.state.scrollTimeout);var e=this,t=setTimeout(function(){e.setState({isScrolling:!1,scrollTimeout:void 0})},this.computedProps.timeScrollStateLastsForAfterUserScrolls);this.setState({isScrolling:!0,scrollTimeout:t})},getLowestPossibleScrollTop:function(){return this.state.infiniteComputer.getTotalScrollableHeight()-this.computedProps.containerHeight},hasAllVisibleItems:function(){return!(_isFinite(this.computedProps.infiniteLoadBeginEdgeOffset)&&this.state.infiniteComputer.getTotalScrollableHeight()<this.computedProps.containerHeight)},passedEdgeForInfiniteScroll:function(e){return this.computedProps.displayBottomUpwards?!this.shouldAttachToBottom&&e<this.computedProps.infiniteLoadBeginEdgeOffset:e>this.state.infiniteComputer.getTotalScrollableHeight()-this.computedProps.containerHeight-this.computedProps.infiniteLoadBeginEdgeOffset},onInfiniteLoad:function(){this.setState({isInfiniteLoading:!0}),this.computedProps.onInfiniteLoad()},handleScroll:function(e){this.shouldAttachToBottom=this.computedProps.displayBottomUpwards&&e>=this.getLowestPossibleScrollTop(),this.manageScrollTimeouts();var t=infiniteHelpers.recomputeApertureStateFromOptionsAndScrollTop(this.state,e);this.passedEdgeForInfiniteScroll(e)&&!this.state.isInfiniteLoading?(this.setState(Object.assign({},t)),this.onInfiniteLoad()):this.setState(t)},buildHeightStyle:function(e){return{width:"100%",height:Math.ceil(e)}},render:function(){var e;e=this.state.numberOfChildren>1?this.computedProps.children.slice(this.state.displayIndexStart,this.state.displayIndexEnd+1):this.computedProps.children;var t={};this.state.isScrolling&&(t.pointerEvents="none");var i=this.state.infiniteComputer.getTopSpacerHeight(this.state.displayIndexStart),o=this.state.infiniteComputer.getBottomSpacerHeight(this.state.displayIndexEnd);if(this.computedProps.displayBottomUpwards){var r=this.computedProps.containerHeight-this.state.infiniteComputer.getTotalScrollableHeight();r>0&&(i=r-this.loadingSpinnerHeight)}var n=void 0===this.computedProps.infiniteLoadBeginEdgeOffset?null:React.createElement("div",{ref:"loadingSpinner"},this.state.isInfiniteLoading?this.computedProps.loadingSpinnerDelegate:null);return React.createElement(Scrollbars,{className:this.computedProps.className,ref:"scrollable",autoHide:!0,style:this.utils.buildScrollableStyle(),onScroll:this.utils.nodeScrollListener},React.createElement("div",{ref:"smoothScrollingWrapper",style:t},this.computedProps.skippedChild,React.createElement("div",{ref:"topSpacer",style:this.buildHeightStyle(i)}),this.computedProps.displayBottomUpwards&&n,e,!this.computedProps.displayBottomUpwards&&n,React.createElement("div",{ref:"bottomSpacer",style:this.buildHeightStyle(o)})))}});module.exports=Infinite,global.Infinite=Infinite;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./utils/checkProps":30,"./utils/establish-polyfills":31,"./utils/infiniteHelpers":32,"./utils/scaleEnum":33,"./utils/types":34,"lodash.isfinite":6,"react":undefined,"react-addons-shallow-compare":12,"react-custom-scrollbars":16,"react-dom":undefined}],2:[function(require,module,exports){
/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

module.exports = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};
},{}],3:[function(require,module,exports){
var prefix = require('prefix-style')
var toCamelCase = require('to-camel-case')
var cache = { 'float': 'cssFloat' }
var addPxToStyle = require('add-px-to-style')

function style (element, property, value) {
  var camel = cache[property]
  if (typeof camel === 'undefined') {
    camel = detect(property)
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel]
    }

    element.style[camel] = addPxToStyle(camel, value)
  }
}

function each (element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k])
    }
  }
}

function detect (cssProp) {
  var camel = toCamelCase(cssProp)
  var result = prefix(camel)
  cache[camel] = cache[cssProp] = cache[result] = result
  return result
}

function set () {
  if (arguments.length === 2) {
    each(arguments[0], arguments[1])
  } else {
    style(arguments[0], arguments[1], arguments[2])
  }
}

module.exports = set
module.exports.set = set

module.exports.get = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '')
      return obj
    }, {})
  } else {
    return style(element, properties || '')
  }
}

},{"add-px-to-style":2,"prefix-style":9,"to-camel-case":23}],4:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @typechecks
 * 
 */

/*eslint-disable no-self-compare */

'use strict';

var hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */
function shallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // Test for A's keys different from B.
  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwnProperty.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

module.exports = shallowEqual;
},{}],5:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
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
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
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
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],6:[function(require,module,exports){
(function (global){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsFinite = global.isFinite;

/**
 * Checks if `value` is a finite primitive number.
 *
 * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
 * @example
 *
 * _.isFinite(10);
 * // => true
 *
 * _.isFinite('10');
 * // => false
 *
 * _.isFinite(true);
 * // => false
 *
 * _.isFinite(Object(10));
 * // => false
 *
 * _.isFinite(Infinity);
 * // => false
 */
function isFinite(value) {
  return typeof value == 'number' && nativeIsFinite(value);
}

module.exports = isFinite;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
/* eslint-disable no-unused-vars */
'use strict';
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],8:[function(require,module,exports){
(function (process){
// Generated by CoffeeScript 1.7.1
(function() {
  var getNanoSeconds, hrtime, loadTime;

  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
    module.exports = function() {
      return performance.now();
    };
  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
    module.exports = function() {
      return (getNanoSeconds() - loadTime) / 1e6;
    };
    hrtime = process.hrtime;
    getNanoSeconds = function() {
      var hr;
      hr = hrtime();
      return hr[0] * 1e9 + hr[1];
    };
    loadTime = getNanoSeconds();
  } else if (Date.now) {
    module.exports = function() {
      return Date.now() - loadTime;
    };
    loadTime = Date.now();
  } else {
    module.exports = function() {
      return new Date().getTime() - loadTime;
    };
    loadTime = new Date().getTime();
  }

}).call(this);

}).call(this,require('_process'))
},{"_process":10}],9:[function(require,module,exports){
var div = null
var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]

module.exports = function prefixStyle (prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div')
  }

  var style = div.style

  // prop exists without prefix
  if (prop in style) {
    return prop
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name
    }
  }

  return false
}

},{}],10:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
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

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],11:[function(require,module,exports){
(function (global){
var now = require('performance-now')
  , root = typeof window === 'undefined' ? global : window
  , vendors = ['moz', 'webkit']
  , suffix = 'AnimationFrame'
  , raf = root['request' + suffix]
  , caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for(var i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf = root[vendors[i] + 'Cancel' + suffix]
      || root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if(!raf || !caf) {
  var last = 0
    , id = 0
    , queue = []
    , frameDuration = 1000 / 60

  raf = function(callback) {
    if(queue.length === 0) {
      var _now = now()
        , next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function() {
        var cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for(var i = 0; i < cp.length; i++) {
          if(!cp[i].cancelled) {
            try{
              cp[i].callback(last)
            } catch(e) {
              setTimeout(function() { throw e }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function(handle) {
    for(var i = 0; i < queue.length; i++) {
      if(queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

module.exports = function(fn) {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}
module.exports.cancel = function() {
  caf.apply(root, arguments)
}
module.exports.polyfill = function() {
  root.requestAnimationFrame = raf
  root.cancelAnimationFrame = caf
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"performance-now":8}],12:[function(require,module,exports){
module.exports = require('react/lib/shallowCompare');
},{"react/lib/shallowCompare":22}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.renderViewDefault = renderViewDefault;
exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
exports.renderThumbVerticalDefault = renderThumbVerticalDefault;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

/* eslint-disable react/prop-types */

function renderViewDefault(props) {
    return _react2["default"].createElement('div', props);
}

function renderTrackHorizontalDefault(_ref) {
    var style = _ref.style;

    var props = _objectWithoutProperties(_ref, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderTrackVerticalDefault(_ref2) {
    var style = _ref2.style;

    var props = _objectWithoutProperties(_ref2, ['style']);

    var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderThumbHorizontalDefault(_ref3) {
    var style = _ref3.style;

    var props = _objectWithoutProperties(_ref3, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}

function renderThumbVerticalDefault(_ref4) {
    var style = _ref4.style;

    var props = _objectWithoutProperties(_ref4, ['style']);

    var finalStyle = _extends({}, style, {
        cursor: 'pointer',
        borderRadius: 'inherit',
        backgroundColor: 'rgba(0,0,0,.2)'
    });
    return _react2["default"].createElement('div', _extends({ style: finalStyle }, props));
}
},{"react":undefined}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _raf2 = require('raf');

var _raf3 = _interopRequireDefault(_raf2);

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

var _react = require('react');

var _isString = require('../utils/isString');

var _isString2 = _interopRequireDefault(_isString);

var _getScrollbarWidth = require('../utils/getScrollbarWidth');

var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);

var _returnFalse = require('../utils/returnFalse');

var _returnFalse2 = _interopRequireDefault(_returnFalse);

var _getInnerWidth = require('../utils/getInnerWidth');

var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);

var _getInnerHeight = require('../utils/getInnerHeight');

var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);

var _styles = require('./styles');

var _defaultRenderElements = require('./defaultRenderElements');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports["default"] = (0, _react.createClass)({

    displayName: 'Scrollbars',

    propTypes: {
        onScroll: _react.PropTypes.func,
        onScrollFrame: _react.PropTypes.func,
        onScrollStart: _react.PropTypes.func,
        onScrollStop: _react.PropTypes.func,
        onUpdate: _react.PropTypes.func,
        renderView: _react.PropTypes.func,
        renderTrackHorizontal: _react.PropTypes.func,
        renderTrackVertical: _react.PropTypes.func,
        renderThumbHorizontal: _react.PropTypes.func,
        renderThumbVertical: _react.PropTypes.func,
        tagName: _react.PropTypes.string,
        thumbSize: _react.PropTypes.number,
        thumbMinSize: _react.PropTypes.number,
        hideTracksWhenNotNeeded: _react.PropTypes.bool,
        autoHide: _react.PropTypes.bool,
        autoHideTimeout: _react.PropTypes.number,
        autoHideDuration: _react.PropTypes.number,
        autoHeight: _react.PropTypes.bool,
        autoHeightMin: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        autoHeightMax: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
        universal: _react.PropTypes.bool,
        style: _react.PropTypes.object,
        children: _react.PropTypes.node
    },

    getDefaultProps: function getDefaultProps() {
        return {
            renderView: _defaultRenderElements.renderViewDefault,
            renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
            renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
            renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
            renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
            tagName: 'div',
            thumbMinSize: 30,
            hideTracksWhenNotNeeded: false,
            autoHide: false,
            autoHideTimeout: 1000,
            autoHideDuration: 200,
            autoHeight: false,
            autoHeightMin: 0,
            autoHeightMax: 200,
            universal: false
        };
    },
    getInitialState: function getInitialState() {
        return {
            didMountUniversal: false
        };
    },
    componentDidMount: function componentDidMount() {
        this.addListeners();
        this.update();
        this.componentDidMountUniversal();
    },
    componentDidMountUniversal: function componentDidMountUniversal() {
        // eslint-disable-line react/sort-comp
        var universal = this.props.universal;

        if (!universal) return;
        this.setState({ didMountUniversal: true });
    },
    componentDidUpdate: function componentDidUpdate() {
        this.update();
    },
    componentWillUnmount: function componentWillUnmount() {
        this.removeListeners();
        (0, _raf2.cancel)(this.requestFrame);
        clearTimeout(this.hideTracksTimeout);
        clearInterval(this.detectScrollingInterval);
    },
    getScrollLeft: function getScrollLeft() {
        var view = this.refs.view;

        return view.scrollLeft;
    },
    getScrollTop: function getScrollTop() {
        var view = this.refs.view;

        return view.scrollTop;
    },
    getScrollWidth: function getScrollWidth() {
        var view = this.refs.view;

        return view.scrollWidth;
    },
    getScrollHeight: function getScrollHeight() {
        var view = this.refs.view;

        return view.scrollHeight;
    },
    getClientWidth: function getClientWidth() {
        var view = this.refs.view;

        return view.clientWidth;
    },
    getClientHeight: function getClientHeight() {
        var view = this.refs.view;

        return view.clientHeight;
    },
    getValues: function getValues() {
        var view = this.refs.view;
        var scrollLeft = view.scrollLeft;
        var scrollTop = view.scrollTop;
        var scrollWidth = view.scrollWidth;
        var scrollHeight = view.scrollHeight;
        var clientWidth = view.clientWidth;
        var clientHeight = view.clientHeight;


        return {
            left: scrollLeft / (scrollWidth - clientWidth) || 0,
            top: scrollTop / (scrollHeight - clientHeight) || 0,
            scrollLeft: scrollLeft,
            scrollTop: scrollTop,
            scrollWidth: scrollWidth,
            scrollHeight: scrollHeight,
            clientWidth: clientWidth,
            clientHeight: clientHeight
        };
    },
    getThumbHorizontalWidth: function getThumbHorizontalWidth() {
        var _props = this.props;
        var thumbSize = _props.thumbSize;
        var thumbMinSize = _props.thumbMinSize;
        var _refs = this.refs;
        var view = _refs.view;
        var trackHorizontal = _refs.trackHorizontal;
        var scrollWidth = view.scrollWidth;
        var clientWidth = view.clientWidth;

        var trackWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
        var width = clientWidth / scrollWidth * trackWidth;
        if (trackWidth === width) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(width, thumbMinSize);
    },
    getThumbVerticalHeight: function getThumbVerticalHeight() {
        var _props2 = this.props;
        var thumbSize = _props2.thumbSize;
        var thumbMinSize = _props2.thumbMinSize;
        var _refs2 = this.refs;
        var view = _refs2.view;
        var trackVertical = _refs2.trackVertical;
        var scrollHeight = view.scrollHeight;
        var clientHeight = view.clientHeight;

        var trackHeight = (0, _getInnerHeight2["default"])(trackVertical);
        var height = clientHeight / scrollHeight * trackHeight;
        if (trackHeight === height) return 0;
        if (thumbSize) return thumbSize;
        return Math.max(height, thumbMinSize);
    },
    getScrollLeftForOffset: function getScrollLeftForOffset(offset) {
        var _refs3 = this.refs;
        var view = _refs3.view;
        var trackHorizontal = _refs3.trackHorizontal;
        var scrollWidth = view.scrollWidth;
        var clientWidth = view.clientWidth;

        var trackWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
        var thumbWidth = this.getThumbHorizontalWidth();
        return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
    },
    getScrollTopForOffset: function getScrollTopForOffset(offset) {
        var _refs4 = this.refs;
        var view = _refs4.view;
        var trackVertical = _refs4.trackVertical;
        var scrollHeight = view.scrollHeight;
        var clientHeight = view.clientHeight;

        var trackHeight = (0, _getInnerHeight2["default"])(trackVertical);
        var thumbHeight = this.getThumbVerticalHeight();
        return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
    },
    scrollLeft: function scrollLeft() {
        var left = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var view = this.refs.view;

        view.scrollLeft = left;
    },
    scrollTop: function scrollTop() {
        var top = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
        var view = this.refs.view;

        view.scrollTop = top;
    },
    scrollToLeft: function scrollToLeft() {
        var view = this.refs.view;

        view.scrollLeft = 0;
    },
    scrollToTop: function scrollToTop() {
        var view = this.refs.view;

        view.scrollTop = 0;
    },
    scrollToRight: function scrollToRight() {
        var view = this.refs.view;

        view.scrollLeft = view.scrollWidth;
    },
    scrollToBottom: function scrollToBottom() {
        var view = this.refs.view;

        view.scrollTop = view.scrollHeight;
    },
    addListeners: function addListeners() {
        /* istanbul ignore if */
        if (typeof document === 'undefined') return;
        var _refs5 = this.refs;
        var view = _refs5.view;
        var trackHorizontal = _refs5.trackHorizontal;
        var trackVertical = _refs5.trackVertical;
        var thumbHorizontal = _refs5.thumbHorizontal;
        var thumbVertical = _refs5.thumbVertical;

        view.addEventListener('scroll', this.handleScroll);
        if (!(0, _getScrollbarWidth2["default"])()) return;
        trackHorizontal.addEventListener('mouseenter', this.handleTrackMouseEnter);
        trackHorizontal.addEventListener('mouseleave', this.handleTrackMouseLeave);
        trackHorizontal.addEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        trackVertical.addEventListener('mouseenter', this.handleTrackMouseEnter);
        trackVertical.addEventListener('mouseleave', this.handleTrackMouseLeave);
        trackVertical.addEventListener('mousedown', this.handleVerticalTrackMouseDown);
        thumbHorizontal.addEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        thumbVertical.addEventListener('mousedown', this.handleVerticalThumbMouseDown);
        window.addEventListener('resize', this.handleWindowResize);
    },
    removeListeners: function removeListeners() {
        /* istanbul ignore if */
        if (typeof document === 'undefined') return;
        var _refs6 = this.refs;
        var view = _refs6.view;
        var trackHorizontal = _refs6.trackHorizontal;
        var trackVertical = _refs6.trackVertical;
        var thumbHorizontal = _refs6.thumbHorizontal;
        var thumbVertical = _refs6.thumbVertical;

        view.removeEventListener('scroll', this.handleScroll);
        if (!(0, _getScrollbarWidth2["default"])()) return;
        trackHorizontal.removeEventListener('mouseenter', this.handleTrackMouseEnter);
        trackHorizontal.removeEventListener('mouseleave', this.handleTrackMouseLeave);
        trackHorizontal.removeEventListener('mousedown', this.handleHorizontalTrackMouseDown);
        trackVertical.removeEventListener('mouseenter', this.handleTrackMouseEnter);
        trackVertical.removeEventListener('mouseleave', this.handleTrackMouseLeave);
        trackVertical.removeEventListener('mousedown', this.handleVerticalTrackMouseDown);
        thumbHorizontal.removeEventListener('mousedown', this.handleHorizontalThumbMouseDown);
        thumbVertical.removeEventListener('mousedown', this.handleVerticalThumbMouseDown);
        window.removeEventListener('resize', this.handleWindowResize);
        // Possibly setup by `handleDragStart`
        this.teardownDragging();
    },
    handleScroll: function handleScroll(event) {
        var _this = this;

        var _props3 = this.props;
        var onScroll = _props3.onScroll;
        var onScrollFrame = _props3.onScrollFrame;

        if (onScroll) onScroll(event);
        this.update(function (values) {
            var scrollLeft = values.scrollLeft;
            var scrollTop = values.scrollTop;

            _this.viewScrollLeft = scrollLeft;
            _this.viewScrollTop = scrollTop;
            if (onScrollFrame) onScrollFrame(values);
        });
        this.detectScrolling();
    },
    handleScrollStart: function handleScrollStart() {
        var onScrollStart = this.props.onScrollStart;

        if (onScrollStart) onScrollStart();
        this.handleScrollStartAutoHide();
    },
    handleScrollStartAutoHide: function handleScrollStartAutoHide() {
        var autoHide = this.props.autoHide;

        if (!autoHide) return;
        this.showTracks();
    },
    handleScrollStop: function handleScrollStop() {
        var onScrollStop = this.props.onScrollStop;

        if (onScrollStop) onScrollStop();
        this.handleScrollStopAutoHide();
    },
    handleScrollStopAutoHide: function handleScrollStopAutoHide() {
        var autoHide = this.props.autoHide;

        if (!autoHide) return;
        this.hideTracks();
    },
    handleWindowResize: function handleWindowResize() {
        this.update();
    },
    handleHorizontalTrackMouseDown: function handleHorizontalTrackMouseDown() {
        var view = this.refs.view;
        var _event = event;
        var target = _event.target;
        var clientX = _event.clientX;

        var _target$getBoundingCl = target.getBoundingClientRect();

        var targetLeft = _target$getBoundingCl.left;

        var thumbWidth = this.getThumbHorizontalWidth();
        var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
        view.scrollLeft = this.getScrollLeftForOffset(offset);
    },
    handleVerticalTrackMouseDown: function handleVerticalTrackMouseDown(event) {
        var view = this.refs.view;
        var target = event.target;
        var clientY = event.clientY;

        var _target$getBoundingCl2 = target.getBoundingClientRect();

        var targetTop = _target$getBoundingCl2.top;

        var thumbHeight = this.getThumbVerticalHeight();
        var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
        view.scrollTop = this.getScrollTopForOffset(offset);
    },
    handleHorizontalThumbMouseDown: function handleHorizontalThumbMouseDown(event) {
        this.handleDragStart(event);
        var target = event.target;
        var clientX = event.clientX;
        var offsetWidth = target.offsetWidth;

        var _target$getBoundingCl3 = target.getBoundingClientRect();

        var left = _target$getBoundingCl3.left;

        this.prevPageX = offsetWidth - (clientX - left);
    },
    handleVerticalThumbMouseDown: function handleVerticalThumbMouseDown(event) {
        this.handleDragStart(event);
        var target = event.target;
        var clientY = event.clientY;
        var offsetHeight = target.offsetHeight;

        var _target$getBoundingCl4 = target.getBoundingClientRect();

        var top = _target$getBoundingCl4.top;

        this.prevPageY = offsetHeight - (clientY - top);
    },
    setupDragging: function setupDragging() {
        (0, _domCss2["default"])(document.body, _styles.disableSelectStyle);
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = _returnFalse2["default"];
    },
    teardownDragging: function teardownDragging() {
        (0, _domCss2["default"])(document.body, _styles.disableSelectStyleReset);
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.handleDragEnd);
        document.onselectstart = undefined;
    },
    handleDragStart: function handleDragStart(event) {
        this.dragging = true;
        event.stopImmediatePropagation();
        this.setupDragging();
    },
    handleDrag: function handleDrag(event) {
        if (this.prevPageX) {
            var clientX = event.clientX;
            var _refs7 = this.refs;
            var view = _refs7.view;
            var trackHorizontal = _refs7.trackHorizontal;

            var _trackHorizontal$getB = trackHorizontal.getBoundingClientRect();

            var trackLeft = _trackHorizontal$getB.left;

            var thumbWidth = this.getThumbHorizontalWidth();
            var clickPosition = thumbWidth - this.prevPageX;
            var offset = -trackLeft + clientX - clickPosition;
            view.scrollLeft = this.getScrollLeftForOffset(offset);
        }
        if (this.prevPageY) {
            var clientY = event.clientY;
            var _refs8 = this.refs;
            var _view = _refs8.view;
            var trackVertical = _refs8.trackVertical;

            var _trackVertical$getBou = trackVertical.getBoundingClientRect();

            var trackTop = _trackVertical$getBou.top;

            var thumbHeight = this.getThumbVerticalHeight();
            var _clickPosition = thumbHeight - this.prevPageY;
            var _offset = -trackTop + clientY - _clickPosition;
            _view.scrollTop = this.getScrollTopForOffset(_offset);
        }
        return false;
    },
    handleDragEnd: function handleDragEnd() {
        this.dragging = false;
        this.prevPageX = this.prevPageY = 0;
        this.teardownDragging();
        this.handleDragEndAutoHide();
    },
    handleDragEndAutoHide: function handleDragEndAutoHide() {
        var autoHide = this.props.autoHide;

        if (!autoHide) return;
        this.hideTracks();
    },
    handleTrackMouseEnter: function handleTrackMouseEnter() {
        this.trackMouseOver = true;
        this.handleTrackMouseEnterAutoHide();
    },
    handleTrackMouseEnterAutoHide: function handleTrackMouseEnterAutoHide() {
        var autoHide = this.props.autoHide;

        if (!autoHide) return;
        this.showTracks();
    },
    handleTrackMouseLeave: function handleTrackMouseLeave() {
        this.trackMouseOver = false;
        this.handleTrackMouseLeaveAutoHide();
    },
    handleTrackMouseLeaveAutoHide: function handleTrackMouseLeaveAutoHide() {
        var autoHide = this.props.autoHide;

        if (!autoHide) return;
        this.hideTracks();
    },
    showTracks: function showTracks() {
        var _refs9 = this.refs;
        var trackHorizontal = _refs9.trackHorizontal;
        var trackVertical = _refs9.trackVertical;

        clearTimeout(this.hideTracksTimeout);
        (0, _domCss2["default"])(trackHorizontal, { opacity: 1 });
        (0, _domCss2["default"])(trackVertical, { opacity: 1 });
    },
    hideTracks: function hideTracks() {
        if (this.dragging) return;
        if (this.scrolling) return;
        if (this.trackMouseOver) return;
        var autoHideTimeout = this.props.autoHideTimeout;
        var _refs10 = this.refs;
        var trackHorizontal = _refs10.trackHorizontal;
        var trackVertical = _refs10.trackVertical;

        clearTimeout(this.hideTracksTimeout);
        this.hideTracksTimeout = setTimeout(function () {
            (0, _domCss2["default"])(trackHorizontal, { opacity: 0 });
            (0, _domCss2["default"])(trackVertical, { opacity: 0 });
        }, autoHideTimeout);
    },
    detectScrolling: function detectScrolling() {
        var _this2 = this;

        if (this.scrolling) return;
        this.scrolling = true;
        this.handleScrollStart();
        this.detectScrollingInterval = setInterval(function () {
            if (_this2.lastViewScrollLeft === _this2.viewScrollLeft && _this2.lastViewScrollTop === _this2.viewScrollTop) {
                clearInterval(_this2.detectScrollingInterval);
                _this2.scrolling = false;
                _this2.handleScrollStop();
            }
            _this2.lastViewScrollLeft = _this2.viewScrollLeft;
            _this2.lastViewScrollTop = _this2.viewScrollTop;
        }, 100);
    },
    raf: function raf(callback) {
        var _this3 = this;

        if (this.requestFrame) _raf3["default"].cancel(this.requestFrame);
        this.requestFrame = (0, _raf3["default"])(function () {
            _this3.requestFrame = undefined;
            callback();
        });
    },
    update: function update(callback) {
        var _this4 = this;

        this.raf(function () {
            return _this4._update(callback);
        });
    },
    _update: function _update(callback) {
        var _props4 = this.props;
        var onUpdate = _props4.onUpdate;
        var hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;

        var values = this.getValues();
        if ((0, _getScrollbarWidth2["default"])()) {
            var _refs11 = this.refs;
            var thumbHorizontal = _refs11.thumbHorizontal;
            var thumbVertical = _refs11.thumbVertical;
            var trackHorizontal = _refs11.trackHorizontal;
            var trackVertical = _refs11.trackVertical;
            var scrollLeft = values.scrollLeft;
            var clientWidth = values.clientWidth;
            var scrollWidth = values.scrollWidth;

            var trackHorizontalWidth = (0, _getInnerWidth2["default"])(trackHorizontal);
            var thumbHorizontalWidth = this.getThumbHorizontalWidth();
            var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
            var thumbHorizontalStyle = {
                width: thumbHorizontalWidth,
                transform: 'translateX(' + thumbHorizontalX + 'px)'
            };
            var scrollTop = values.scrollTop;
            var clientHeight = values.clientHeight;
            var scrollHeight = values.scrollHeight;

            var trackVerticalHeight = (0, _getInnerHeight2["default"])(trackVertical);
            var thumbVerticalHeight = this.getThumbVerticalHeight();
            var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
            var thumbVerticalStyle = {
                height: thumbVerticalHeight,
                transform: 'translateY(' + thumbVerticalY + 'px)'
            };
            if (hideTracksWhenNotNeeded) {
                var trackHorizontalStyle = {
                    visibility: scrollWidth > clientWidth ? 'visible' : 'hidden'
                };
                var trackVerticalStyle = {
                    visibility: scrollHeight > clientHeight ? 'visible' : 'hidden'
                };
                (0, _domCss2["default"])(trackHorizontal, trackHorizontalStyle);
                (0, _domCss2["default"])(trackVertical, trackVerticalStyle);
            }
            (0, _domCss2["default"])(thumbHorizontal, thumbHorizontalStyle);
            (0, _domCss2["default"])(thumbVertical, thumbVerticalStyle);
        }
        if (onUpdate) onUpdate(values);
        if (typeof callback !== 'function') return;
        callback(values);
    },
    render: function render() {
        var scrollbarWidth = (0, _getScrollbarWidth2["default"])();
        /* eslint-disable no-unused-vars */
        var _props5 = this.props;
        var onScroll = _props5.onScroll;
        var onScrollFrame = _props5.onScrollFrame;
        var onScrollStart = _props5.onScrollStart;
        var onScrollStop = _props5.onScrollStop;
        var onUpdate = _props5.onUpdate;
        var renderView = _props5.renderView;
        var renderTrackHorizontal = _props5.renderTrackHorizontal;
        var renderTrackVertical = _props5.renderTrackVertical;
        var renderThumbHorizontal = _props5.renderThumbHorizontal;
        var renderThumbVertical = _props5.renderThumbVertical;
        var tagName = _props5.tagName;
        var hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded;
        var autoHide = _props5.autoHide;
        var autoHideTimeout = _props5.autoHideTimeout;
        var autoHideDuration = _props5.autoHideDuration;
        var thumbSize = _props5.thumbSize;
        var thumbMinSize = _props5.thumbMinSize;
        var universal = _props5.universal;
        var autoHeight = _props5.autoHeight;
        var autoHeightMin = _props5.autoHeightMin;
        var autoHeightMax = _props5.autoHeightMax;
        var style = _props5.style;
        var children = _props5.children;

        var props = _objectWithoutProperties(_props5, ['onScroll', 'onScrollFrame', 'onScrollStart', 'onScrollStop', 'onUpdate', 'renderView', 'renderTrackHorizontal', 'renderTrackVertical', 'renderThumbHorizontal', 'renderThumbVertical', 'tagName', 'hideTracksWhenNotNeeded', 'autoHide', 'autoHideTimeout', 'autoHideDuration', 'thumbSize', 'thumbMinSize', 'universal', 'autoHeight', 'autoHeightMin', 'autoHeightMax', 'style', 'children']);
        /* eslint-enable no-unused-vars */

        var didMountUniversal = this.state.didMountUniversal;


        var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
        }), style);

        var viewStyle = _extends({}, _styles.viewStyleDefault, {
            // Hide scrollbars by setting a negative margin
            marginRight: scrollbarWidth ? -scrollbarWidth : 0,
            marginBottom: scrollbarWidth ? -scrollbarWidth : 0
        }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
            // Add scrollbarWidth to autoHeight in order to compensate negative margins
            minHeight: (0, _isString2["default"])(autoHeightMin) ? 'calc(' + autoHeightMin + ' + ' + scrollbarWidth + 'px)' : autoHeightMin + scrollbarWidth,
            maxHeight: (0, _isString2["default"])(autoHeightMax) ? 'calc(' + autoHeightMax + ' + ' + scrollbarWidth + 'px)' : autoHeightMax + scrollbarWidth
        }), autoHeight && universal && !didMountUniversal && {
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
        }, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);

        var trackAutoHeightStyle = {
            transition: 'opacity ' + autoHideDuration + 'ms',
            opacity: 0
        };

        var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
            display: 'none'
        });

        var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
            display: 'none'
        });

        return (0, _react.createElement)(tagName, _extends({}, props, { style: containerStyle, ref: 'container' }), [(0, _react.cloneElement)(renderView({ style: viewStyle }), { key: 'view', ref: 'view' }, children), (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { key: 'trackHorizontal', ref: 'trackHorizontal' }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: 'thumbHorizontal' })), (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { key: 'trackVertical', ref: 'trackVertical' }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: 'thumbVertical' }))]);
    }
});
},{"../utils/getInnerHeight":17,"../utils/getInnerWidth":18,"../utils/getScrollbarWidth":19,"../utils/isString":20,"../utils/returnFalse":21,"./defaultRenderElements":13,"./styles":15,"dom-css":3,"raf":11,"react":undefined}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var containerStyleDefault = exports.containerStyleDefault = {
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    height: '100%'
};

// Overrides containerStyleDefault properties
var containerStyleAutoHeight = exports.containerStyleAutoHeight = {
    height: 'auto'
};

var viewStyleDefault = exports.viewStyleDefault = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'scroll',
    WebkitOverflowScrolling: 'touch'
};

// Overrides viewStyleDefault properties
var viewStyleAutoHeight = exports.viewStyleAutoHeight = {
    position: 'relative',
    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined
};

var viewStyleUniversalInitial = exports.viewStyleUniversalInitial = {
    overflow: 'hidden',
    marginRight: 0,
    marginBottom: 0
};

var trackHorizontalStyleDefault = exports.trackHorizontalStyleDefault = {
    position: 'absolute',
    height: 6
};

var trackVerticalStyleDefault = exports.trackVerticalStyleDefault = {
    position: 'absolute',
    width: 6
};

var thumbHorizontalStyleDefault = exports.thumbHorizontalStyleDefault = {
    position: 'relative',
    display: 'block',
    height: '100%'
};

var thumbVerticalStyleDefault = exports.thumbVerticalStyleDefault = {
    position: 'relative',
    display: 'block',
    width: '100%'
};

var disableSelectStyle = exports.disableSelectStyle = {
    userSelect: 'none'
};

var disableSelectStyleReset = exports.disableSelectStyleReset = {
    userSelect: ''
};
},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scrollbars = undefined;

var _Scrollbars = require('./Scrollbars');

var _Scrollbars2 = _interopRequireDefault(_Scrollbars);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

exports["default"] = _Scrollbars2["default"];
exports.Scrollbars = _Scrollbars2["default"];
},{"./Scrollbars":14}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInnerHeight;
function getInnerHeight(el) {
    var clientHeight = el.clientHeight;

    var _getComputedStyle = getComputedStyle(el);

    var paddingTop = _getComputedStyle.paddingTop;
    var paddingBottom = _getComputedStyle.paddingBottom;

    return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
}
},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getInnerWidth;
function getInnerWidth(el) {
    var clientWidth = el.clientWidth;

    var _getComputedStyle = getComputedStyle(el);

    var paddingLeft = _getComputedStyle.paddingLeft;
    var paddingRight = _getComputedStyle.paddingRight;

    return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
}
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = getScrollbarWidth;

var _domCss = require('dom-css');

var _domCss2 = _interopRequireDefault(_domCss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var scrollbarWidth = false;

function getScrollbarWidth() {
    if (scrollbarWidth !== false) return scrollbarWidth;
    /* istanbul ignore else */
    if (typeof document !== 'undefined') {
        var div = document.createElement('div');
        (0, _domCss2["default"])(div, {
            width: 100,
            height: 100,
            position: 'absolute',
            top: -9999,
            overflow: 'scroll',
            MsOverflowStyle: 'scrollbar'
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
    } else {
        scrollbarWidth = 0;
    }
    return scrollbarWidth;
}
},{"dom-css":3}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = isString;
function isString(maybe) {
    return typeof maybe === 'string';
}
},{}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = returnFalse;
function returnFalse() {
    return false;
}
},{}],22:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
* @providesModule shallowCompare
*/

'use strict';

var shallowEqual = require('fbjs/lib/shallowEqual');

/**
 * Does a shallow comparison for props and state.
 * See ReactComponentWithPureRenderMixin
 * See also https://facebook.github.io/react/docs/shallow-compare.html
 */
function shallowCompare(instance, nextProps, nextState) {
  return !shallowEqual(instance.props, nextProps) || !shallowEqual(instance.state, nextState);
}

module.exports = shallowCompare;
},{"fbjs/lib/shallowEqual":4}],23:[function(require,module,exports){

var space = require('to-space-case')

/**
 * Export.
 */

module.exports = toCamelCase

/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */

function toCamelCase(string) {
  return space(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}

},{"to-space-case":25}],24:[function(require,module,exports){

/**
 * Export.
 */

module.exports = toNoCase

/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/
var hasSeparator = /[\W_]/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/

/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase(string) {
  if (hasSpace.test(string)) return string.toLowerCase()
  if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase()
  if (hasCamel.test(string)) return uncamelize(string).toLowerCase()
  return string.toLowerCase()
}

/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g

/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate(string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g

/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize(string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

},{}],25:[function(require,module,exports){

var clean = require('to-no-case')

/**
 * Export.
 */

module.exports = toSpaceCase

/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */

function toSpaceCase(string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  }).trim()
}

},{"to-no-case":24}],26:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _createClass=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),_get=function(e,t,r){for(var n=!0;n;){var i=e,a=t,o=r;n=!1,null===i&&(i=Function.prototype);var u=Object.getOwnPropertyDescriptor(i,a);if(void 0!==u){if("value"in u)return u.value;var l=u.get;if(void 0===l)return;return l.call(o)}var c=Object.getPrototypeOf(i);if(null===c)return;e=c,t=a,r=o,n=!0,u=c=void 0}},InfiniteComputer=require("./infiniteComputer.js"),bs=require("../utils/binaryIndexSearch.js"),ArrayInfiniteComputer=function(e){function t(e,r){_classCallCheck(this,t),_get(Object.getPrototypeOf(t.prototype),"constructor",this).call(this,e,r),this.prefixHeightData=this.heightData.reduce(function(e,t){return 0===e.length?[t]:(e.push(e[e.length-1]+t),e)},[])}return _inherits(t,e),_createClass(t,[{key:"maybeIndexToIndex",value:function(e){return"undefined"==typeof e||null===e?this.prefixHeightData.length-1:e}},{key:"getTotalScrollableHeight",value:function(){var e=this.prefixHeightData.length;return 0===e?0:this.prefixHeightData[e-1]}},{key:"getDisplayIndexStart",value:function(e){var t=bs.binaryIndexSearch(this.prefixHeightData,e,bs.opts.CLOSEST_HIGHER);return this.maybeIndexToIndex(t)}},{key:"getDisplayIndexEnd",value:function(e){var t=bs.binaryIndexSearch(this.prefixHeightData,e,bs.opts.CLOSEST_HIGHER);return this.maybeIndexToIndex(t)}},{key:"getTopSpacerHeight",value:function(e){var t=e-1;return t<0?0:this.prefixHeightData[t]}},{key:"getBottomSpacerHeight",value:function(e){return e===-1?0:this.getTotalScrollableHeight()-this.prefixHeightData[e]}}]),t}(InfiniteComputer);module.exports=ArrayInfiniteComputer;


},{"../utils/binaryIndexSearch.js":29,"./infiniteComputer.js":28}],27:[function(require,module,exports){
"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _createClass=function(){function t(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),_get=function(t,e,r){for(var n=!0;n;){var o=t,i=e,a=r;n=!1,null===o&&(o=Function.prototype);var u=Object.getOwnPropertyDescriptor(o,i);if(void 0!==u){if("value"in u)return u.value;var l=u.get;if(void 0===l)return;return l.call(a)}var c=Object.getPrototypeOf(o);if(null===c)return;t=c,e=i,r=a,n=!0,u=c=void 0}},InfiniteComputer=require("./infiniteComputer.js"),ConstantInfiniteComputer=function(t){function e(){_classCallCheck(this,e),_get(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,arguments)}return _inherits(e,t),_createClass(e,[{key:"getTotalScrollableHeight",value:function(){return this.heightData*this.numberOfChildren}},{key:"getDisplayIndexStart",value:function(t){return Math.floor(t/this.heightData)}},{key:"getDisplayIndexEnd",value:function(t){var e=Math.ceil(t/this.heightData);return e>0?e-1:e}},{key:"getTopSpacerHeight",value:function(t){return t*this.heightData}},{key:"getBottomSpacerHeight",value:function(t){var e=t+1;return Math.max(0,(this.numberOfChildren-e)*this.heightData)}}]),e}(InfiniteComputer);module.exports=ConstantInfiniteComputer;


},{"./infiniteComputer.js":28}],28:[function(require,module,exports){
"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var _createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),InfiniteComputer=function(){function e(t,n){_classCallCheck(this,e),this.heightData=t,this.numberOfChildren=n}return _createClass(e,[{key:"getTotalScrollableHeight",value:function(){}},{key:"getDisplayIndexStart",value:function(e){}},{key:"getDisplayIndexEnd",value:function(e){}},{key:"getTopSpacerHeight",value:function(e){}},{key:"getBottomSpacerHeight",value:function(e){}}]),e}();module.exports=InfiniteComputer;


},{}],29:[function(require,module,exports){
"use strict";var opts={CLOSEST_LOWER:1,CLOSEST_HIGHER:2},binaryIndexSearch=function(r,t,e){for(var n,o,S,a=r.length-1,s=0;s<=a;){if(o=s+Math.floor((a-s)/2),S=r[o],S===t)return o;S<t?s=o+1:S>t&&(a=o-1)}return e===opts.CLOSEST_LOWER&&s>0?n=s-1:e===opts.CLOSEST_HIGHER&&a<r.length-1&&(n=a+1),n};module.exports={binaryIndexSearch:binaryIndexSearch,opts:opts};


},{}],30:[function(require,module,exports){
(function (global){
"use strict";var React=global.React||require("react"),_isFinite=require("lodash.isfinite");module.exports=function(e){var r="Invariant Violation: ";if(!e.containerHeight&&!e.useWindowAsScrollContainer)throw new Error(r+"Either containerHeight or useWindowAsScrollContainer must be provided.");if(!_isFinite(e.elementHeight)&&!Array.isArray(e.elementHeight))throw new Error(r+"You must provide either a number or an array of numbers as the elementHeight.");if(Array.isArray(e.elementHeight)&&React.Children.count(e.children)!==e.elementHeight.length)throw new Error(r+"There must be as many values provided in the elementHeight prop as there are children.")};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"lodash.isfinite":6,"react":undefined}],31:[function(require,module,exports){
"use strict";Object.assign||(Object.assign=require("object-assign")),Array.isArray||(Array.isArray=require("lodash.isarray"));


},{"lodash.isarray":5,"object-assign":7}],32:[function(require,module,exports){
(function (global){
"use strict";function createInfiniteComputer(e,t){var r,n=React.Children.count(t);return r=Array.isArray(e)?new ArrayInfiniteComputer(e,n):new ConstantInfiniteComputer(e,n)}function recomputeApertureStateFromOptionsAndScrollTop(e,t){var r=e.preloadBatchSize,n=e.preloadAdditionalHeight,o=e.infiniteComputer;return function(){var e=0===r?0:Math.floor(t/r),i=r*e,a=i+r,p=Math.max(0,i-n),u=Math.min(o.getTotalScrollableHeight(),a+n);return{displayIndexStart:o.getDisplayIndexStart(p),displayIndexEnd:o.getDisplayIndexEnd(u)}}()}var ConstantInfiniteComputer=require("../computers/constantInfiniteComputer.js"),ArrayInfiniteComputer=require("../computers/arrayInfiniteComputer.js"),React=global.React||require("react");module.exports={createInfiniteComputer:createInfiniteComputer,recomputeApertureStateFromOptionsAndScrollTop:recomputeApertureStateFromOptionsAndScrollTop};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../computers/arrayInfiniteComputer.js":26,"../computers/constantInfiniteComputer.js":27,"react":undefined}],33:[function(require,module,exports){
"use strict";module.exports={CONTAINER_HEIGHT_SCALE_FACTOR:"containerHeightScaleFactor"};


},{}],34:[function(require,module,exports){
(function (global){
"use strict";var React=global.React||require("react");module.exports={preloadType:React.PropTypes.oneOfType([React.PropTypes.number,React.PropTypes.shape({type:React.PropTypes.oneOf(["containerHeightScaleFactor"]).isRequired,amount:React.PropTypes.number.isRequired})])};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react":undefined}]},{},[1])(1)
});