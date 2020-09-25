webpackJsonp([7],{

/***/ 3:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(50);


/***/ }),

/***/ 50:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rc_animate__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_less__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_index_less___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_index_less__);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint no-console:0, react/no-multi-comp:0, react/jsx-no-bind:0, react/prop-types: 0 */







var Todo = function (_React$Component) {
  _inherits(Todo, _React$Component);

  function Todo() {
    _classCallCheck(this, Todo);

    return _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).apply(this, arguments));
  }

  _createClass(Todo, [{
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
        display: props.visible ? 'block' : 'none',
        width: 100,
        border: '1px solid red',
        padding: 10,
        margin: 10
      };
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        {
          onClick: this.props.onClick,
          style: style
        },
        props.children
      );
    }
  }]);

  return Todo;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

Todo.defaultProps = {
  visible: true,
  end: function end() {}
};

var TodoList = function (_React$Component2) {
  _inherits(TodoList, _React$Component2);

  function TodoList() {
    var _ref;

    var _temp, _this2, _ret;

    _classCallCheck(this, TodoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref = TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call.apply(_ref, [this].concat(args))), _this2), _this2.state = {
      items: [{ content: 'hello', visible: true }, { content: 'world', visible: true }, { content: 'click', visible: true }, { content: 'me', visible: true }]
    }, _this2.handleHide = function (i, item) {
      var newItems = _this2.state.items.concat([]);
      newItems.forEach(function (n, index) {
        newItems[index] = _extends({}, n, { visible: true });
      });
      newItems[i] = _extends({}, item, { visible: false });
      _this2.setState({ items: newItems });
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  _createClass(TodoList, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      var items = this.state.items.map(function (item, i) {
        return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          Todo,
          {
            key: item.content,
            visible: item.visible,
            onClick: _this3.handleHide.bind(_this3, i, item)
          },
          item.content
        );
      });
      return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          __WEBPACK_IMPORTED_MODULE_2_rc_animate__["c" /* default */],
          {
            showProp: 'visible',
            transitionName: 'fade'
          },
          items
        )
      );
    }
  }]);

  return TodoList;
}(__WEBPACK_IMPORTED_MODULE_0_react___default.a.Component);

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
  'div',
  null,
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
    'h2',
    null,
    'Hide Todo'
  ),
  __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(TodoList, null)
), document.getElementById('__react-content'));

/***/ })

},[49]);
//# sourceMappingURL=hide-todo.js.map