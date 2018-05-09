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

  var utils = {
    // RFC4122 complaint UUID
    uuid: function () {
      var uuid = ''
      var i
      var random

      for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0

        if (i === 8 || i === 12 || i === 16 || i === 20) {
          uuid += '-'
        }

        uuid += (i === 12
          ? 4
          : (i === 16
            ? (random & 3 | 8)
            : random
          )
        ).toString(16)
      }

      return uuid
    },

    getXhrOptions: function (options) {
      return {
        method: options.method || 'POST',
        url: options.url,
        headers: options.headers || {
          'Content-type': 'application/json; charset=utf-8'
        }
      }
    },

    getMeta: function (options) {
      return {
        id: this.uuid(),
        namespace: options.namespace
      }
    },

    getRequestData: function (data, meta) {
      return JSON.stringify({
        payload: data,
        meta: meta
      })
    }
  }

  function Frisbee (options) {
    var queue = new Queue()
    options = options || {}
    var maxItems = options.maxItems || 5
    var xhrOptions = utils.getXhrOptions(options)
    var meta = utils.getMeta(options)
    var getRequestData = typeof options.getRequestData === 'function'
      ? options.getRequestData
      : utils.getRequestData

    var send = function (quantity) {
      var data = queue.dequeue(quantity)
      var xhr = new Request(xhrOptions)
      var requestData = getRequestData(data, meta)

      if (requestData) {
        xhr.send(requestData)
      }
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

  window.Frisbee = Frisbee
})()
