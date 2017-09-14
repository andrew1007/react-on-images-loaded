require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactOnImagesLoaded = require('react-on-images-loaded');

var _reactOnImagesLoaded2 = _interopRequireDefault(_reactOnImagesLoaded);

var _loadersRegular_image_loading = require('./loaders/regular_image_loading');

var _loadersRegular_image_loading2 = _interopRequireDefault(_loadersRegular_image_loading);

var _loadersImages_with_component = require('./loaders/images_with_component');

var _loadersImages_with_component2 = _interopRequireDefault(_loadersImages_with_component);

var _loading_spinner = require('./loading_spinner');

var _loading_spinner2 = _interopRequireDefault(_loading_spinner);

var _show_css = require('./show_css');

var _show_css2 = _interopRequireDefault(_show_css);

var App = (function (_Component) {
	_inherits(App, _Component);

	function App(props) {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).call(this, props);
		this.state = {
			regular: false,
			withComponent: false,
			showError: false
		};
		this.samples = ['regular', 'withComponent', 'css', 'showError'];
		this.toggleComponent = this.toggleComponent.bind(this);
		this.showError = this.showError.bind(this);
	}

	_createClass(App, [{
		key: 'toggleComponent',
		value: function toggleComponent(name) {
			var _this = this;

			var prevState = this.state[name];
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.samples[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var i = _step.value;

					this.setState(_defineProperty({}, i, false));
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator['return']) {
						_iterator['return']();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			if (name === 'withFunc') {
				setTimeout(function () {
					_this.setState(_defineProperty({}, name, prevState ? false : true));
				}, 400);
			} else {
				this.setState(_defineProperty({}, name, prevState ? false : true));
			}
		}
	}, {
		key: 'showError',
		value: function showError() {
			this.setState({ showError: true });
		}
	}, {
		key: 'error',
		value: function error() {
			return _react2['default'].createElement(
				'p',
				{ className: 'error' },
				'Oh no! OnImagesLoaded hit its default timeout cap (7000ms)',
				'and is mounting normally now. Is your internet connection slow?'
			);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			return _react2['default'].createElement(
				'div',
				{ className: 'container' },
				_react2['default'].createElement(
					'div',
					{ className: 'subcontainer' },
					_react2['default'].createElement(
						'div',
						{ className: 'button-container' },
						_react2['default'].createElement(
							'button',
							{ onClick: function () {
									return _this2.toggleComponent('regular');
								} },
							'normal rendering'
						),
						_react2['default'].createElement(
							'button',
							{ onClick: function () {
									return _this2.toggleComponent('withComponent');
								} },
							'using OnImagesLoaded'
						),
						_react2['default'].createElement(
							'button',
							{ onClick: function () {
									return _this2.toggleComponent('css');
								} },
							'show css'
						)
					),
					_react2['default'].createElement(
						'div',
						null,
						this.state.showError ? this.error() : null
					),
					this.state.regular ? _react2['default'].createElement(_loadersRegular_image_loading2['default'], null) : null,
					this.state.withComponent ? _react2['default'].createElement(_loadersImages_with_component2['default'], { showError: this.showError }) : null,
					this.state.css ? _react2['default'].createElement(_show_css2['default'], null) : null
				)
			);
		}
	}]);

	return App;
})(_react.Component);

exports['default'] = App;

