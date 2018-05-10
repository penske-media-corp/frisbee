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

export default utils
