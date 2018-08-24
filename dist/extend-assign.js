(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["eAssign"] = factory();
	else
		root["eAssign"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isPlainObject = __webpack_require__(1),
    isType = __webpack_require__(2);
function setProtectProperty(obj, key) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    writable: false
  });
}

function autoSetProtectProperty(protect, protectGlobal, key, target, ops) {
  if (protect) {
    if (protectGlobal && (isType(protect, 'array') && protect.includes(key) || isType(protect, 'function') && protect(key))) {
      setProtectProperty(target, key);
    } else if (!protectGlobal && (isType(protect, 'array') && protect.includes(ops.parent ? ops.parent + '.' + key : key) || isType(protect, 'function') && protect(ops.parent ? ops.parent + '.' + key : key))) {
      setProtectProperty(target, key);
    }
  }
}
function assign() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var target = args.shift(),
      sourceObjs = args,
      len = sourceObjs.length,
      deep = args[len - 1],
      ops = {
    parent: ''
  },
      filter = void 0,
      filterGlobal = void 0,
      protectGlobal = void 0,
      protect = void 0,
      i = void 0,
      key = void 0,
      clone = void 0,
      source = void 0;
  if (!isType(target, 'object') && !isType(target, 'array') && !isType(target, 'function')) {
    throw new Error('the target is not Object, Array or Function');
  }
  if (isType(deep, 'object') && (args[len - 2] === true || args[len - 2] === false)) {
    ops = deep;
    deep = args[len - 2];
    var _ops = ops;
    filter = _ops.filter;
    protect = _ops.protect;
    filterGlobal = _ops.filterGlobal;
    protectGlobal = _ops.protectGlobal;

    len = len - 2;
  } else if (deep === true) {
    --len;
    sourceObjs.pop();
  }
  for (i = 0; i < len; i++) {
    source = sourceObjs[i];
    for (key in source) {
      if (filter) {
        if (filterGlobal && (isType(filter, 'array') && filter.includes(key) || isType(filter, 'function') && !filter(key))) {
          continue;
        } else if (!filterGlobal && (isType(filter, 'array') && filter.includes(ops.parent ? ops.parent + '.' + key : key) || isType(filter, 'function') && !filter(ops.parent ? ops.parent + '.' + key : key))) {
          continue;
        }
      }
      if (deep === true && (isType(source[key], 'object') || isType(source[key], 'array'))) {
        if (isType(source[key], 'object')) {
          clone = target[key] && isPlainObject(target[key]) ? target[key] : {};
        } else {
          clone = target[key] && Array.isArray(target[key]) ? target[key] : [];
        }
        target[key] = assign(clone, source[key], deep, {
          parent: ops.parent ? ops.parent + '.' + key : key,
          filter: filter,
          protect: protect,
          filterGlobal: filterGlobal,
          protectGlobal: protectGlobal
        });
        autoSetProtectProperty(protect, protectGlobal, key, target, ops);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
        autoSetProtectProperty(protect, protectGlobal, key, target, ops);
      }
    }
  }
  return target;
}
module.exports = assign;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function isPlainObject(obj) {
  var hasOwn = Object.prototype.hasOwnProperty;
  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || typeof window !== 'undefined' && window.window === window && obj === window) {
    return false;
  }
  try {
    if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false;
    }
  } catch (e) {
    return false;
  }
  var key = void 0;
  for (key in obj) {
    // 1
  }
  return key === undefined || hasOwn.call(obj, key);
}
module.exports = isPlainObject;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isType(data, type) {
  var _type = Object.prototype.toString.call(data).replace(']', '').split(' ')[1];
  return _type.toLowerCase() === type.toLowerCase();
}
module.exports = isType;

/***/ })
/******/ ]);
});