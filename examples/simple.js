webpackJsonp([2],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(197);


/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint no-console:0, react/no-multi-comp:0 */
	
	__webpack_require__(198);
	
	var _rcAnimate = __webpack_require__(186);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(38);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(40);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _objectAssign = __webpack_require__(6);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Div = function Div(props) {
	  var style = props.style,
	      show = props.show;
	
	  var newStyle = (0, _objectAssign2.default)({}, style, {
	    display: show ? '' : 'none'
	  });
	  return _react2.default.createElement('div', _extends({}, props, { style: newStyle }));
	};
	
	Div.propTypes = {
	  style: _propTypes2.default.object,
	  show: _propTypes2.default.bool
	};
	
	var Demo = function (_Component) {
	  _inherits(Demo, _Component);
	
	  function Demo(props) {
	    _classCallCheck(this, Demo);
	
	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));
	
	    _this.state = {
	      exclusive: false,
	      enter: true
	    };
	    return _this;
	  }
	
	  Demo.prototype.toggle = function toggle(field) {
	    this.setState(_defineProperty({}, field, !this.state[field]));
	  };
	
	  Demo.prototype.render = function render() {
	    var style = {
	      width: '200px',
	      height: '200px',
	      backgroundColor: 'red'
	    };
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'label',
	        null,
	        _react2.default.createElement('input', {
	          type: 'checkbox',
	          onChange: this.toggle.bind(this, 'enter'),
	          checked: this.state.enter
	        }),
	        'show'
	      ),
	      '\xA0',
	      _react2.default.createElement(
	        'label',
	        null,
	        _react2.default.createElement('input', {
	          type: 'checkbox',
	          onChange: this.toggle.bind(this, 'exclusive'),
	          checked: this.state.exclusive
	        }),
	        'exclusive'
	      ),
	      _react2.default.createElement('br', null),
	      _react2.default.createElement('br', null),
	      _react2.default.createElement(
	        _rcAnimate2.default,
	        {
	          component: '',
	          exclusive: this.state.exclusive,
	          showProp: 'show',
	          transitionName: 'fade'
	        },
	        _react2.default.createElement(Div, { show: this.state.enter, style: style })
	      )
	    );
	  };
	
	  return Demo;
	}(_react.Component);
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }),

/***/ 198:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=simple.js.map