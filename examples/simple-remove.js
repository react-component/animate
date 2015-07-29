webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(23);


/***/ },

/***/ 2:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(3);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(5)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/yiminghe/code/react-components/animate/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/animate/examples/assets/index.css", function() {
			var newContent = require("!!/Users/yiminghe/code/react-components/animate/node_modules/rc-tools/node_modules/css-loader/index.js!/Users/yiminghe/code/react-components/animate/examples/assets/index.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	exports.push([module.id, ".fade-enter {\n  opacity: 0;\n  -webkit-animation-duration: .5s;\n          animation-duration: .5s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  display: block !important;\n  visibility: visible !important;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.fade-leave {\n  -webkit-animation-duration: .5s;\n          animation-duration: .5s;\n  -webkit-animation-fill-mode: both;\n          animation-fill-mode: both;\n  display: block !important;\n  visibility: visible !important;\n  -webkit-animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n          animation-timing-function: cubic-bezier(0.55, 0, 0.55, 0.2);\n  -webkit-animation-play-state: paused;\n          animation-play-state: paused;\n}\n.fade-enter.fade-enter-active {\n  -webkit-animation-name: fadeIn;\n          animation-name: fadeIn;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n.fade-leave.fade-leave-active {\n  -webkit-animation-name: fadeOut;\n          animation-name: fadeOut;\n  -webkit-animation-play-state: running;\n          animation-play-state: running;\n}\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n@-webkit-keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n@keyframes fadeOut {\n  0% {\n    opacity: 1;\n  }\n  100% {\n    opacity: 0;\n  }\n}\n", ""]);

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	// use jsx to render html, do not modify simple.html
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(2);
	
	var _rcAnimate = __webpack_require__(7);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var transitionEnter = true;
	var remove = false;
	
	var Demo = (function (_Component) {
	  _inherits(Demo, _Component);
	
	  function Demo(props) {
	    _classCallCheck(this, Demo);
	
	    _get(Object.getPrototypeOf(Demo.prototype), 'constructor', this).call(this, props);
	    this.state = {
	      enter: true
	    };
	    this.toggleAnimate = this.toggleAnimate.bind(this);
	  }
	
	  _createClass(Demo, [{
	    key: 'toggleAnimate',
	    value: function toggleAnimate() {
	      this.setState({
	        enter: !this.state.enter
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement(
	        'div',
	        null,
	        _react2['default'].createElement(
	          'button',
	          { onClick: this.toggleAnimate },
	          'toggle'
	        ),
	        _react2['default'].createElement(
	          _rcAnimate2['default'],
	          {
	            component: "",
	            transitionName: "fade" },
	          this.state.enter ? _react2['default'].createElement('div', { key: "1", style: {
	              display: this.state.enter ? 'block' : 'none',
	              marginTop: '20px',
	              width: '200px',
	              height: '200px',
	              backgroundColor: 'red'
	            } }) : null
	        )
	      );
	    }
	  }]);
	
	  return Demo;
	})(_react.Component);
	
	_react2['default'].render(_react2['default'].createElement(Demo, null), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple-remove.js.map