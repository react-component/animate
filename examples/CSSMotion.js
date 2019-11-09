webpackJsonp([10],{

/***/ 135:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(69);


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rc_animate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CSSMotion_less__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CSSMotion_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__CSSMotion_less__);




/* eslint no-console:0, react/no-multi-comp:0 */


// import PropTypes from 'prop-types';





window.motionRef = __WEBPACK_IMPORTED_MODULE_4_react___default.a.createRef();

var Demo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Demo, _React$Component);

  function Demo() {
    var _ref;

    var _temp, _this, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Demo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = Demo.__proto__ || Object.getPrototypeOf(Demo)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      show: true,
      motionLeaveImmediately: false,
      removeOnLeave: true,
      hasMotionClassName: true
    }, _this.onTrigger = function () {
      _this.setState({
        show: !_this.state.show
      });
    }, _this.onRemoveOnLeave = function () {
      _this.setState({
        removeOnLeave: !_this.state.removeOnLeave
      });
    }, _this.onTriggerClassName = function () {
      _this.setState({
        hasMotionClassName: !_this.state.hasMotionClassName
      });
    }, _this.onCollapse = function () {
      return { height: 0 };
    }, _this.onMotionLeaveImmediately = function () {
      _this.setState({
        motionLeaveImmediately: !_this.state.motionLeaveImmediately
      });
    }, _this.skipColorTransition = function (_, event) {
      // CSSMotion support multiple transition.
      // You can return false to prevent motion end when fast transition finished.
      if (event.propertyName === 'background-color') {
        return false;
      }
      return true;
    }, _this.styleGreen = function () {
      return {
        background: 'green'
      };
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Demo, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          show = _state.show,
          motionLeaveImmediately = _state.motionLeaveImmediately,
          removeOnLeave = _state.removeOnLeave,
          hasMotionClassName = _state.hasMotionClassName;


      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onTrigger, checked: show }),
          ' ',
          'Show Component'
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onTriggerClassName, checked: hasMotionClassName }),
          ' ',
          'hasMotionClassName'
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onRemoveOnLeave, checked: removeOnLeave }),
          ' ',
          'removeOnLeave',
          removeOnLeave ? '' : ' (use leavedClassName)'
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          { className: 'grid' },
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              'With Transition Class'
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6_rc_animate__["a" /* CSSMotion */],
              {
                visible: show,
                motionName: hasMotionClassName ? 'transition' : null,
                removeOnLeave: removeOnLeave,
                leavedClassName: 'hidden',
                onAppearStart: this.onCollapse,
                onEnterStart: this.onCollapse,
                onLeaveActive: this.onCollapse,

                onEnterEnd: this.skipColorTransition,
                onLeaveEnd: this.skipColorTransition,

                ref: window.motionRef
              },
              function (_ref2, ref) {
                var style = _ref2.style,
                    className = _ref2.className;
                return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div', { ref: ref, className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()('demo-block', className), style: style });
              }
            )
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              'h2',
              null,
              'With Animation Class'
            ),
            __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6_rc_animate__["a" /* CSSMotion */],
              {
                visible: show,
                motionName: hasMotionClassName ? 'animation' : null,
                removeOnLeave: removeOnLeave,
                leavedClassName: 'hidden',
                onLeaveActive: this.styleGreen
              },
              function (_ref3) {
                var style = _ref3.style,
                    className = _ref3.className;
                return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()('demo-block', className), style: style });
              }
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'button',
            { onClick: this.onMotionLeaveImmediately },
            'motionLeaveImmediately'
          ),
          __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
            'div',
            null,
            motionLeaveImmediately && __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_6_rc_animate__["a" /* CSSMotion */],
              {
                visible: false,
                motionName: hasMotionClassName ? 'transition' : null,
                removeOnLeave: removeOnLeave,
                leavedClassName: 'hidden',
                onLeaveActive: this.onCollapse,
                motionLeaveImmediately: true,

                onLeaveEnd: this.skipColorTransition
              },
              function (_ref4) {
                var style = _ref4.style,
                    className = _ref4.className;
                return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_7_classnames___default()('demo-block', className), style: style });
              }
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_5_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

// Remove for IE9 test
// const aaa = document.getElementsByClassName('navbar')[0];
// aaa.parentNode.removeChild(aaa);

/***/ })

},[68]);
//# sourceMappingURL=CSSMotion.js.map