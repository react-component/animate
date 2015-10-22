webpackJsonp([8],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(179);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _rcAnimate = __webpack_require__(160);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(159);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var transitionEnter = true;
	var remove = false;
	
	var Demo = _react2['default'].createClass({
	  displayName: 'Demo',
	
	  getInitialState: function getInitialState() {
	    return {
	      enter: true
	    };
	  },
	
	  toggleAnimate: function toggleAnimate() {
	    this.setState({
	      enter: !this.state.enter
	    });
	  },
	
	  onEvent: function onEvent(e) {
	    console.log(e);
	  },
	
	  render: function render() {
	
	    var text = this.state.enter ? "ON" : "OFF";
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        _rcAnimate2['default'],
	        { transitionLeave: false,
	          transitionName: 'fade' },
	        _react2['default'].createElement(
	          'button',
	          { key: text, onClick: this.toggleAnimate },
	          text
	        )
	      )
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=transitionLeave.js.map