_reactDom2['default'].render(_react2['default'].createElement(App, null), document.getElementById('app'));
module.exports = exports['default'];

},{"./loaders/images_with_component":3,"./loaders/regular_image_loading":4,"./loading_spinner":5,"./show_css":6,"react":undefined,"react-dom":undefined,"react-on-images-loaded":undefined}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var images = ["https://res.cloudinary.com/andoo/image/upload/v1486826817/image_ocxdso.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486826938/7c979fcfa51d2eccf1eaabd0d15884fb_babus1.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827398/c2f99629bbcbf1e2765f6c89dbf2c7e1_cnxkyu.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827479/5e05846cc8b34cd1759dfa11ed1b41fd_qkgtrr.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827690/04bf9ee4d854169ec7ed1a0fc77f6312_dhdsz7.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827906/e30f9c94bf2746c1fbd6057f39efff48_bq6e2t.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827975/9ac230696dfe6e930e5c2bc4c3eff4a7_zkyuty.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828301/6309af01a0817328b8fc580b0719db6c_knrb2c.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828379/082a1983a0d9881c1ab31575e5b73c77_qvbour.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828570/7600eb15ae9538d2ca6933c9e6428ca2_knyfdi.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828652/8a3fff5c8e8076863b1d0e62ed0b0721_tcyprw.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828855/6d308f612b23e22a92e187ddfdb05212_h6mmq7.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828916/e0a6c9b29d8d86ce178777f81a6372f4_ifkmn8.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829078/7f0a40d65430d29e1dbb0075c2855603_gcmyn5.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829391/4c7c0a013f8688c1a74e8a7d7a8ba49f_xnss8q.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829487/77b15f6344adae617e50e8ecb3cf6783_krgbbr.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829532/86bc99649b56f9f71530f0de29c234e8_r47mku.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829663/7d945f11d02e4bbe14602435c41992dc_pfpdml.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829705/903174c3aaa3c6a259b7035c54b5d9b5_ezsh6j.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829803/c22220fbb0624d5a82c98162e62aec51_pjjbxu.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486830287/301fa63c666d6b66e80e86600af1c846_yh7llo.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486830342/de4634681ca318d17ac0f706201d1767_fly1sn.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486830420/8d28ffe859509bcf7abc5a7dbe1e9003_b1ndjl.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486826817/image_ocxdso.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486826938/7c979fcfa51d2eccf1eaabd0d15884fb_babus1.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827398/c2f99629bbcbf1e2765f6c89dbf2c7e1_cnxkyu.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827479/5e05846cc8b34cd1759dfa11ed1b41fd_qkgtrr.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827690/04bf9ee4d854169ec7ed1a0fc77f6312_dhdsz7.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827906/e30f9c94bf2746c1fbd6057f39efff48_bq6e2t.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486827975/9ac230696dfe6e930e5c2bc4c3eff4a7_zkyuty.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828301/6309af01a0817328b8fc580b0719db6c_knrb2c.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828379/082a1983a0d9881c1ab31575e5b73c77_qvbour.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828570/7600eb15ae9538d2ca6933c9e6428ca2_knyfdi.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828652/8a3fff5c8e8076863b1d0e62ed0b0721_tcyprw.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828855/6d308f612b23e22a92e187ddfdb05212_h6mmq7.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486828916/e0a6c9b29d8d86ce178777f81a6372f4_ifkmn8.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829078/7f0a40d65430d29e1dbb0075c2855603_gcmyn5.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829391/4c7c0a013f8688c1a74e8a7d7a8ba49f_xnss8q.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829487/77b15f6344adae617e50e8ecb3cf6783_krgbbr.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829532/86bc99649b56f9f71530f0de29c234e8_r47mku.jpg", "https://res.cloudinary.com/andoo/image/upload/v1486829663/7d945f11d02e4bbe14602435c41992dc_pfpdml.jpg"];

exports["default"] = images;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
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

var _images2 = require('./images');

var _images3 = _interopRequireDefault(_images2);

var _reactOnImagesLoaded = require('react-on-images-loaded');

var _reactOnImagesLoaded2 = _interopRequireDefault(_reactOnImagesLoaded);

var _loading_spinner = require('../loading_spinner');

var _loading_spinner2 = _interopRequireDefault(_loading_spinner);

