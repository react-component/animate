webpackJsonp([5],{

/***/ 157:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(158);


/***/ }),

/***/ 158:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_animate__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rc_animate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rc_animate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_index_less__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__assets_index_less__);




/* eslint no-console:0, react/no-multi-comp:0, no-alert:0 */







var Todo = function (_React$Component) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(Todo, _React$Component);

  function Todo() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Todo);

    return __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).apply(this, arguments));
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Todo, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('componentWillUnmount');
      console.log(this.props.children);
      this.props.end();
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      var style = {
        width: 100,
        border: '1px solid red',
        padding: 10,
        margin: 10
      };
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        { onClick: this.props.onClick, style: style },
        props.children
      );
    }
  }]);

  return Todo;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

Todo.propTypes = {
  children: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.any,
  end: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func,
  onClick: __WEBPACK_IMPORTED_MODULE_5_prop_types___default.a.func
};
Todo.defaultProps = {
  end: function end() {}
};

var TodoList = function (_React$Component2) {
  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_inherits___default()(TodoList, _React$Component2);

  function TodoList() {
    var _ref;

    var _temp, _this2, _ret;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TodoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(this, (_ref = TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      items: ['hello', 'world', 'click', 'me']
    }, _this2.handleAdd = function () {
      var items = _this2.state.items.concat([prompt('Enter some text')]); // eslint-disable-line
      _this2.setState({ items: items });
    }, _this2.handleRemove = function (i) {
      var items = _this2.state.items.concat();
      items.splice(i, 1);
      _this2.setState({ items: items });
    }, _temp), __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_possibleConstructorReturn___default()(_this2, _ret);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TodoList, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var items = this.state.items.map(function (item, i) {
        return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          Todo,
          { key: item, onClick: function onClick() {
              _this3.handleRemove(i);
            } },
          item
        );
      });
      return __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          'button',
          { onClick: this.handleAdd },
          'Add Item'
        ),
        __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_7_rc_animate___default.a,
          { transitionName: 'fade' },
          items
        )
      );
    }
  }]);

  return TodoList;
}(__WEBPACK_IMPORTED_MODULE_4_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_6_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(
    'h2',
    null,
    'Todo'
  ),
  __WEBPACK_IMPORTED_MODULE_4_react___default.a.createElement(TodoList, null)
), document.getElementById('__react-content'));

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

},[157]);
//# sourceMappingURL=todo.js.map