webpackJsonp([8],{

/***/ 1:
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_animate__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_index_less__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__assets_index_less__);




/* eslint no-console:0, react/no-multi-comp:0 */







var seed = 0;

var Alert = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Alert, _React$Component);

  function Alert() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Alert);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component.apply(this, arguments));
  }

  Alert.prototype.componentDidMount = function componentDidMount() {
    var props = this.props;
    setTimeout(function () {
      props.onEnd();
    }, props.time);
  };

  Alert.prototype.render = function render() {
    var props = this.props;
    var style = {
      background: 'yellow',
      width: 600,
      padding: 20,
      marginLeft: 'auto',
      marginRight: 'auto'
    };
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      { style: style },
      props.str
    );
  };

  return Alert;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Alert.propTypes = {
  time: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.number,
  type: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  str: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.string,
  onEnd: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};
Alert.defaultProps = {
  onEnd: function onEnd() {},

  time: 2000,
  type: 'success'
};

var AlertGroup = function (_React$Component2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(AlertGroup, _React$Component2);

  function AlertGroup() {
    var _temp, _this2, _ret;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AlertGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
      alerts: []
    }, _this2.onEnd = function (key) {
      var alerts = _this2.state.alerts;
      var ret = [];
      var target = void 0;
      alerts.forEach(function (a) {
        if (a.key === key) {
          target = a;
        } else {
          ret.push(a);
        }
      });
      if (target) {
        _this2.setState({
          alerts: ret
        }, function () {
          if (target.callback) {
            target.callback();
          }
        });
      }
    }, _this2.addAlert = function (a) {
      _this2.setState({
        alerts: _this2.state.alerts.concat(a)
      });
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this2, _ret);
  }

  AlertGroup.prototype.render = function render() {
    var _this3 = this;

    var alerts = this.state.alerts;
    var children = alerts.map(function (a) {
      if (!a.key) {
        seed++;
        a.key = String(seed);
      }
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(Alert, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_extends___default()({}, a, { onEnd: function onEnd() {
          _this3.onEnd(a.key);
        } }));
    });
    var style = {
      position: 'fixed',
      width: '100%',
      top: 50,
      zIndex: 9999
    };
    return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
      'div',
      { style: style },
      __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        __WEBPACK_IMPORTED_MODULE_7_rc_animate__["a" /* default */],
        { transitionName: 'fade', component: 'div' },
        children
      )
    );
  };

  return AlertGroup;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

var alertGroup = void 0;

function alert(str, time, type, callback) {
  if (!alertGroup) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    alertGroup = __WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(AlertGroup, null), div);
  }
  alertGroup.addAlert({
    str: str,
    time: time,
    type: type,
    callback: callback
  });
}

function alertFn(i) {
  function m() {
    alert('' + i);
  }

  return m;
}

function onClick() {
  for (var i = 0; i < 4; i++) {
    setTimeout(alertFn(i), 1000 * i);
  }
}

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    'h2',
    null,
    'notification'
  ),
  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    'button',
    { onClick: onClick },
    'show notification'
  )
), document.getElementById('__react-content'));

/***/ })

},[68]);
//# sourceMappingURL=alert.js.map