'use strict';

import './assets/index.css';
import React from 'react';
import Animate from 'rc-animate';
import $ from 'jquery';

var Todo = React.createClass({
  getDefaultProps: function () {
    return {
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
    return <div onClick={this.props.onClick} style={{
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
      items: ['hello', 'world', 'click', 'me']
    };
  },
  animateEnter(node, done){
    $(node).css('display', 'none');
    $(node).slideDown(1000,done);
    return {
      stop:function(){
        $(node).stop(true,true);
      }
    };
  },
  animateLeave(node, done){
    $(node).css('display', '');
    $(node).slideUp(1000,done);
    return {
      stop:function(){
        $(node).stop(true,true);
      }
    };
  },
  handleAdd: function () {
    var newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({items: newItems});
  },
  handleRemove: function (i) {
    var newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({items: newItems});
  },
  render: function () {
    var items = this.state.items.map(function (item, i) {
      return (
        <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </Todo>
      );
    }.bind(this));
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        <Animate animation={{
          enter: this.animateEnter,
          leave: this.animateLeave
        }}>
          {items}
        </Animate>
      </div>
    );
  }
});

React.render(<div>
  <h2>Todo</h2>
  <TodoList />
</div>, document.getElementById('__react-content'));
