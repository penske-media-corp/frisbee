(function () {
  function Request (options) {
    options = options || {}
    var xhr = new XMLHttpRequest()
    var headers = options.headers || {}
    var async = true

    xhr.open(options.method, options.url, async)

    Object.keys(headers).forEach(function (headerKey) {
      xhr.setRequestHeader(headerKey, headers[headerKey])
    })

    return xhr
  }

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
      console.log('queue is now', queue)
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

  function Frisbee (options) {
    var queue = new Queue()
    options = options || {}
    var maxItems = options.maxItems || 5
    var xhrOptions = {
      method: 'POST',
      url: 'https://httpbin.org/post',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    }

    var meta = {}
    meta.namespace = options.namespace
    meta.id = 'hfhfhdhsdhdshdh'

    var send = function (quantity) {
      var data = queue.dequeue(quantity)
      console.log('send!', data)
      var xhr = new Request(xhrOptions)
      xhr.send(JSON.stringify({
        payload: data,
        meta: meta
      }))
    }

    this.add = function (item) {
      queue.enqueue(item)
      if (queue.length === maxItems) {
        send(maxItems)
      }
    }

    this.sendAll = function () {
      var queueLength = queue.length
      if (!queueLength) {
        return
      }

      send(queueLength)
    }
  }

  var frisbee = new Frisbee()

  window.frisbee = {
    add: frisbee.add,
    forceSend: frisbee.sendAll
  }
})()
