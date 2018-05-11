import './__mock__/xhr-mock'
import Request from '../src/Request'

describe('Request', () => {
  const options = {
    method: 'POST',
    url: 'http://foo',
    headers: {
      key1: 'value1',
      key2: 'value2'
    }
  }
  let req
  beforeEach(() => {
    req = new Request(options)
  })

  it('returns an XMLHttpRequest object', () => {
    expect(req).toBeTruthy()
    expect(req).toBeDefined()
  })

  it('opens the connection', () => {
    expect(req.open).toHaveBeenCalledTimes(1)
    expect(req.open).toBeCalledWith(options.method, options.url, true)
  })

  it('sets request headers', () => {
    expect(req.setRequestHeader).toHaveBeenCalledTimes(2)
    Object.keys(options.headers).forEach(key => {
      expect(req.setRequestHeader).toBeCalledWith(key, options.headers[key])
    })
  })
})
