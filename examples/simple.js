webpackJsonp([5],{

/***/ 145:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(146);


/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_extends__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_animate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prop_types__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_slow_less__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__assets_slow_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__assets_slow_less__);







/* eslint no-console:0, react/no-multi-comp:0, react/jsx-no-bind:0 */








var Div = function Div(props) {
  var style = props.style,
      show = props.show,
      restProps = __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_objectWithoutProperties___default()(props, ['style', 'show']);

  var newStyle = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_extends___default()({}, style, { display: show ? '' : 'none' });
  return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('div', __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_extends___default()({}, restProps, { style: newStyle }));
};

Div.propTypes = {
  style: __WEBPACK_IMPORTED_MODULE_9_prop_types___default.a.object,
  show: __WEBPACK_IMPORTED_MODULE_9_prop_types___default.a.bool
};

var Demo = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(Demo, _Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Demo.__proto__ || Object.getPrototypeOf(Demo)).call(this, props));

    _this.state = {
      exclusive: false,
      enter: true
    };
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'toggle',
    value: function toggle(field) {
      this.setState(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, field, !this.state[field]));
    }
  }, {
    key: 'render',
    value: function render() {
      var style = {
        width: '200px',
        height: '200px',
        backgroundColor: 'red'
      };
      return __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('input', {
            type: 'checkbox',
            onChange: this.toggle.bind(this, 'enter'),
            checked: this.state.enter
          }),
          'show'
        ),
        '\xA0',
        __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('input', {
            type: 'checkbox',
            onChange: this.toggle.bind(this, 'exclusive'),
            checked: this.state.exclusive
          }),
          'exclusive'
        ),
        __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement('br', null),
        __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_animate__["c" /* default */],
          {
            component: '',
            exclusive: this.state.exclusive,
            showProp: 'show',
            transitionName: 'fade'
          },
          __WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(Div, { show: this.state.enter, style: style })
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_8_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_10_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_8_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[145]);
//# sourceMappingURL=simple.js.map