var ImagesWithComponent = (function (_Component) {
  _inherits(ImagesWithComponent, _Component);

  function ImagesWithComponent(props) {
    _classCallCheck(this, ImagesWithComponent);

    _get(Object.getPrototypeOf(ImagesWithComponent.prototype), 'constructor', this).call(this, props);
    this.state = {
      loaded: false
    };
  }

  _createClass(ImagesWithComponent, [{
    key: 'images',
    value: function images() {
      var imgs = _images3['default'].map(function (url, idx) {
        return _react2['default'].createElement(
          'div',
          { key: idx, className: 'image' },
          _react2['default'].createElement('img', { src: url + "?" + new Date().getTime(), className: 'image' })
        );
      });
      return _react2['default'].createElement(
        'div',
        { className: this.state.loaded ? 'hidden-false' : 'hidden-true' },
        imgs
      );
    }
  }, {
    key: 'onLoadedHandler',
    value: function onLoadedHandler() {
      this.setState({ loaded: true });
    }
  }, {
    key: 'handleTimeout',
    value: function handleTimeout() {
      this.props.showError();
      alert("hit timeout. this is the onTimeout function being run and is mounting normally now");
      this.setState({ loaded: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      return _react2['default'].createElement(
        _reactOnImagesLoaded2['default'],
        {
          onLoaded: function () {
            return _this.onLoadedHandler();
          },
          onTimeout: function () {
            return _this.handleTimeout();
          },
          delay: 100
        },
        this.state.loaded ? null : _react2['default'].createElement(_loading_spinner2['default'], null),
        this.images()
      );
    }
  }]);

  return ImagesWithComponent;
})(_react.Component);

exports['default'] = ImagesWithComponent;
module.exports = exports['default'];

},{"../loading_spinner":5,"./images":2,"react":undefined,"react-on-images-loaded":undefined}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _images = require('./images');

var _images2 = _interopRequireDefault(_images);

var RegularImageLoading = function RegularImageLoading(_) {
  var imgs = _images2['default'].map(function (url, idx) {
    return _react2['default'].createElement(
      'div',
      { key: idx, className: 'image' },
      _react2['default'].createElement('img', { src: url + "?" + new Date().getTime(), className: 'image' })
    );
  });

  return _react2['default'].createElement(
    'div',
    { className: 'image-container' },
    imgs
  );
};

exports['default'] = RegularImageLoading;
module.exports = exports['default'];

},{"./images":2,"react":undefined}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var LoadingSpinner = function LoadingSpinner(_) {
  return _react2["default"].createElement(
    "div",
    { className: "loading-spinner-container" },
    _react2["default"].createElement("div", { className: "loading-spinner" })
  );
};

exports["default"] = LoadingSpinner;
module.exports = exports["default"];

},{"react":undefined}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var ShowCss = function ShowCss(_) {
  return _react2['default'].createElement(
    'div',
    { className: 'css-container' },
    _react2['default'].createElement(
      'div',
      { className: 'css-subcontainer' },
      _react2['default'].createElement(
        'h2',
        { className: 'css-header' },
        'hidden to visible transition'
      ),
      _react2['default'].createElement(
        'pre',
        null,
        _react2['default'].createElement(
          'code',
          null,
          '.hidden, .hidden-true, .hidden-false {\n  animation-timing-function: cubic-bezier(0.1, 0.8, 0.1, 1);\n  transition: opacity 500ms ease-in-out;\n}\n\n.hidden-true {\n  opacity: 0;\n  height: 0px;\n  overflow: hidden;\n}\n\n.hidden-false {\n  opacity: 1;\n}'
        )
      ),
      _react2['default'].createElement(
        'h2',
        { className: 'css-header' },
        'loading spinner'
      ),
      _react2['default'].createElement(
        'pre',
        null,
        _react2['default'].createElement(
          'code',
          null,
          '.board-loader {\n  border: 6px solid #f3f3f3; /* Light grey */\n  border-top: 6px solid #3498db; /* Blue */\n  border-radius: 50%;\n  width: 80px;\n  height: 80px;\n  animation: spin 2s linear infinite;\n  position: relative;\n}\n\n@keyframes spin {\n  0% { transform: rotate(0deg); }\n  100% { transform: rotate(360deg); }\n}'
        )
      )
    )
  );
};

exports['default'] = ShowCss;
module.exports = exports['default'];

},{"react":undefined}]},{},[1]);
