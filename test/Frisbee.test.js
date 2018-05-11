import Request from '../src/Request'
import Frisbee from '../src/Frisbee'

jest.mock('../src/Request')

describe('Frisbee', () => {
  const options = {
    method: 'POST',
    url: 'http://foo',
    headers: {
      key1: 'value1',
      key2: 'value2'
    },
    getRequestData: jest.fn(),
    maxItems: 2
  }
  let frisbee
  beforeEach(() => {
    frisbee = new Frisbee(options)
  })

  it('returns a frisbee instance', () => {
    expect(frisbee).toBeTruthy()
    expect(frisbee).toBeDefined()
    expect(frisbee).toBeInstanceOf(Frisbee)
    expect(frisbee).toHaveProperty('add')
    expect(frisbee).toHaveProperty('sendAll')
    expect(frisbee).not.toHaveProperty('send')
  })

  it('makes request every `maxItems`', () => {
    frisbee.add(1)
    expect(options.getRequestData).not.toHaveBeenCalled()
    expect(Request).not.toHaveBeenCalled()
    frisbee.add(2)
    expect(options.getRequestData).toHaveBeenCalledTimes(1)
    expect(Request).toHaveBeenCalledTimes(1)
    frisbee.add(3)
    expect(options.getRequestData).toHaveBeenCalledTimes(1)
    expect(Request).toHaveBeenCalledTimes(1)
    frisbee.add(4)
    expect(options.getRequestData).toHaveBeenCalledTimes(2)
    expect(Request).toHaveBeenCalledTimes(2)
  })
})
