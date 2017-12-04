
function isPlainObject(obj) {
  const hasOwn = Object.prototype.hasOwnProperty;
  if (!obj || typeof obj !== 'object' || (typeof window !== 'undefined' && window.window === window && obj === window)) {
    return false;
  }
  try {
    if (obj.constructor &&
      !hasOwn.call(obj, 'constructor') &&
      !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
      return false;
    }
  } catch (e) {
    return false;
  }
  let key;
  for (key in obj) {
    // 1
  }
  return key === undefined || hasOwn.call(obj, key);
}
module.exports = isPlainObject;
