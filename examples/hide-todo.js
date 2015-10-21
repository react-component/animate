'use strict';

import './assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import assign from 'object-assign';

var Todo = React.createClass({
  getDefaultProps: function () {
    return {
      visible: true,
      end: function () {
      }
    }
  },
  componentWillUnmount: function () {
    console.log('componentWillUnmount');
    console.log(this.props.children);
    this.props.end();
  },
  render: function () {
    var props = this.props;
    return <div onClick={this.props.onClick}
                style={{
                display: props.visible ? 'block' : 'none',
                width:100,
                border:'1px solid red',
                padding:10,
                margin:10
      }}>
      {props.children}
    </div>;
  }
});
var TodoList = React.createClass({
  getInitialState: function () {
    return {
      items: [
        {content: 'hello', visible: true},
        {content: 'world', visible: true},
        {content: 'click', visible: true},
        {content: 'me', visible: true}]
    };
  },
  handleHide: function (i, item) {
    var newItems = this.state.items.concat([]);
    newItems.forEach((n, index)=> {
      newItems[index] = assign({}, n, {
        visible: true
      });
    });
    newItems[i] = assign({}, item, {
      visible: false
    });
    this.setState({items: newItems});
  },
  render: function () {
    var items = this.state.items.map(function (item, i) {
      return (
        <Todo key={item.content}
              visible={item.visible}
              onClick={this.handleHide.bind(this, i, item)}>
          {item.content}
        </Todo>
      );
    }.bind(this));
    return (
      <div>
        <Animate
          showProp="visible"
          transitionName="fade">
          {items}
        </Animate>
      </div>
    );
  }
});

ReactDOM.render(<div>
  <h2>Hide Todo</h2>
  <TodoList />
</div>, document.getElementById('__react-content'));
