webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(206);


/***/ }),

/***/ 200:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(200);
	
	var _rcAnimate = __webpack_require__(186);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(38);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactDom = __webpack_require__(40);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Box = _react2.default.createClass({
	  displayName: 'Box',
	
	  propTypes: {
	    visible: _propTypes2.default.bool
	  },
	  render: function render() {
	    console.log('render', this.props.visible);
	    var style = {
	      display: this.props.visible ? 'block' : 'none',
	      marginTop: '20px',
	      width: '200px',
	      height: '200px',
	      backgroundColor: 'red'
	    };
	    return _react2.default.createElement('div', { style: style });
	  }
	}); /* eslint no-console:0, react/no-multi-comp:0 */
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    return {
	      visible: 1
	    };
	  },
	  onAppear: function onAppear(key) {
	    console.log('appear', key);
	  },
	  onEnter: function onEnter(key) {
	    console.log('enter', key);
	  },
	  onLeave: function onLeave(key) {
	    console.log('leave', key);
	  },
	  toggleAnimate: function toggleAnimate() {
	    this.setState({
	      visible: !this.state.visible
	    });
	  },
	  render: function render() {
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
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=transitionAppear.js.map