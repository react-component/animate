webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(38);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(40);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcAnimate = __webpack_require__(186);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint no-console:0, react/no-multi-comp:0 */
	
	var seed = 0;
	
	var Alert = function (_React$Component) {
	  _inherits(Alert, _React$Component);
	
	  function Alert() {
	    _classCallCheck(this, Alert);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
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
	    return _react2.default.createElement(
	      'div',
	      { style: style },
	      props.str
	    );
	  };
	
	  return Alert;
	}(_react2.default.Component);
	
	Alert.propTypes = {
	  time: _propTypes2.default.number,
	  type: _propTypes2.default.string,
	  str: _propTypes2.default.string,
	  onEnd: _propTypes2.default.func
	};
	Alert.defaultProps = {
	  onEnd: function onEnd() {},
	
	  time: 2000,
	  type: 'success'
	};
	
	var AlertGroup = function (_React$Component2) {
	  _inherits(AlertGroup, _React$Component2);
	
	  function AlertGroup() {
	    var _temp, _this2, _ret;
	
	    _classCallCheck(this, AlertGroup);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
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
	
	  AlertGroup.prototype.render = function render() {
	    var alerts = this.state.alerts;
	    var self = this;
	    var children = alerts.map(function (a) {
	      if (!a.key) {
	        seed++;
	        a.key = String(seed);
	      }
	      return _react2.default.createElement(Alert, _extends({}, a, { onEnd: self.onEnd.bind(self, a.key) }));
	    });
	    var style = {
	      position: 'fixed',
	      width: '100%',
	      top: 50,
	      zIndex: 9999
	    };
	    return _react2.default.createElement(
	      'div',
	      { style: style },
	      _react2.default.createElement(
	        _rcAnimate2.default,
	        { transitionName: 'fade', component: 'div' },
	        children
	      )
	    );
	  };
	
	  return AlertGroup;
	}(_react2.default.Component);
	
	var alertGroup = void 0;
	
	function alert(str, time, type, callback) {
	  if (!alertGroup) {
	    var div = document.createElement('div');
	    document.body.appendChild(div);
	    alertGroup = _reactDom2.default.render(_react2.default.createElement(AlertGroup, null), div);
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
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(
	    'h2',
	    null,
	    'notification'
	  ),
	  _react2.default.createElement(
	    'button',
	    { onClick: onClick },
	    'show notification'
	  )
	), document.getElementById('__react-content'));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })
]);
//# sourceMappingURL=alert.js.map