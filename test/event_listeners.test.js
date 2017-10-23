const OnImagesLoaded = require('../lib/OnImagesLoaded')

const component = new OnImagesLoaded()
jest.useFakeTimers()
component.setState = jest.fn((el, cb) => cb())
String.prototype.addEventListener = jest.fn()
component._delay = 0
component._onLoadEvent = jest.fn()

describe('_addImageEventListeners', () => {
  // const component = new OnImagesLoaded()
  // component.setState = jest.fn((el, cb) => cb())
  // component._onLoadEvent = jest.fn()
  beforeEach(() => {
    component._imgs = ['test1', 'test2']
    String.prototype.addEventListener = jest.fn()
    component._addImageEventListeners()
  })
  describe('has images', () => {
    it('calls addEventListener for all images', () => {
      expect(String.prototype.addEventListener).toHaveBeenCalledTimes(2)
    })

    it('sets _onLoadEvent in the callback', () => {
      expect(String.prototype.addEventListener).toBeCalledWith('load', component._onLoadEvent)
    })
  })
  describe('has no images', () => {
    it('doesnt set any event listeners', () => {
      String.prototype.addEventListener = jest.fn()
      component._imgs = []
      component._addImageEventListeners()
      expect(String.prototype.addEventListener).toHaveBeenCalledTimes(0)
    })
  })
})

describe('_removeImageEventListeners', () => {
  beforeEach(() => {
    component._imgs = ['test1', 'test2']
    String.prototype.removeEventListener = jest.fn()
    component._removeImageEventListeners()
  })
  it('removes it for all images', () => {
    expect(String.prototype.removeEventListener).toHaveBeenCalledTimes(2)
  })
  it('has removeEventListener called with correct function', () => {
    expect(String.prototype.removeEventListener).toBeCalledWith('load', component._onLoadEvent)
  })
})

describe('_onLoadEvent', () => {
  const component = new OnImagesLoaded()
  component._hasBeenFullyAndProperlyLoaded = jest.fn(() => true)
  component._delay = 0
  component.setState = jest.fn((el, cb) => cb())
  component.mounted = true
  it('calls _runOnLoadFunction if fully loaded', () => {
    component._runOnLoadFunction = jest.fn()
    component._onLoadEvent()
    jest.runAllTimers()
    expect(component._runOnLoadFunction).toBeCalled()
  })
})
