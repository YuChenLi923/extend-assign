const isPlainObject = require('./libs/isPlainObject'),
      isType = require('./libs/isType');
function setProtectProperty(obj, key) {
  Object.defineProperty(obj, key, {
    enumerable: false,
    writable: false
  });
}

function autoSetProtectProperty(protect, protectGlobal, key, target, ops) {
  if (protect) {
    if (protectGlobal && (((isType(protect, 'array') && protect.includes(key)) || isType(protect, 'function') && protect(key)))) {
      setProtectProperty(target, key);
    } else if (!protectGlobal && ((isType(protect, 'array') && protect.includes(ops.parent ? ops.parent + '.' + key : key)) || isType(protect, 'function') && protect(ops.parent ? ops.parent + '.' + key : key))) {
      setProtectProperty(target, key);
    }
  }
}
function assign(...args) {
  let target = args.shift(),
      sourceObjs = args,
      len = sourceObjs.length,
      deep = args[len - 1],
      ops = {
        parent: ''
      },
      filter,
      filterGlobal,
      protectGlobal,
      protect,
      i,
      key,
      clone,
      source;
  if (!isType(target, 'object') && !isType(target, 'array')) {
    throw new Error('the target is not Object or Array');
  }
  if (isType(deep, 'object') && (args[len - 2] === true || args[len - 2] === false) ) {
    ops = deep;
    deep = args[len - 2];
    ({filter, protect, filterGlobal, protectGlobal} = ops);
    len = len - 2;
  } else if (deep === true) {
    --len;
    sourceObjs.pop();
  }
  for (i = 0; i < len; i++) {
    source = sourceObjs[i];
    for (key in source) {
      if (filter) {
        if (filterGlobal && ((isType(filter, 'array') && filter.includes(key)) || (isType(filter, 'function') && !filter(key)))) {
          continue;
        } else if (!filterGlobal && ((isType(filter, 'array') && filter.includes(ops.parent ? ops.parent + '.' + key : key)) || (isType(filter, 'function') && !filter(ops.parent ? ops.parent + '.' + key : key)))) {
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
          filter,
          protect,
          filterGlobal,
          protectGlobal
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
