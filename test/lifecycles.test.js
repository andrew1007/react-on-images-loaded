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

describe('componentWillMount', () => {
  const delayComponent = Object.assign({}, component)
  delayComponent.componentWillMount = component.componentWillMount.bind(delayComponent)
  describe('delay', () => {
    it('sets _delay to 0 if not described', () => {
      delayComponent.props.delay = null
      delayComponent.componentWillMount()
      expect(delayComponent._delay).toEqual(0)
    })
    it('sets _delay properly if delay is defined', () => {
      delayComponent.props.delay = 1000
      delayComponent.componentWillMount()
      expect(delayComponent._delay).toEqual(1000)
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
    const mountComponent = Object.assign({}, component)
    mountComponent.componentDidMount = component.componentDidMount.bind(mountComponent)
    it('sets mounted to true', () => {
      mountComponent.componentDidMount()
      expect(mountComponent.mounted).toEqual(true)
    })
  })

  describe('when images exist', () => {
    const imageExistsComponent = Object.assign({}, component)
    imageExistsComponent.componentDidMount = component.componentDidMount.bind(imageExistsComponent)
    imageExistsComponent.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
    imageExistsComponent._addImageEventListeners = jest.fn()
    imageExistsComponent._imgs = ['test1', 'test2']
    it('calls _addImageEventListeners', () => {
      imageExistsComponent.componentDidMount()
      expect(imageExistsComponent._addImageEventListeners).toBeCalled()
    })
    it('calls _setOnTimeoutEvent', () => {
      imageExistsComponent.componentDidMount()
      expect(imageExistsComponent._setOnTimeoutEvent).toBeCalled()
    })
    it('[DEPRECIATED] does not call onDidMount if not defined', () => {
      imageExistsComponent._isInProps = jest.fn((prop) => {
        prop === 'onDidMount' ? false : true
      })
      imageExistsComponent.componentDidMount()
      expect(imageExistsComponent.props.onDidMount).not.toBeCalled()
    })
  })

  describe('when no images are in component', () => {
    const componentNoImages = new OnImagesLoaded
    componentNoImages.imageLoad = {}
    componentNoImages.props = {}
    componentNoImages.props.onLoaded = jest.fn()
    componentNoImages._addImageEventListeners = jest.fn()
    componentNoImages._setOnTimeoutEvent = jest.fn()
    componentNoImages.imageLoad.getElementsByTagName = jest.fn(() => [])
    it('runs onLoaded prop immediately', () => {
      componentNoImages.componentDidMount()
      expect(componentNoImages.props.onLoaded).toBeCalled()
    })
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
  const unmountedComponent = Object.assign({}, component)
  unmountedComponent.componentWillUnmount = component.componentWillUnmount.bind(unmountedComponent)
  unmountedComponent._imgs = ['test1', 'test2']
  it('sets mounted to false', () => {
    unmountedComponent.componentWillUnmount()
    expect(unmountedComponent.mounted).toEqual(false)
  })
  it('remove event listeners if images exist', () => {
    unmountedComponent.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
    unmountedComponent.componentWillUnmount()
    expect(unmountedComponent._removeImageEventListeners).toBeCalled()
  })
})
