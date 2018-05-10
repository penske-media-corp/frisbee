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

export default Request
