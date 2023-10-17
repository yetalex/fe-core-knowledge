/**
 * 如何获取文档中任意一个元素与文档顶部的距离？
 * 即手动实现  jQuery.offset() 方法
 * 
 * 一、递归实现方案
 */

const offset = ele => {
  let result = {
    top: 0,
    left: 0
  }

  const getOffset = (node, init) => {
    if (node.nodeType !== 1) {
      return
    }

    position = window.getComputedStyle(node)['position']

    if (typeof(init) === 'undefined' && position === 'static') {
      getOffset(node.parentNode)
      return
    }

    result.top = node.offsetTop + result.top - node.scrollTop
    result.left = node.offsetLeft + result.left - node.scrollLeft

    if (position === 'fixed') {
      return
    }

    getOffset(node.parentNode)
  }

  if (window.getComputedStyle(ele)['display'] === 'none') {
    return result
  }

  let position
  getOffset(ele, true)
  return result
}

/**
 * 二、使用最新的API：getBoundingClientRect 方法
 */
const offset2 = ele => {
  let result = {
    top: 0,
    left: 0
  }

  // 如果当前浏览器为IE11以下的版本，则直接返回 { top: 0, left: 0 }
  if (!ele.getClientRects().length) {
    return result
  }

  // 如果当前DOM节点满足display === 'none'，则直接返回 { top: 0, left: 0 }
  if (window.getComputedStyle(ele)['display'] === 'none') {
    return result
  }

  result = ele.getBoundingClientRect()
  var docElement = ele.ownerDocument.documentElement

  return {
    top: result.top + window.pageYOffset - docElement.clientTop,
    left: result.left + window.pageXOffset - docElement.clientLeft
  }
}
