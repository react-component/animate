webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(202);


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 202:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
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
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); } /* eslint no-console:0, react/no-multi-comp:0, no-alert:0 */
	
	var Todo = function (_React$Component) {
	  _inherits(Todo, _React$Component);
	
	  function Todo() {
	    _classCallCheck(this, Todo);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Todo.prototype.componentWillUnmount = function componentWillUnmount() {
	    console.log('componentWillUnmount');
	    console.log(this.props.children);
	    this.props.end();
	  };
	
	  Todo.prototype.render = function render() {
	    var props = this.props;
	    var style = {
	      width: 100,
	      border: '1px solid red',
	      padding: 10,
	      margin: 10
	    };
	    return _react2.default.createElement(
	      'div',
	      { onClick: this.props.onClick, style: style },
	      props.children
	    );
	  };
	
	  return Todo;
	}(_react2.default.Component);
	
	Todo.propTypes = {
	  children: _propTypes2.default.any,
	  end: _propTypes2.default.func,
	  onClick: _propTypes2.default.func
	};
	Todo.defaultProps = {
	  end: function end() {}
	};
	
	var TodoList = function (_React$Component2) {
	  _inherits(TodoList, _React$Component2);
	
	  function TodoList() {
	    var _temp, _this2, _ret;
	
	    _classCallCheck(this, TodoList);
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, _React$Component2.call.apply(_React$Component2, [this].concat(args))), _this2), _this2.state = {
	      items: ['hello', 'world', 'click', 'me']
	    }, _this2.handleAdd = function () {
	      var items = _this2.state.items.concat([prompt('Enter some text')]);
	      _this2.setState({ items: items });
	    }, _this2.handleRemove = function (i) {
	      var items = _this2.state.items.concat();
	      items.splice(i, 1);
	      _this2.setState({ items: items });
	    }, _temp), _possibleConstructorReturn(_this2, _ret);
	  }
	
	  TodoList.prototype.render = function render() {
	    var _this3 = this;
	
	    var items = this.state.items.map(function (item, i) {
	      return _react2.default.createElement(
	        Todo,
	        { key: item, onClick: _this3.handleRemove.bind(_this3, i) },
	        item
	      );
	    });
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'button',
	        { onClick: this.handleAdd },
	        'Add Item'
	      ),
	      _react2.default.createElement(
	        _rcAnimate2.default,
	        { transitionName: 'fade' },
	        items
	      )
	    );
	  };
	
	  return TodoList;
	}(_react2.default.Component);
	
	_reactDom2.default.render(_react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(
	    'h2',
	    null,
	    'Todo'
	  ),
	  _react2.default.createElement(TodoList, null)
	), document.getElementById('__react-content'));

/***/ })

});
//# sourceMappingURL=todo.js.map