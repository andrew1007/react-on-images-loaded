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
component._isInProps = jest.fn((prop) => prop !== 'onWillMount')
component._removeImageEventListeners = jest.fn()
component.imageLoad.getElementsByTagName = jest.fn(() => [])

describe('timingSetup', () => {
  describe('delay', () => {
    it('sets _delay to 0 if not described', () => {
      component.props.delay = null
      component.timingSetup()
      expect(component._delay).toEqual(0)
    })
    it('sets _delay properly if delay is defined', () => {
      component.props.delay = 1000
      component.timingSetup()
      expect(component._delay).toEqual(1000)
    })
  })
  describe('timeout', () => {
    it('sets _timeout to default (7000) if not described', () => {
      component.props.timeout = null
      component.timingSetup()
      expect(component._timeout).toEqual(7000)
    })
    it('sets _timeout properly if timeout is defined', () => {
      component.props.timeout = 1000
      component.timingSetup()
      expect(component._timeout).toEqual(1000)
    })
  })
})

describe('componentDidMount', () => {
  beforeEach(() => {
    component.timingSetup = jest.fn()
  })

  describe('mount status', () => {
    it('sets mounted to true', () => {
      component.mounted = false
      component.componentDidMount()
      expect(component.mounted).toEqual(true)
    })
  })

  describe('when images exist', () => {
    beforeEach(() => {
      component.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
      component._addImageEventListeners = jest.fn()
      component._setOnTimeoutEvent = jest.fn()
      component._isInProps = jest.fn((prop) => !(prop === 'onDidMount'))
      component.componentDidMount()
    })
    it('calls _addImageEventListeners', () => {
      expect(component._addImageEventListeners).toBeCalled()
    })
    it('calls _setOnTimeoutEvent', () => {
      expect(component._setOnTimeoutEvent).toBeCalled()
    })
    it('[DEPRECIATED] does not call onDidMount if not defined', () => {
      expect(component.props.onDidMount).not.toBeCalled()
    })
  })

  describe('when no images are in component', () => {
    beforeEach(() => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component._addImageEventListeners = jest.fn()
      component.props.onLoaded = jest.fn()
      component._setOnTimeoutEvent = jest.fn()
      component.componentDidMount()
    })
    it('runs onLoaded prop immediately', () => {
      expect(component.props.onLoaded).toBeCalled()
    })
    it('does not add event listeners if _imgs is empty', () => {
      expect(component._addImageEventListeners).not.toBeCalled()
    })
    it('does not set timeout event if _imgs is empty', () => {
      expect(component._setOnTimeoutEvent).not.toBeCalled()
    })
  })
})

describe('componentWillUnmount', () => {
  beforeEach(() => {
    component.mounted = true
    component._imgs = ['test1', 'test2']
    component._removeImageEventListeners = jest.fn()
    component.componentWillUnmount()
  })
  it('sets mounted to false', () => {
    expect(component.mounted).toEqual(false)
  })
  it('remove event listeners if images exist', () => {
    expect(component._removeImageEventListeners).toBeCalled()
  })
})
