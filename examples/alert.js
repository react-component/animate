webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console:0, react/no-multi-comp:0 */
	
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
	
	var seed = 0;
	
	var Alert = _react2.default.createClass({
	  displayName: 'Alert',
	
	  propTypes: {
	    time: _propTypes2.default.number,
	    type: _propTypes2.default.string,
	    str: _propTypes2.default.string,
	    onEnd: _propTypes2.default.func
	  },
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      onEnd: function onEnd() {},
	
	      time: 2000,
	      type: 'success'
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    var props = this.props;
	    setTimeout(function () {
	      props.onEnd();
	    }, props.time);
	  },
	  render: function render() {
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
	  }
	});
	
	var AlertGroup = _react2.default.createClass({
	  displayName: 'AlertGroup',
	  getInitialState: function getInitialState() {
	    return {
	      alerts: []
	    };
	  },
	  onEnd: function onEnd(key) {
	    var alerts = this.state.alerts;
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
	      this.setState({
	        alerts: ret
	      }, function () {
	        if (target.callback) {
	          target.callback();
	        }
	      });
	    }
	  },
	  addAlert: function addAlert(a) {
	    this.setState({
	      alerts: this.state.alerts.concat(a)
	    });
	  },
	  render: function render() {
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
	  }
	});
	
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);
//# sourceMappingURL=alert.js.map