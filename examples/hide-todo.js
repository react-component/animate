webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(168);


/***/ },

/***/ 2:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	__webpack_require__(2);
	
	var _react = __webpack_require__(3);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _rcAnimate = __webpack_require__(159);
	
	var _rcAnimate2 = _interopRequireDefault(_rcAnimate);
	
	var _objectAssign = __webpack_require__(169);
	
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
	
	_react2['default'].render(_react2['default'].createElement(
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

/***/ 169:
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);
	
		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}
	
		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}
	
	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);
	
		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));
	
			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}
	
		return to;
	};


/***/ }

});
//# sourceMappingURL=hide-todo.js.map