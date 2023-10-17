/**
 * 1. compose 方法的参数是函数数组，返回的也是一个函数
 * 2. compose 方法的参数是任意长度的，所有的参数都是函数，执行方向是自右向左的，因此初始
 *    函数一定要放到参数的最右边
 * 3. compose 方法执行后返回的函数可以接收参数，这个参数将作为初始函数的参数。
 */

/**
 * compose 简单实现的面向过程的方案
 */

const compose1 = function(...args) {
  let length = args.length  // 参数个数，函数个数
  let count = length - 1
  let result  // 保存函数运行结果

  // 递归执行args中的函数
  return function f1 (...args1) {
    result = args[count].apply(this, args1)  // .apply(绑定对象，数组)
    if (count <= 0) {
      count = length - 1
      return result
    }
    count--
    // result为执行args[count]函数的结果，作为参数传递给f1
    return f1.call(null, result)  // .call(绑定对象，参数, ...)
  }
}

/**
 * compose 利用.reduce方法实现
 */

const compose2 = (...args) => {
  const reduceFunc = (f, g) => (...arg) => g.call(this, f.apply(this, arg))
  args.reverse().reduce(reduceFunc, args.shift())
}

/**
 * compose lodash 版本
 */

var compose3 = function(funcs) {
  var length = funcs.length
  var index = length
  while (index--) {  // 检查是否传递的参数都是函数
    if (typeof funcs[index] !== 'function') {
      throw new TypeError('Expected a function')
    }
  }

  return function(...args) {
    var index = 0
    var result = length ? funcs.reverse()[index].apply(this, args) : args[0]

    while (++index < length) {
      result = funcs[index].call(this, result)
    }
    return result
  }
}

/**
 * compose redux 实现版本
 */

function compose4(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
