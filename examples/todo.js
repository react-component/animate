/* eslint-disable react/no-access-state-in-setstate,
 no-console, react/no-multi-comp, no-alert, no-undef, react/jsx-no-bind */

import React from 'react';
import Animate from '../src';

import './assets/index.less';

class Todo extends React.Component {
  static defaultProps = {
    end() {},
  };

  componentWillUnmount() {
    console.log('componentWillUnmount');
    console.log(this.props.children);
    this.props.end();
  }

  render() {
    const { props } = this;
    const style = {
      width: 100,
      border: '1px solid red',
      padding: 10,
      margin: 10,
    };
    return (
      <div onClick={this.props.onClick} style={style}>
        {props.children}
      </div>
    );
  }
}

class TodoList extends React.Component {
  state = {
    items: ['hello', 'world', 'click', 'me'],
  };

  handleAdd = () => {
    const items = this.state.items.concat([prompt('Enter some text')]);
    this.setState({ items });
  };

  handleRemove = i => {
    const items = this.state.items.concat();
    items.splice(i, 1);
    this.setState({ items });
  };

  render() {
    const items = this.state.items.map((item, i) => (
      <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
        {item}
      </Todo>
    ));
    return (
      <div>
        <button type="button" onClick={this.handleAdd}>
          Add Item
        </button>
        <Animate transitionName="fade">{items}</Animate>
      </div>
    );
  }
}

export default TodoList;
