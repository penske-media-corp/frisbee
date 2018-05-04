var frisbee = new Frisbee({
  namespace: 'scroll',
  url: 'https://httpbin.org/post',
  maxItems: 10
})
var lastKnownScrollPosition = 0
var ticking = false

function trackScroll (scrollPos) {
  frisbee.add(scrollPos)
}

window.addEventListener('scroll', function (e) {
  lastKnownScrollPosition = window.scrollY

  if (!ticking) {
    window.requestAnimationFrame(function () {
      trackScroll(lastKnownScrollPosition)
      ticking = false
    })

    ticking = true
  }
})
