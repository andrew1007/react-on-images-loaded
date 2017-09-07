(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.OnImagesLoaded = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

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
			timedOut: true
		};
		this.onLoadEvent = this.onLoadEvent.bind(this);
	}

	_createClass(OnImagesLoaded, [{
		key: 'componentWillMount',
		value: function componentWillMount() {
			this.props.onWillMount ? this.props.onWillMount() : null;
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {
			this.setState({ loaded: true });
			var imgs = this.imageLoad.getElementsByTagName('img');
			for (var i = 0; i < imgs.length; i++) {
				imgs[i].removeEventListener("load", this.onLoadEvent);
			}
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			this.props.onDidMount ? this.props.onDidMount() : null;
			var imgs = this.imageLoad.getElementsByTagName('img');
			this.setState({ imageCount: imgs.length }, function () {
				for (var i = 0; i < imgs.length; i++) {
					imgs[i].addEventListener("load", _this.onLoadEvent);
				}
			});
		}
	}, {
		key: 'onLoadEvent',
		value: function onLoadEvent() {
			var _this2 = this;

			var delay = this.props.delay ? this.props.delay : 500;
			var timeout = this.props.timeout ? this.props.timeout : 5000;
			timeout = Math.max(timeout, delay);
			this.setState({
				loadCounter: this.state.loadCounter + 1
			}, function () {
				setTimeout(function () {
					if (_this2.state.loaded === false) {
						if (_this2.state.loadCounter === _this2.state.imageCount) {
							_this2.setState({ loaded: true, timedOut: false }, function () {
								_this2.props.onLoaded ? _this2.props.onLoaded() : null;
							});
						}
					}
				}, delay);
			});
			setTimeout(function () {
				if (_this2.state.timedOut && _this2.state.loaded === false) {
					_this2.setState({ loaded: true }, function () {
						_this2.props.onLoaded ? _this2.props.onLoaded() : null;
					});
				}
			}, timeout);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var currentClassName = undefined;
			if (this.state.loaded) {
				currentClassName = this.props.classNameOnLoaded;
			} else {
				currentClassName = this.props.classNameOnMount;
			}
			return _react2['default'].createElement(
				'div',
				null,
				this.state.loaded ? null : this.props.placeholder,
				_react2['default'].createElement(
					'div',
					{ ref: function (ctx) {
							_this3.imageLoad = ctx;
						}, className: currentClassName },
					this.props.children
				)
			);
		}
	}]);

	return OnImagesLoaded;
})(_react.Component);

exports['default'] = OnImagesLoaded;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});