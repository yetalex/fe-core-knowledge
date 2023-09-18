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
