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
			imageCount: 0
		};
		this._onLoadEvent = this._onLoadEvent.bind(this);
	}

	_createClass(OnImagesLoaded, [{
		key: 'timingSetup',
		value: function timingSetup() {
			this._isInProps('onWillMount') ? this.props.onWillMount() : null;
			var tempTimeout = this.props.timeout;
			var tempDelay = this.props.delay;

			tempTimeout = tempTimeout || tempTimeout == 0 ? tempTimeout : 7000;
			this._delay = tempDelay || tempDelay == 0 ? tempDelay : 0;
			this._timeout = Math.max(tempTimeout, this._delay);
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.mounted = false;
			this._imgs.length > 0 ? this._removeImageEventListeners() : null;
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.timingSetup();
			this.mounted = true;
			this._imgs = this.imageLoad.getElementsByTagName('img');
			if (this._imgs.length === 0) {
				if (this._isInProps('onLoaded')) {
					this.props.onLoaded();
				} else if (this._isInProps('onTimeout')) {
					this.props.onTimeout();
				}
			} else {
				this._isInProps('onDidMount') ? this.props.onDidMount() : null;
				this._addImageEventListeners();
				this._setOnTimeoutEvent();
			}
		}
	}, {
		key: '_addImageEventListeners',
		value: function _addImageEventListeners() {
			var _this = this;

			this.setState({ imageCount: this._imgs.length }, function () {
				for (var i = 0; i < _this._imgs.length; i++) {
					_this._imgs[i].addEventListener('load', _this._onLoadEvent);
				}
			});
		}
	}, {
		key: '_removeImageEventListeners',
		value: function _removeImageEventListeners() {
			for (var i = 0; i < this._imgs.length; i++) {
				this._imgs[i].removeEventListener("load", this._onLoadEvent);
			}
		}
	}, {
		key: '_setOnTimeoutEvent',
		value: function _setOnTimeoutEvent() {
			var _this2 = this;

			setTimeout(function () {
				_this2._hasTimedOut() ? _this2._runOnTimeoutFunction() : null;
			}, this._timeout);
		}
	}, {
		key: '_isInProps',
		value: function _isInProps(prop) {
			return prop in this.props;
		}
	}, {
		key: '_runOnTimeoutFunction',
		value: function _runOnTimeoutFunction() {
			var _this3 = this;

			if (this.mounted) {
				this.setState({ loaded: true }, function () {
					if (_this3._isInProps('onTimeout')) {
						_this3.props.onTimeout();
					} else if (_this3._isInProps('onLoaded')) {
						_this3.props.onLoaded();
					}
				});
			}
		}
	}, {
		key: '_onLoadEvent',
		value: function _onLoadEvent() {
			var _this4 = this;

			if (this.mounted) {
				this.setState({ loadCounter: this.state.loadCounter + 1 }, function () {
					setTimeout(function () {
						_this4._hasBeenFullyAndProperlyLoaded() ? _this4._runOnLoadFunction() : null;
					}, _this4._delay);
				});
			}
		}
	}, {
		key: '_hasBeenFullyAndProperlyLoaded',
		value: function _hasBeenFullyAndProperlyLoaded() {
			return this.mounted && this.state.loadCounter >= this.state.imageCount && !this.state.loaded;
		}
	}, {
		key: '_hasTimedOut',
		value: function _hasTimedOut() {
			return this.mounted && !this.state.loaded;
		}
	}, {
		key: '_runOnLoadFunction',
		value: function _runOnLoadFunction() {
			var _this5 = this;

			if (this.mounted) {
				this.setState({ loaded: true, timedOut: false }, function () {
					_this5._isInProps('onLoaded') ? _this5.props.onLoaded() : null;
				});
			}
		}
	}, {
		key: '_depreciatedClassNameHandler',
		value: function _depreciatedClassNameHandler() {
			var _props = this.props;
			var className = _props.className;
			var classNameOnLoaded = _props.classNameOnLoaded;
			var classNameOnMount = _props.classNameOnMount;

			var classNames = { className: className, classNameOnLoaded: classNameOnLoaded, classNameOnMount: classNameOnMount };
			if (className) {
				return className;
			} else if (!this.state.loaded) {
				return classNameOnMount;
			} else {
				return classNameOnLoaded;
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _this6 = this;

			var hasDefinedClassName = this._isInProps('classNameOnLoaded') || this._isInProps('classNameOnMount') || this._isInProps('className');
			if (this.imageLoad && hasDefinedClassName) {
				this.imageLoad.className = this._depreciatedClassNameHandler();
			}
			return _react2['default'].createElement(
				'div',
				null,
				this.state.loaded ? null : this.props.placeholder,
				_react2['default'].createElement(
					'div',
					{ ref: function (ctx) {
							_this6.imageLoad = ctx;
						} },
					this.props.children
				)
			);
		}
	}]);

	return OnImagesLoaded;
})(_react.Component);

exports['default'] = OnImagesLoaded;
module.exports = exports['default'];