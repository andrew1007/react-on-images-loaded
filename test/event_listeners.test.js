const OnImagesLoaded = require('../lib/OnImagesLoaded')

const component = new OnImagesLoaded()
jest.useFakeTimers()
jest.runAllTimers()
component.setState = jest.fn((el, cb) => cb())
String.prototype.addEventListener = jest.fn()
component._delay = 0
component._onLoadEvent = jest.fn()

describe('_addImageEventListeners', () => {
  describe('has images', () => {
    const component = new OnImagesLoaded()
    jest.useFakeTimers()
    jest.runAllTimers()
    component.setState = jest.fn((el, cb) => cb())
    String.prototype.addEventListener = jest.fn()
    component._delay = 0
    component._onLoadEvent = jest.fn()
    component._imgs = ['test1', 'test2']
    it('calls addEventListener for all images', () => {
      component._addImageEventListeners()
      expect(String.prototype.addEventListener).toHaveBeenCalledTimes(2)
    })

    it('sets _onLoadEvent in the callback', () => {
      component._addImageEventListeners()
      expect(String.prototype.addEventListener).toBeCalledWith('load', component._onLoadEvent)
    })
  })
  describe('has no images', () => {
    it('doesnt set any event listeners', () => {
      const component = new OnImagesLoaded()
      component.setState = jest.fn((el, cb) => cb())
      String.prototype.addEventListener = jest.fn()
      component._onLoadEvent = jest.fn()
      component._imgs = []
      component._addImageEventListeners()
      expect(String.prototype.addEventListener).toHaveBeenCalledTimes(0)
    })
  })
})

describe('_removeImageEventListeners', () => {
  const component = new OnImagesLoaded()
  String.prototype.addEventListener = jest.fn()
  String.prototype.removeEventListener = jest.fn()
  component._onLoadEvent = jest.fn()
  component._imgs = ['test1', 'test2']
  it('has removeEventListener called with correct function', () => {
    component._removeImageEventListeners()
    expect(String.prototype.removeEventListener).toBeCalledWith('load', component._onLoadEvent)
  })
})

describe('_onLoadEvent', () => {
  const component = new OnImagesLoaded()
  component._hasBeenFullyAndProperlyLoaded = jest.fn(() => true)
  component._delay = 0
  component.setState = jest.fn((el, cb) => cb())
  component.mounted = true
  component._runOnLoadFunction = jest.fn()
  it('calls _runOnLoadFunction if fully loaded', () => {
    component._onLoadEvent()
    jest.runAllTimers()
    expect(component._runOnLoadFunction).toBeCalled()
  })
})
