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
  it('sets _delay to 0 if not described', () => {
    const component = new OnImagesLoaded
    component.props = {}
    component.componentWillMount()
    expect(component._delay).toEqual(0)
  })
  it('sets _delay properly if delay is defined', () => {
    const component = new OnImagesLoaded
    component.props = {}
    component.props.delay = 1000
    component.componentWillMount()
    expect(component._delay).toEqual(1000)
  })
  it('sets _timeout to default (7000) if not described', () => {
    const component = new OnImagesLoaded
    component.props = {}
    component.componentWillMount()
    expect(component._timeout).toEqual(7000)
  })
  it('sets _timeout properly if timeout is defined', () => {
    const component = new OnImagesLoaded
    component.props = {}
    component.props.timeout = 1000
    component.componentWillMount()
    expect(component._timeout).toEqual(1000)
  })
})

describe('componentDidMount', () => {
})
