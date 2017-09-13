'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var OnImagesLoaded = (function (_Component) {
	_inherits(OnImagesLoaded, _Component);

	function OnImagesLoaded(props) {
		_classCallCheck(this, OnImagesLoaded);

		_get(Object.getPrototypeOf(OnImagesLoaded.prototype), 'constructor', this).call(this, props);
		this.state = {
			loaded: false,
			loadCounter: 0,
			imageCount: 0,
			timedOut: true,
			className: ''
		};
		this.onLoadEvent = this.onLoadEvent.bind(this);
	}

	_createClass(OnImagesLoaded, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.props.onWillMount ? this.props.onWillMount() : null;
			var tempTimeout = this.props.timeout || this.props.timeout == 0 ? this.props.timeout : 7000;
			this.delay = this.props.delay || this.props.delay == 0 ? this.props.delay : 500;
			this.timeout = Math.max(tempTimeout, this.delay);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this._mounted = false;
			if (this.imgs.length !== 0) {
				this.removeImageEventListeners();
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._mounted = true;
			this.imgs = this.imageLoad.getElementsByTagName('img');
			if (this.imgs.length === 0) {
				this.props.onLoaded ? this.props.onLoaded() : this.props.onTimeout();
			} else {
				this.props.onDidMount ? this.props.onDidMount() : null;
				this.addImageEventListeners();
				this.setOnTimeoutEvent();
			}
		}
	}, {
		key: 'addImageEventListeners',
		value: function addImageEventListeners() {
			var _this = this;

			this.setState({ imageCount: this.imgs.length }, function () {
				for (var i = 0; i < _this.imgs.length; i++) {
					_this.imgs[i].addEventListener('load', _this.onLoadEvent);
				}
			});
		}
	}, {
		key: 'removeImageEventListeners',
		value: function removeImageEventListeners() {
			for (var i = 0; i < this.imgs.length; i++) {
				this.imgs[i].removeEventListener("load", this.onLoadEvent);
			}
		}
	}, {
		key: 'setOnTimeoutEvent',
		value: function setOnTimeoutEvent() {
			var _this2 = this;

			setTimeout(function () {
				_this2._mounted && !_this2.state.loaded ? _this2._runOnTimeoutFunction() : null;
			}, this.timeout);
		}
	}, {
		key: '_runOnTimeoutFunction',
		value: function _runOnTimeoutFunction() {
			var _this3 = this;

			this.setState({ loaded: true }, function () {
				if (_this3.props.onTimeout) {
					_this3.props.onTimeout();
				} else {
					_this3.props.onLoaded ? _this3.props.onLoaded() : null;
				}
			});
		}
	}, {
		key: 'onLoadEvent',
		value: function onLoadEvent() {
			var _this4 = this;

			this.setState({ loadCounter: this.state.loadCounter + 1 }, function () {
				setTimeout(function () {
					_this4._mounted && _this4._imagesLoaded() && !_this4.state.loaded ? _this4._runOnLoadFunction() : null;
				}, _this4.delay);
			});
		}
	}, {
		key: '_imagesLoaded',
		value: function _imagesLoaded() {
			return this.state.loadCounter >= this.state.imageCount;
		}
	}, {
		key: '_runOnLoadFunction',
		value: function _runOnLoadFunction() {
			var _this5 = this;

			this.setState({ loaded: true, timedOut: false }, function () {
				_this5.props.onLoaded ? _this5.props.onLoaded() : null;
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var className = undefined;
			if (this.props.classNameOnLoaded || this.props.classNameOnMount) {
				className = this.state.loaded ? this.props.classNameOnLoaded : this.props.classNameOnMount;
			}
			return _react2['default'].createElement(
				'div',
				null,
				this.state.loaded ? null : this.props.placeholder,
				_react2['default'].createElement(
					'div',
					{ ref: function (ctx) {
							_this6.imageLoad = ctx;
						}, className: className ? className : null },
					this.props.children
				)
			);
		}
	}]);

	return OnImagesLoaded;
})(_react.Component);

exports['default'] = OnImagesLoaded;
module.exports = exports['default'];