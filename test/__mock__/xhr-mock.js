export const mockXhr = () => ({
  open: jest.fn(),
  send: jest.fn(),
  setRequestHeader: jest.fn()
})

window.XMLHttpRequest = jest.fn().mockImplementation(mockXhr)
