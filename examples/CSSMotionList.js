webpackJsonp([9],{

/***/ 134:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(135);


/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rc_animate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__CSSMotionList_less__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__CSSMotionList_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__CSSMotionList_less__);






/* eslint no-console:0, react/no-multi-comp:0 */







var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      count: 1,
      checkedMap: {},
      keyList: []
    }, _this.onCountChange = function (_ref2) {
      var value = _ref2.target.value;

      _this.setState({ count: Number(value) });
    }, _this.onFlushMotion = function () {
      var _this$state = _this.state,
          count = _this$state.count,
          checkedMap = _this$state.checkedMap;

      var keyList = [];
      for (var i = 0; i < count; i += 1) {
        if (checkedMap[i] !== false) {
          keyList.push(i);
        }
      }
      _this.setState({ keyList: keyList });
    }, _this.onCollapse = function () {
      return { width: 0, margin: '0 -5px 0 0' };
    }, _temp), __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.onFlushMotion();
    }

    // Motion

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          count = _state.count,
          checkedMap = _state.checkedMap,
          keyList = _state.keyList;


      return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'label',
            null,
            'node count',
            __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('input', { type: 'number', value: count, onChange: this.onCountChange })
          ),
          __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
            'button',
            { onClick: this.onFlushMotion },
            'Flush Motion'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          'div',
          null,
          new Array(count).fill().map(function (_, key) {
            var checked = checkedMap[key] !== false;
            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'label',
              { key: key },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement('input', {
                type: 'checkbox',
                checked: checked,
                onChange: function onChange() {
                  _this2.setState({
                    checkedMap: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_extends___default()({}, checkedMap, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, key, !checked))
                  });
                }
              }),
              key
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_8_rc_animate__["b" /* CSSMotionList */],
          {
            keys: keyList,
            motionName: 'transition',
            onAppearStart: this.onCollapse,
            onEnterStart: this.onCollapse,
            onLeaveActive: this.onCollapse,
            onEnterEnd: this.skipColorTransition,
            onLeaveEnd: this.skipColorTransition
          },
          function (_ref3) {
            var key = _ref3.key,
                className = _ref3.className,
                style = _ref3.style;

            return __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
              'div',
              {
                className: __WEBPACK_IMPORTED_MODULE_9_classnames___default()('demo-block', className),
                style: style
              },
              __WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(
                'span',
                null,
                key
              )
            );
          }
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_6_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_7_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_6_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[134]);
//# sourceMappingURL=CSSMotionList.js.map