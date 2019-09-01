const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key)
}

function isEmptyObject(x) {
  return Object.keys(x).length === 0;
}

function isObject(x) {
  // typeof null -> object
  // typeof undefined -> undefined
  return x !== null && typeof x === 'object';
}

export {
  hasOwn,
  isEmptyObject,
  isObject
};