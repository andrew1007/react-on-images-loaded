"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var prop_types_1 = __importDefault(require("prop-types"));
var OnImagesLoaded = /** @class */ (function (_super) {
    __extends(OnImagesLoaded, _super);
    function OnImagesLoaded(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            loaded: false,
            loadCounter: 0,
            imageCount: 0,
            timedOut: false
        };
        _this._onLoad = _this._onLoad.bind(_this);
        _this._delay = 0;
        _this._timeout = 0;
        _this.mounted = false;
        _this._imgs = [];
        _this.imageLoad = null;
        return _this;
    }
    OnImagesLoaded.prototype.timingSetup = function () {
        var _a = this.props, onWillMount = _a.onWillMount, delay = _a.delay, timeout = _a.timeout;
        onWillMount === null || onWillMount === void 0 ? void 0 : onWillMount();
        this._delay = delay !== null && delay !== void 0 ? delay : 0;
        this._timeout = Math.max(timeout !== null && timeout !== void 0 ? timeout : 0, this._delay);
    };
    OnImagesLoaded.prototype.componentWillUnmount = function () {
        this.mounted = false;
        this._imgs.length > 0 ? this._removeImageListeners() : null;
    };
    OnImagesLoaded.prototype.componentDidMount = function () {
        var _a, _b;
        var _c = this.props, onLoaded = _c.onLoaded, onTimeout = _c.onTimeout, onDidMount = _c.onDidMount;
        this.timingSetup();
        this.mounted = true;
        this._imgs = Array.from((_b = (_a = this.imageLoad) === null || _a === void 0 ? void 0 : _a.getElementsByTagName('img')) !== null && _b !== void 0 ? _b : []);
        if (this._imgs.length === 0) {
            if (onLoaded) {
                onLoaded();
            }
            else if (onTimeout) {
                onTimeout();
            }
        }
        else {
            onDidMount ? onDidMount() : null;
            this._addImageListeners();
            this._setOnTimeoutEvent();
        }
    };
    OnImagesLoaded.prototype._addImageListeners = function () {
        var _this = this;
        this.setState({ imageCount: this._imgs.length }, function () {
            for (var i = 0; i < _this._imgs.length; i++) {
                _this._imgs[i].addEventListener('load', _this._onLoad);
            }
        });
    };
    OnImagesLoaded.prototype._removeImageListeners = function () {
        for (var i = 0; i < this._imgs.length; i++) {
            this._imgs[i].removeEventListener('load', this._onLoad);
        }
    };
    OnImagesLoaded.prototype._setOnTimeoutEvent = function () {
        var _this = this;
        setTimeout(function () {
            _this._timedOut ? _this._runTimeout() : null;
        }, this._timeout);
    };
    OnImagesLoaded.prototype._runTimeout = function () {
        if (this.mounted) {
            var _a = this.props, onTimeout_1 = _a.onTimeout, onLoaded_1 = _a.onLoaded;
            this.setState({ loaded: true }, function () {
                if (onTimeout_1) {
                    onTimeout_1();
                }
                else if (onLoaded_1) {
                    onLoaded_1();
                }
            });
        }
    };
    OnImagesLoaded.prototype._onLoad = function () {
        var _this = this;
        if (this.mounted) {
            this.setState({ loadCounter: this.state.loadCounter + 1 }, function () {
                setTimeout(function () {
                    _this._fullyLoaded ? _this._runOnLoadFunction() : null;
                }, _this._delay);
            });
        }
    };
    Object.defineProperty(OnImagesLoaded.prototype, "_fullyLoaded", {
        get: function () {
            var _a = this.state, loadCounter = _a.loadCounter, imageCount = _a.imageCount, loaded = _a.loaded;
            return this.mounted && (loadCounter >= imageCount) && !loaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnImagesLoaded.prototype, "_timedOut", {
        get: function () {
            return this.mounted && !this.state.loaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OnImagesLoaded.prototype, "_definedClassName", {
        get: function () {
            var _a = this.props, classNameOnLoaded = _a.classNameOnLoaded, classNameOnMount = _a.classNameOnMount, className = _a.className;
            return !!(classNameOnLoaded || classNameOnMount || className);
        },
        enumerable: false,
        configurable: true
    });
    OnImagesLoaded.prototype._runOnLoadFunction = function () {
        if (this.mounted) {
            var onLoaded_2 = this.props.onLoaded;
            this.setState({ loaded: true, timedOut: false }, function () {
                onLoaded_2 ? onLoaded_2() : null;
            });
        }
    };
    OnImagesLoaded.prototype._depreciatedClassNameHandler = function () {
        var _a = this.props, className = _a.className, classNameOnLoaded = _a.classNameOnLoaded, classNameOnMount = _a.classNameOnMount;
        if (className) {
            return className;
        }
        else if (!this.state.loaded && classNameOnMount) {
            return classNameOnMount;
        }
        else if (classNameOnLoaded) {
            return classNameOnLoaded;
        }
        return '';
    };
    OnImagesLoaded.prototype.render = function () {
        var _this = this;
        if (this.imageLoad && this._definedClassName) {
            this.imageLoad.className = this._depreciatedClassNameHandler();
        }
        return (react_1.default.createElement("div", null,
            this.state.loaded ? null : this.props.placeholder,
            react_1.default.createElement("div", { ref: function (ctx) { _this.imageLoad = ctx; } }, this.props.children)));
    };
    OnImagesLoaded.propTypes = {
        onTimeout: prop_types_1.default.func,
        onLoaded: prop_types_1.default.func.isRequired,
        delay: prop_types_1.default.number,
        // depreciated 
        onDidMount: prop_types_1.default.func,
        onWillMount: prop_types_1.default.func,
        classNameOnLoaded: prop_types_1.default.string,
        classNameOnMount: prop_types_1.default.string,
        className: prop_types_1.default.string,
    };
    return OnImagesLoaded;
}(react_1.Component));
exports.default = OnImagesLoaded;
