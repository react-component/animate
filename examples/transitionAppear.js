webpackJsonp([3],{

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(62);


/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rc_animate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_slow_less__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_slow_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_slow_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-console:0, react/no-multi-comp:0, react/prop-types: 0 */







var Box = function Box(props) {
  console.log('render', props.visible);
  var style = {
    display: props.visible ? 'block' : 'none',
    marginTop: '20px',
    width: '200px',
    height: '200px',
    backgroundColor: 'red'
  };
  return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement('div', { style: style });
};

var Demo = function (_React$Component) {
  _inherits(Demo, _React$Component);

  function Demo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      visible: true
    }, _this.onAppear = function (key) {
      console.log('appear', key);
    }, _this.onEnter = function (key) {
      console.log('enter', key);
    }, _this.onLeave = function (key) {
      console.log('leave', key);
    }, _this.toggleAnimate = function () {
      _this.setState({
        visible: !_this.state.visible
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      return __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          'button',
          { onClick: this.toggleAnimate },
          'toggle'
        ),
        __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_0_rc_animate__["c" /* default */],
          {
            component: '',
            showProp: 'visible',
            onAppear: this.onAppear,
            onEnter: this.onEnter,
            onLeave: this.onLeave,
            transitionAppear: true,
            transitionName: 'fade'
          },
          __WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Box, { visible: this.state.visible })
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_1_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_2_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_1_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 9:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[61]);
//# sourceMappingURL=transitionAppear.js.map