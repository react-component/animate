'use strict';

import './assets/index.css';
import React from 'react';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';

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
      exclusive: false,
      items: ['hello', 'world', 'click', 'me']
    };
  },
  animateEnter(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideDown', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },
  animateLeave(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideUp', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
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
  toggle(field){
    this.setState({
      [field]: !this.state[field]
    });
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
        &nbsp;
        <label><input type='checkbox' onChange={this.toggle.bind(this,'exclusive')} checked={this.state.exclusive}/>
          exclusive</label>
        <br/><br/>
        <Animate
          exclusive={this.state.exclusive}
          animation={{
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
