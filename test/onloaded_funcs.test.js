const React = require('react')
const OnImagesLoaded = require('../lib/OnImagesLoaded')

const component = new OnImagesLoaded
component.setState = jest.fn((el, cb) => cb())
component.props = {}
component.mounted = true
component.props.onLoaded = jest.fn()

describe('_runOnLoadFunction', () => {
  it('runs onLoaded if props exist', () => {
    component._isInProps = jest.fn(() => true)
    component._runOnLoadFunction()
    expect(component.props.onLoaded).toBeCalled()
  })
  it('does not run if props do not exist', () => {
    component.props.onLoaded = jest.fn()
    component._isInProps = jest.fn(() => false)
    component._runOnLoadFunction()
    expect(component.props.onLoaded).not.toBeCalled()
  })
})
