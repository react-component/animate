webpackJsonp([1],{

/***/ 132:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(133);


/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rc_animate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_slow_less__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__assets_slow_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__assets_slow_less__);





/* eslint no-console:0, react/no-multi-comp:0 */







var Div = function Div(props) {
  var style = props.style,
      show = props.show,
      restProps = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_objectWithoutProperties___default()(props, ['style', 'show']);

  var newStyle = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, style, { display: show ? '' : 'none' });
  return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('div', __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_extends___default()({}, restProps, { style: newStyle }));
};

Div.propTypes = {
  style: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.object,
  show: __WEBPACK_IMPORTED_MODULE_7_prop_types___default.a.bool
};

var Demo = function (_Component) {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_inherits___default()(Demo, _Component);

  function Demo(props) {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    var _this = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_possibleConstructorReturn___default()(this, _Component.call(this, props));

    _this.state = {
      exclusive: false,
      enter: true
    };
    return _this;
  }

  Demo.prototype.toggle = function toggle(field) {
    var _setState;

    this.setState((_setState = {}, _setState[field] = !this.state[field], _setState));
  };

  Demo.prototype.render = function render() {
    var _this2 = this;

    var style = {
      width: '200px',
      height: '200px',
      backgroundColor: 'red'
    };
    return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
      'div',
      null,
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'label',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('input', {
          type: 'checkbox',
          onChange: function onChange() {
            _this2.toggle('enter');
          },
          checked: this.state.enter
        }),
        'show'
      ),
      '\xA0',
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'label',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('input', {
          type: 'checkbox',
          onChange: function onChange() {
            _this2.toggle('exclusive');
          },
          checked: this.state.exclusive
        }),
        'exclusive'
      ),
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('br', null),
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('br', null),
      __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_5_rc_animate__["a" /* default */],
        {
          component: '',
          exclusive: this.state.exclusive,
          showProp: 'show',
          transitionName: 'fade'
        },
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Div, { show: this.state.enter, style: style })
      )
    );
  };

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react__["Component"]);

__WEBPACK_IMPORTED_MODULE_8_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

/***/ }),

/***/ 48:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[132]);
//# sourceMappingURL=simple.js.map