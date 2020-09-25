webpackJsonp([8],{

/***/ 3:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);


/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_animate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_less__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_index_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-console:0, react/no-multi-comp:0, react/jsx-no-bind:0, react/prop-types: 0 */






var seed = 0;

var Alert = function (_React$Component) {
  _inherits(Alert, _React$Component);

  function Alert() {
    _classCallCheck(this, Alert);

    return _possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).apply(this, arguments));
  }

  _createClass(Alert, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var props = this.props;
      setTimeout(function () {
        props.onEnd();
      }, props.time);
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var style = {
        background: 'yellow',
        width: 600,
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto'
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: style },
        props.str
      );
    }
  }]);

  return Alert;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Alert.defaultProps = {
  onEnd: function onEnd() {},

  time: 2000,
  type: 'success'
};

var AlertGroup = function (_React$Component2) {
  _inherits(AlertGroup, _React$Component2);

  function AlertGroup() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, AlertGroup);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = AlertGroup.__proto__ || Object.getPrototypeOf(AlertGroup)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
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
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(AlertGroup, [{
    key: 'render',
    value: function render() {
      var alerts = this.state.alerts;
      var self = this;
      var children = alerts.map(function (a) {
        if (!a.key) {
          seed++;
          a.key = String(seed);
        }
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(Alert, _extends({}, a, { onEnd: self.onEnd.bind(self, a.key) }));
      });
      var style = {
        position: 'fixed',
        width: '100%',
        top: 50,
        zIndex: 9999
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        { style: style },
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_rc_animate__["c" /* default */],
          { transitionName: 'fade', component: 'div' },
          children
        )
      );
    }
  }]);

  return AlertGroup;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

var alertGroup = void 0;

function alert(str, time, type, callback) {
  if (!alertGroup) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    // eslint-disable-next-line react/no-render-return-value
    alertGroup = __WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(AlertGroup, null), div);
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

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h2',
    null,
    'notification'
  ),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'button',
    { onClick: onClick },
    'show notification'
  )
), document.getElementById('__react-content'));

/***/ })

},[47]);
//# sourceMappingURL=alert.js.map