/* eslint-disable react/no-access-state-in-setstate,
  no-console, react/no-multi-comp, react/jsx-no-bind
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Animate from '../src';

import './assets/index.less';

class Todo extends React.Component {
  static defaultProps = {
    visible: true,
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
      display: props.visible ? 'block' : 'none',
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
    items: [
      { content: 'hello', visible: true },
      { content: 'world', visible: true },
      { content: 'click', visible: true },
      { content: 'me', visible: true },
    ],
  };

  handleHide = (i, item) => {
    const newItems = this.state.items.concat([]);
    newItems.forEach((n, index) => {
      newItems[index] = { ...n, visible: true };
    });
    newItems[i] = { ...item, visible: false };
    this.setState({ items: newItems });
  };

  render() {
    const items = this.state.items.map((item, i) => (
      <Todo key={item.content} visible={item.visible} onClick={this.handleHide.bind(this, i, item)}>
        {item.content}
      </Todo>
    ));
    return (
      <div>
        <Animate showProp="visible" transitionName="fade">
          {items}
        </Animate>
      </div>
    );
  }
}

export default TodoList;
