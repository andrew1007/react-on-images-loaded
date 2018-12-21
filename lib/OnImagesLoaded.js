// @ts-check
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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

// travis demands that test be
// "test": "echo 'no tests yet'",
// instead of test: jest

var truthy = function truthy(el) {
	return ![false, undefined, null].includes(el);
};

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
			var _props = this.props;
			var onWillMount = _props.onWillMount;
			var delay = _props.delay;
			var timeout = _props.timeout;

			onWillMount ? onWillMount() : null;
			var tempTimeout = timeout;
			var tempDelay = delay;

			tempTimeout = truthy(tempTimeout) ? tempTimeout : 7000;
			this._delay = truthy(tempDelay) ? tempDelay : 0;
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
			var _props2 = this.props;
			var onLoaded = _props2.onLoaded;
			var onTimeout = _props2.onTimeout;
			var onDidMount = _props2.onDidMount;

			this.timingSetup();
			this.mounted = true;
			this._imgs = this.imageLoad.getElementsByTagName('img');
			if (this._imgs.length === 0) {
				if (onLoaded) {
					onLoaded();
				} else if (onTimeout) {
					onTimeout();
				}
			} else {
				onDidMount ? onDidMount() : null;
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
				this._imgs[i].removeEventListener('load', this._onLoadEvent);
			}
		}
	}, {
		key: '_setOnTimeoutEvent',
		value: function _setOnTimeoutEvent() {
			var _this2 = this;

			setTimeout(function () {
				_this2._hasTimedOut ? _this2._runOnTimeoutFunction() : null;
			}, this._timeout);
		}
	}, {
		key: '_runOnTimeoutFunction',
		value: function _runOnTimeoutFunction() {
			var _this3 = this;

			if (this.mounted) {
				(function () {
					var _props3 = _this3.props;
					var onTimeout = _props3.onTimeout;
					var onLoaded = _props3.onLoaded;

					_this3.setState({ loaded: true }, function () {
						if (onTimeout) {
							onTimeout();
						} else if (onLoaded) {
							onLoaded();
						}
					});
				})();
			}
		}
	}, {
		key: '_onLoadEvent',
		value: function _onLoadEvent() {
			var _this4 = this;

			if (this.mounted) {
				this.setState({ loadCounter: this.state.loadCounter + 1 }, function () {
					setTimeout(function () {
						_this4._hasBeenFullyAndProperlyLoaded ? _this4._runOnLoadFunction() : null;
					}, _this4._delay);
				});
			}
		}
	}, {
		key: '_runOnLoadFunction',
		value: function _runOnLoadFunction() {
			var _this5 = this;

			if (this.mounted) {
				(function () {
					var onLoaded = _this5.props.onLoaded;

					_this5.setState({ loaded: true, timedOut: false }, function () {
						onLoaded ? onLoaded() : null;
					});
				})();
			}
		}
	}, {
		key: '_depreciatedClassNameHandler',
		value: function _depreciatedClassNameHandler() {
			var _props4 = this.props;
			var className = _props4.className;
			var classNameOnLoaded = _props4.classNameOnLoaded;
			var classNameOnMount = _props4.classNameOnMount;

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

			if (this.imageLoad && this._hasDefinedClassName) {
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
	}, {
		key: '_hasBeenFullyAndProperlyLoaded',
		get: function get() {
			var _state = this.state;
			var loadCounter = _state.loadCounter;
			var imageCount = _state.imageCount;
			var loaded = _state.loaded;

			return this.mounted && loadCounter >= imageCount && !loaded;
		}
	}, {
		key: '_hasTimedOut',
		get: function get() {
			return this.mounted && !this.state.loaded;
		}
	}, {
		key: '_hasDefinedClassName',
		get: function get() {
			var _props5 = this.props;
			var classNameOnLoaded = _props5.classNameOnLoaded;
			var classNameOnMount = _props5.classNameOnMount;
			var className = _props5.className;

			return !!(classNameOnLoaded || classNameOnMount || className);
		}
	}]);

	return OnImagesLoaded;
})(_react.Component);

exports['default'] = OnImagesLoaded;

OnImagesLoaded.propTypes = {
	onTimeout: _propTypes2['default'].func,
	onLoaded: _propTypes2['default'].func.isRequired,
	delay: _propTypes2['default'].number,
	// depreciated
	onDidMount: _propTypes2['default'].func,
	onWillMount: _propTypes2['default'].func,
	classNameOnLoaded: _propTypes2['default'].string,
	classNameOnMount: _propTypes2['default'].string,
	className: _propTypes2['default'].string
};
module.exports = exports['default'];