function Queue () {
  var queue = []
  var _this = this
  this.length = 0

  var updateLength = function () {
    _this.length = queue.length
  }

  this.enqueue = function (item) {
    queue.push(item)
    updateLength()
  }

  this.dequeue = function (quantity) {
    if (!quantity) {
      return
    }
    // Time complexity for Array.prototype.splice is O(n)
    // For a very large queue this method needs to be optimized
    var dequeued = queue.splice(0, quantity)
    updateLength()

    return dequeued
  }
}

export default Queue
