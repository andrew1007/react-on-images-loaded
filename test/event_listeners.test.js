const OnImagesLoaded = require('../lib/OnImagesLoaded')

const component = new OnImagesLoaded()
jest.useFakeTimers()
jest.runAllTimers()
component._imgs = ['test1', 'test2']
component.setState = jest.fn((el, cb) => cb())
String.prototype.addEventListener = jest.fn()
component._delay = 0

describe('_addImageEventListeners', () => {

  it('calls addEventListener for all images', () => {
    component._addImageEventListeners()
    expect(String.prototype.addEventListener).toHaveBeenCalledTimes(2)
  })

  it('sets _onLoadEvent in the callback', () => {
    component._onLoadEvent = jest.fn()
    component._addImageEventListeners()
    expect(String.prototype.addEventListener).toBeCalledWith('load', component._onLoadEvent)
  })
})

//doesn't work :(
describe('_onLoadEvent', () => {
  component._hasBeenFullyAndProperlyLoaded = jest.fn(() => true)
  component.mounted = true
  component._runOnLoadFunction = jest.fn()
  it('calls _runOnLoadFunction if fully loaded', () => {
    component._onLoadEvent()
    expect(component._runOnLoadFunction).toBeCalled()
  })
})
