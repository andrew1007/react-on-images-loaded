const React = require('react')
const OnImagesLoaded = require('../lib/OnImagesLoaded')

const MockComponent = new OnImagesLoaded
MockComponent.state = {}
MockComponent.props = {}
MockComponent.props.onLoaded = jest.fn()
MockComponent.props.onDidMount = jest.fn()
MockComponent.props.onTimeout = jest.fn()
MockComponent._addImageEventListeners = jest.fn()
MockComponent._setOnTimeoutEvent = jest.fn()
MockComponent._isInProps = jest.fn()
MockComponent.imageLoad = {}
MockComponent.imageLoad.getElementsByTagName = jest.fn(() => ['test1', 'test2'])
MockComponent._removeImageEventListeners = jest.fn()
MockComponent.setState = jest.fn((el, cb) => cb())
MockComponent._onLoadEvent = jest.fn()

module.exports = MockComponent
