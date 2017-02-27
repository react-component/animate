webpackJsonp([8],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(199);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(2);
	
	var _rcAnimate = __webpack_require__(180);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(34);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* eslint no-console:0, react/no-multi-comp:0 */
	
	var Demo = _react2.default.createClass({
	  displayName: 'Demo',
	  getInitialState: function getInitialState() {
	    return {
	      enter: true
	    };
	  },
	  onEvent: function onEvent(e) {
	    console.log(e);
	  },
	  toggleAnimate: function toggleAnimate() {
	    this.setState({
	      enter: !this.state.enter
	    });
	  },
	  render: function render() {
	    var text = this.state.enter ? 'ON' : 'OFF';
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        _rcAnimate2.default,
	        {
	          transitionLeave: false,
	          transitionName: 'fade'
	        },
	        _react2.default.createElement(
	          'button',
	          { key: text, onClick: this.toggleAnimate },
	          text
	        )
	      )
	    );
	  }
	});
	
	_reactDom2.default.render(_react2.default.createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=transitionLeave.js.map