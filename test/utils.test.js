import utils from '../src/utils'

describe('utils', () => {
  /**
   * 1. First 8 characters can be anything from 0-9, a-f, A-F: [0-9a-fA-F]{8}
   * 2. A single hypen may follow: -?
   * 3. Next 4 characters can be anything from 0-9, a-f, A-F: [0-9a-fA-F]{4}
   * 4. A single hypen may follow: -?
   * 5. A single ‘4’ must follow
   * 6. Next 3 characters can be anything from 0-9, a-f, A-F: [0-9a-fA-F]{3}
   * 7. A single hypen may follow: -?
   * 8. The next character must be either 8, 9, a, b: [89abAB]
   * 9. Next 3 characters can be anything from 0-9, a-f, A-F: [0-9a-fA-F]{3}
   * 10. A single hypen may follow: -?
   * 11. Next 12 characters can be anything from 0-9, a-f, A-F: [0-9a-fA-F]{12}
   */
  describe('uuid', () => {
    it('generates RFC4122 complaint UUID', () => {
      const uuid = utils.uuid()
      // eslint-disable-next-line max-len
      const isValid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid)

      expect(uuid).toBeDefined()
      expect(uuid).toBeTruthy()
      expect(isValid).toBe(true)
    })
  })

  describe('getXhrOptions', () => {
    it('returns default options', () => {
      const xhrOptions = utils.getXhrOptions({})

      expect(xhrOptions).toBeDefined()
      expect(xhrOptions).toBeTruthy()
      expect(xhrOptions).toBeInstanceOf(Object)
      expect(xhrOptions).toEqual({
        method: 'POST',
        url: undefined,
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      })
    })

    it('sets url', () => {
      const xhrOptions = utils.getXhrOptions({
        url: 'some-url'
      })

      expect(xhrOptions).toHaveProperty('url', 'some-url')
    })

    it('overwrites method and headers', () => {
      const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
      const xhrOptions = utils.getXhrOptions({
        method: 'PATCH',
        headers
      })

      expect(xhrOptions).toHaveProperty('method', 'PATCH')
      expect(xhrOptions).toHaveProperty('headers', headers)
    })
  })

  describe('getMeta', () => {
    it('returns meta', () => {
      const meta = utils.getMeta({})

      expect(meta).toBeDefined()
      expect(meta).toBeTruthy()
      expect(meta).toBeInstanceOf(Object)
      expect(meta).toHaveProperty('id')
    })
    it('returns namespace', () => {
      const namespace = 'ns'
      const meta = utils.getMeta({
        namespace
      })

      expect(meta).toHaveProperty('namespace', namespace)
    })
  })

  describe('getRequestData', () => {
    it('returns a string', () => {
      const requestData = utils.getRequestData()

      expect(requestData).toBeDefined()
      expect(requestData).toBeTruthy()
      expect(typeof requestData).toBe('string')
      expect(requestData).toBe('{}')
    })

    it('returns payload and meta', () => {
      const payload = 'foo-payload'
      const meta = 'bar-meta'
      const requestData = utils.getRequestData(payload, meta)

      expect(requestData).toBe(`{"payload":"${payload}","meta":"${meta}"}`)
    })
  })
})
