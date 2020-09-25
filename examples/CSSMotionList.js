webpackJsonp([10],{

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(42);


/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_animate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CSSMotionList_less__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CSSMotionList_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__CSSMotionList_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-console:0, react/no-multi-comp:0 */







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

      keyList = keyList.map(function (key) {
        if (key === 3) {
          return { key: key, background: 'orange' };
        }
        return key;
      });

      _this.setState({ keyList: keyList });
    }, _this.onCollapse = function () {
      return { width: 0, margin: '0 -5px 0 0' };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Demo, [{
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


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        'key 3 is a different component with others.',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'label',
            null,
            'node count',
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'number', value: count, onChange: this.onCountChange })
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { onClick: this.onFlushMotion },
            'Flush Motion'
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          new Array(count).fill().map(function (_, key) {
            var checked = checkedMap[key] !== false;
            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'label',
              { key: key },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', {
                type: 'checkbox',
                checked: checked,
                onChange: function onChange() {
                  _this2.setState({
                    checkedMap: _extends({}, checkedMap, _defineProperty({}, key, !checked))
                  });
                }
              }),
              key
            );
          })
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_rc_animate__["b" /* CSSMotionList */],
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
                background = _ref3.background,
                className = _ref3.className,
                style = _ref3.style;

            return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'div',
              {
                className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('demo-block', className),
                style: _extends({}, style, {
                  background: background
                })
              },
              __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
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
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[41]);
//# sourceMappingURL=CSSMotionList.js.map