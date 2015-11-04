webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(170);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(160);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	var _rcAnimate = __webpack_require__(161);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _objectAssign = __webpack_require__(171);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var Todo = _react2['default'].createClass({
	  displayName: 'Todo',
	
	  getDefaultProps: function getDefaultProps() {
	    return {
	      visible: true,
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
	    return _react2['default'].createElement(
	      'div',
	      { onClick: this.props.onClick,
	        style: {
	          display: props.visible ? 'block' : 'none',
	          width: 100,
	          border: '1px solid red',
	          padding: 10,
	          margin: 10
	        } },
	      props.children
	    );
	  }
	});
	var TodoList = _react2['default'].createClass({
	  displayName: 'TodoList',
	
	  getInitialState: function getInitialState() {
	    return {
	      items: [{ content: 'hello', visible: true }, { content: 'world', visible: true }, { content: 'click', visible: true }, { content: 'me', visible: true }]
	    };
	  },
	  handleHide: function handleHide(i, item) {
	    var newItems = this.state.items.concat([]);
	    newItems.forEach(function (n, index) {
	      newItems[index] = (0, _objectAssign2['default'])({}, n, {
	        visible: true
	      });
	    });
	    newItems[i] = (0, _objectAssign2['default'])({}, item, {
	      visible: false
	    });
	    this.setState({ items: newItems });
	  },
	  render: function render() {
	    var items = this.state.items.map((function (item, i) {
	      return _react2['default'].createElement(
	        Todo,
	        { key: item.content,
	          visible: item.visible,
	          onClick: this.handleHide.bind(this, i, item) },
	        item.content
	      );
	    }).bind(this));
	    return _react2['default'].createElement(
	      'div',
	      null,
	      _react2['default'].createElement(
	        _rcAnimate2['default'],
	        {
	          showProp: 'visible',
	          transitionName: 'fade' },
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
	    'Hide Todo'
	  ),
	  _react2['default'].createElement(TodoList, null)
	), document.getElementById('__react-content'));

/***/ },

/***/ 171:
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ }

});
//# sourceMappingURL=hide-todo.js.map