webpackJsonp([5],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(177);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	/* eslint no-console:0, react/no-multi-comp:0, no-alert:0 */
	
	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcAnimate = __webpack_require__(161);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var Todo = _react2['default'].createClass({
	  displayName: 'Todo',
	
	  propTypes: {
	    children: _react.PropTypes.any,
	    end: _react.PropTypes.func,
	    onClick: _react.PropTypes.func
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      end: function end() {}
	    };
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    console.log('componentWillUnmount');
	    console.log(this.props.children);
	    this.props.end();
	  },
	  render: function render() {
	    var props = this.props;
	    var style = {
	      width: 100,
	      border: '1px solid red',
	      padding: 10,
	      margin: 10
	    };
	    return _react2['default'].createElement(
	      'div',
	      { onClick: this.props.onClick, style: style },
	      props.children
	    );
	  }
	});
	var TodoList = _react2['default'].createClass({
	  displayName: 'TodoList',
	
	  getInitialState: function getInitialState() {
	    return { items: ['hello', 'world', 'click', 'me'] };
	  },
	  handleAdd: function handleAdd() {
	    var items = this.state.items.concat([prompt('Enter some text')]);
	    this.setState({ items: items });
	  },
	  handleRemove: function handleRemove(i) {
	    var items = this.state.items.concat();
	    items.splice(i, 1);
	    this.setState({ items: items });
	  },
	  render: function render() {
	    var _this = this;
	
	    var items = this.state.items.map(function (item, i) {
	      return _react2['default'].createElement(
	        Todo,
	        { key: item, onClick: _this.handleRemove.bind(_this, i) },
	        item
	      );
	    });
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        'button',
	        { onClick: this.handleAdd },
	        'Add Item'
	      ),
	      _react2['default'].createElement(
	        _rcAnimate2['default'],
	        { transitionName: 'fade' },
	        items
	      )
	    );
	  }
	});
	
	_reactDom2['default'].render(_react2['default'].createElement(
	  'div',
	  null,
	  _react2['default'].createElement(
	    'h2',
	    null,
	    'Todo'
	  ),
	  _react2['default'].createElement(TodoList, null)
	), document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=todo.js.map