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

describe('_isInProps', () => {
  it('tests for props', () => {
    const props = { className }
    const component = new OnImagesLoaded(props)
    const inProps = component._isInProps('className')
    expect(inProps).toEqual(true)
  })
})

describe('_depreciatedClassNameHandler', () => {
  const props = {classNameOnLoaded, classNameOnMount}
  const component = new OnImagesLoaded(props)

  it('uses classNameOnMount when not loaded === false', () => {
    component.state.loaded = false
    const className = component._depreciatedClassNameHandler()
    expect(className).toEqual('classNameOnMount')
  })

  it('uses classNameOnLoaded when loaded === true', () => {
    component.state.loaded = true
    const className = component._depreciatedClassNameHandler()
    expect(className).toEqual('classNameOnLoaded')
  })
})

describe('_hasTimedOut', () => {
  
})
