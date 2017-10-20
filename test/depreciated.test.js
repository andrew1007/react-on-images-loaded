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

describe('_depreciatedClassNameHandler', () => {
  const props = {classNameOnLoaded, classNameOnMount}
  const component = new OnImagesLoaded(props)

  it('[DEPRECIATED] uses classNameOnMount when not loaded === false', () => {
    component.state.loaded = false
    const className = component._depreciatedClassNameHandler()
    expect(className).toEqual('classNameOnMount')
  })

  it('[DEPRECIATED] uses classNameOnLoaded when loaded === true', () => {
    component.state.loaded = true
    const className = component._depreciatedClassNameHandler()
    expect(className).toEqual('classNameOnLoaded')
  })
})

describe('componentWillMount', () => {
  const component = new OnImagesLoaded
  component.props = {}
  const onWillMount = jest.fn()
  it('[DEPRECIATED] runs this.props.onWillMount if defined', () => {
    const onWillMount = jest.fn()
    component.props.onWillMount = onWillMount
    component.componentWillMount()
    expect(onWillMount).toBeCalled()
  })
  it('[DEPRECIATED] will not run this.props.onWillMount if not defined', () => {
    const onWillMount = jest.fn()
    component.props.onWillMount = onWillMount
    delete component['props']['onWillMount']
    component.componentWillMount()
    expect(onWillMount).not.toBeCalled()
  })
})
