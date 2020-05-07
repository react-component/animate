webpackJsonp([11],{

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(16);


/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_animate__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_classnames___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_classnames__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CSSMotion_less__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__CSSMotion_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__CSSMotion_less__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-console:0, react/no-multi-comp:0, react/prop-types: 0 */







window.motionRef = __WEBPACK_IMPORTED_MODULE_0_react___default.a.createRef();

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
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Demo, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          show = _state.show,
          motionLeaveImmediately = _state.motionLeaveImmediately,
          removeOnLeave = _state.removeOnLeave,
          hasMotionClassName = _state.hasMotionClassName;


      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onTrigger, checked: show }),
          ' ',
          'Show Component'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onTriggerClassName, checked: hasMotionClassName }),
          ' ',
          'hasMotionClassName'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'label',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('input', { type: 'checkbox', onChange: this.onRemoveOnLeave, checked: removeOnLeave }),
          ' ',
          'removeOnLeave',
          removeOnLeave ? '' : ' (use leavedClassName)'
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          { className: 'grid' },
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'With Transition Class'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_rc_animate__["a" /* CSSMotion */],
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
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { ref: ref, className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('demo-block', className), style: style });
              }
            )
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              'h2',
              null,
              'With Animation Class'
            ),
            __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_rc_animate__["a" /* CSSMotion */],
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
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('demo-block', className), style: style });
              }
            )
          )
        ),
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'div',
          null,
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'button',
            { onClick: this.onMotionLeaveImmediately },
            'motionLeaveImmediately'
          ),
          __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
            'div',
            null,
            motionLeaveImmediately && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
              __WEBPACK_IMPORTED_MODULE_2_rc_animate__["a" /* CSSMotion */],
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
                return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('div', { className: __WEBPACK_IMPORTED_MODULE_3_classnames___default()('demo-block', className), style: style });
              }
            )
          )
        )
      );
    }
  }]);

  return Demo;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Demo, null), document.getElementById('__react-content'));

// Remove for IE9 test
// const aaa = document.getElementsByClassName('navbar')[0];
// aaa.parentNode.removeChild(aaa);

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[15]);
//# sourceMappingURL=CSSMotion.js.map