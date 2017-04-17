webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(204);


/***/ }),

/***/ 198:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 204:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(198);
	
	var _rcAnimate = __webpack_require__(186);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(38);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(40);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint no-console:0, react/no-multi-comp:0 */
	
	var Box = function (_React$Component) {
	  _inherits(Box, _React$Component);
	
	  function Box() {
	    _classCallCheck(this, Box);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Box.prototype.render = function render() {
	    console.log('render', this.props.visible);
	    var style = {
	      display: this.props.visible ? 'block' : 'none',
	      marginTop: '20px',
	      width: '200px',
	      height: '200px',
	      backgroundColor: 'red'
	    };
	    return _react2.default.createElement('div', { style: style });
	  };
	
	  return Box;
	}(_react2.default.Component);
	
	Box.propTypes = {
	  visible: _propTypes2.default.bool
	};
	
	var Demo = function (_React$Component2) {
	  _inherits(Demo, _React$Component2);
	
	  function Demo() {
	    var _temp, _this2, _ret;
	
	    _classCallCheck(this, Demo);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
	      visible: true
	    }, _this2.onAppear = function (key) {
	      console.log('appear', key);
	    }, _this2.onEnter = function (key) {
	      console.log('enter', key);
	    }, _this2.onLeave = function (key) {
	      console.log('leave', key);
	    }, _this2.toggleAnimate = function () {
	      _this2.setState({
	        visible: !_this2.state.visible
	      });
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }
	
	  Demo.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.toggleAnimate },
	        'toggle'
	      ),
	      _react2.default.createElement(
	        _rcAnimate2.default,
	        {
	          component: '',
	          showProp: 'visible',
	          onAppear: this.onAppear,
	          onEnter: this.onEnter,
	          onLeave: this.onLeave,
	          transitionAppear: true,
	          transitionName: 'fade'
	        },
	        _react2.default.createElement(Box, { visible: this.state.visible })
	      )
	    );
	  };
	
	  return Demo;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=transitionAppear.js.map