const React = require('react')
const OnImagesLoaded = require('../lib/OnImagesLoaded')

const className = 'className'
const onDidMount = 'onDidMount'
const onTimeout = 'onTimeout'
const onLoaded = 'onLoaded'
const classNameOnLoaded = 'classNameOnLoaded'
const classNameOnMount = 'classNameOnMount'
const emptyArray = []
const images = ['test.jpg', 'test1.jpg']

const component = new OnImagesLoaded
component.props = {}
component.imageLoad = {}
component.props.onLoaded = jest.fn()
component.props.onDidMount = jest.fn()
component.props.onTimeout = jest.fn()
component._addImageEventListeners = jest.fn()
component._setOnTimeoutEvent = jest.fn()
component._isInProps = jest.fn()
component._removeImageEventListeners = jest.fn()
component.imageLoad.getElementsByTagName = jest.fn(() => [])

describe('componentWillMount', () => {
  describe('delay', () => {
    it('sets _delay to 0 if not described', () => {
      component.props.delay = null
      component.componentWillMount()
      expect(component._delay).toEqual(0)
    })
    it('sets _delay properly if delay is defined', () => {
      component.props.delay = 1000
      component.componentWillMount()
      expect(component._delay).toEqual(1000)
    })
  })
  describe('timeout', () => {
    const timeoutComponent = component
    timeoutComponent.componentWillMount = component.componentWillMount.bind(timeoutComponent)
    it('sets _timeout to default (7000) if not described', () => {
      timeoutComponent.props.timeout = null
      timeoutComponent.componentWillMount()
      expect(timeoutComponent._timeout).toEqual(7000)
    })
    it('sets _timeout properly if timeout is defined', () => {
      timeoutComponent.props.timeout = 1000
      timeoutComponent.componentWillMount()
      expect(timeoutComponent._timeout).toEqual(1000)
    })
  })
})

describe('componentDidMount', () => {
  describe('mount status', () => {
    component.mounted = false
    it('sets mounted to true', () => {
      component.componentDidMount()
      expect(component.mounted).toEqual(true)
    })
  })

  describe('when images exist', () => {
    it('calls _addImageEventListeners', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
      component._addImageEventListeners = jest.fn()
      component.componentDidMount()
      expect(component._addImageEventListeners).toBeCalled()
    })
    it('calls _setOnTimeoutEvent', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
      component._setOnTimeoutEvent = jest.fn()
      component.componentDidMount()
      expect(component._setOnTimeoutEvent).toBeCalled()
    })
    it('[DEPRECIATED] does not call onDidMount if not defined', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
      component._isInProps = jest.fn((prop) => {
        prop === 'onDidMount' ? false : true
      })
      component.componentDidMount()
      expect(component.props.onDidMount).not.toBeCalled()
    })
  })

  describe('when no images are in component', () => {
    it('runs onLoaded prop immediately', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component.props.onLoaded = jest.fn()
      component.componentDidMount()
      expect(component.props.onLoaded).toBeCalled()
    })
    it('does not add event listeners if _imgs is empty', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component._addImageEventListeners = jest.fn()
      component.componentDidMount()
      expect(component._addImageEventListeners).not.toBeCalled()
    })
    it('does not set timeout event if _imgs is empty', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component._setOnTimeoutEvent = jest.fn()
      component.componentDidMount()
      expect(component._setOnTimeoutEvent).not.toBeCalled()
    })
  })
})

describe('componentWillUnmount', () => {
  it('sets mounted to false', () => {
    component.mounted = true
    component.componentWillUnmount()
    expect(component.mounted).toEqual(false)
  })
  it('remove event listeners if images exist', () => {
    component._imgs = ['test1', 'test2']
    component._removeImageEventListeners = jest.fn()
    component.componentWillUnmount()
    expect(component._removeImageEventListeners).toBeCalled()
  })
})
