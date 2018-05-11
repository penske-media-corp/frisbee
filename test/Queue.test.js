import Queue from '../src/Queue'

describe('Queue', () => {
  let queue
  beforeEach(() => {
    queue = new Queue()
  })

  it('enqueues', () => {
    expect(queue.length).toBe(0)

    queue.enqueue(1)
    queue.enqueue(2)

    expect(queue.length).toBe(2)
  })

  it('dequeues', () => {
    queue.enqueue(1)
    queue.enqueue({ foo: 'bar' })
    queue.enqueue(null)

    let dequeued = queue.dequeue(2)

    expect(dequeued).toEqual([1, { foo: 'bar' }])
    expect(queue.length).toEqual(1)

    dequeued = queue.dequeue(1)
    expect(dequeued).toEqual([null])
    expect(queue.length).toEqual(0)
  })

  it('does not dequeue when quantity is falsy', () => {
    queue.enqueue(1)
    queue.enqueue(null)

    expect(queue.length).toEqual(2)
    let dequeued = queue.dequeue()

    expect(dequeued).toEqual(undefined)
    expect(queue.length).toEqual(2)
  })
})
