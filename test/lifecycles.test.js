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

describe('componentWillMount', () => {
  const component = new OnImagesLoaded
  component.props = {}
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
  const component = new OnImagesLoaded
  component.props = {}
  component.imageLoad = {}
  component.props.onLoaded = jest.fn()
  component.props.onDidMount = jest.fn()
  component.props.onTimeout = jest.fn()
  component._addImageEventListeners = jest.fn()
  component._setOnTimeoutEvent = jest.fn()
  component.imageLoad.getElementsByTagName = jest.fn(() => [])
  component._isInProps = jest.fn()

  describe('when no images are in component', () => {
    it('does not add event listeners if _imgs is empty', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component.componentDidMount()
      expect(component._addImageEventListeners).not.toBeCalled()
    })
    it('does not set timeout event if _imgs is empty', () => {
      component.imageLoad.getElementsByTagName = jest.fn(() => [])
      component.componentDidMount()
      expect(component._setOnTimeoutEvent).not.toBeCalled()
    })
  })
  it('sets mounted to true', () => {
    component.componentDidMount()
    expect(component.mounted).toEqual(true)
  })
})
