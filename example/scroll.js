var frisbee = new window.Frisbee({
  namespace: 'scroll',
  url: 'http://mockbin.org/request/foo',
  maxItems: 10
})
var frisbeeCustomRequestData = new window.Frisbee({
  namespace: 'scroll-custom',
  url: 'http://mockbin.org/request/foo-custom',
  maxItems: 6,
  getRequestData: function (data, meta) {
    var requestData = []
    data.forEach(function (item) {
      requestData.push({
        value: item,
        id: meta.id,
        namespace: meta.namespace
      })
    })

    return JSON.stringify(requestData)
  }
})
var lastKnownScrollPosition = 0
var ticking = false

function trackScroll (scrollPos) {
  frisbee.add(scrollPos)
  frisbeeCustomRequestData.add(scrollPos)
}

window.addEventListener('scroll', function (e) {
  lastKnownScrollPosition = window.scrollY ||
    window.pageYOffset ||
    document.documentElement.scrollTop

  if (!ticking) {
    window.requestAnimationFrame(function () {
      trackScroll(lastKnownScrollPosition)
      ticking = false
    })

    ticking = true
  }
})
