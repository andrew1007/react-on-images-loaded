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
component.imageLoad.getElementsByTagName = jest.fn(() => ['test.jpg'])
component._removeImageEventListeners = jest.fn()

describe('componentWillMount', () => {
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
  it('sets _timeout to default (7000) if not described', () => {
    component.props.timeout = null
    component.componentWillMount()
    expect(component._timeout).toEqual(7000)
  })
  it('sets _timeout properly if timeout is defined', () => {
    component.props.timeout = 1000
    component.componentWillMount()
    expect(component._timeout).toEqual(1000)
  })
})

describe('componentDidMount', () => {

  it('sets mounted to true', () => {
    component.componentDidMount()
    expect(component.mounted).toEqual(true)
  })

  describe('when images exist', () => {
    it('calls _addImageEventListeners', () => {
      component.componentDidMount()
      expect(component._addImageEventListeners).toBeCalled()
    })
    it('calls _setOnTimeoutEvent', () => {
      component.componentDidMount()
      expect(component._setOnTimeoutEvent).toBeCalled()
    })
    it('[DEPRECIATED] does not call onDidMount if not defined', () => {
      component._isInProps = jest.fn((prop) => {
        prop === 'onDidMount' ? false : true
      })
      component.componentDidMount()
      expect(component.props.onDidMount).not.toBeCalled()
    })
  })

  describe('when no images are in component', () => {
    const componentNoImages = new OnImagesLoaded
    componentNoImages.imageLoad = {}
    componentNoImages.props = {}
    componentNoImages.imageLoad.getElementsByTagName = jest.fn(() => [])
    componentNoImages._addImageEventListeners = jest.fn()
    componentNoImages._setOnTimeoutEvent = jest.fn()
    componentNoImages.props.onDidMount = jest.fn()
    it('does not add event listeners if _imgs is empty', () => {
      componentNoImages.componentDidMount()
      expect(componentNoImages._addImageEventListeners).not.toBeCalled()
    })
    it('does not set timeout event if _imgs is empty', () => {
      componentNoImages.componentDidMount()
      expect(componentNoImages._setOnTimeoutEvent).not.toBeCalled()
    })
  })
})

describe('componentWillUnmount', () => {
  it('sets mounted to false', () => {
    component.componentWillUnmount()
    expect(component.mounted).toEqual(false)
  })
  it('remove event listeners if images exist', () => {
    component.componentWillUnmount()
    expect(component._removeImageEventListeners).toBeCalled()
  })
})
