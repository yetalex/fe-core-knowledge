/**
 * 1. 通过reduce实现runPromiseInSequence
 */

const runPromiseInSequence = (array, value) => array.reduce(
  (promiseChain, currentFunction) => promiseChain.then(currentFunction),
  Promise.resolve(value)
)

/**
 * 2. 通过reduce实现pipe
 */

const pipe = (...functions) => input => functions.reduce(
  (acc, fn) => fn(acc),
  input
)

/**
 * 3. 实现一个reduce
 */

if (!Array.prototype.reduce) {
  Object.defineProperty(Array.prototype, 'reduce', {
    value: function(callback /*, initialValue */) {
      if (this === null) {
        throw new TypeError('Array.prototype.reduce ' + 
          'called on null or undefined')
      }

      if (typeof callback !== 'function') {
        throw new TypeError(callback + 
          ' is not a function')
      }

      var o = Object(this)

      var len = o.length >>> 0  // 如果是undefined/null 无符号右移0位，会得到值 0

      var k = 0
      var value

      if (arguments.length >= 2) {
        value = arguments[1]
      } else {
        while (k < len && !(k in o)) {
          k++
        }

        if (k >= len) {
          throw new TypeError( 'Reduce of empty array ' + 
          'with no initial value' )
        }
        value = o[k++]
      }

      while (k < len) {
        if (k in o) {
          value = callback(value, o[k], k, o)
        }

        k++
      }

      return value
    }
  })
}

/**
 * 4. 另一个reduce实现
 */

Array.prototype.reduce = Array.prototype.reduce || function(func, initialValue) {
  var arr = this
  var base = typeof initialValue === 'undefined' ? arr[0] : initialValue
  var startPoint = typeof initialValue === 'undefined' ? 1 : 0
  arr.slice(startPoint).forEach(function(val, index) {
    base = func(base, val, index + startPoint, arr)
  })

  return base
}