
import Queue from './Queue'
import Request from './Request'
import utils from './utils'

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

export default Frisbee
