/* eslint no-console:0, react/no-multi-comp:0 */

import './assets/index.less';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import assign from 'object-assign';

class Todo extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    end: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    visible: true,
    end() {},
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    console.log(this.props.children);
    this.props.end();
  }

  render() {
    const props = this.props;
    const style = {
      display: props.visible ? 'block' : 'none',
      width: 100,
      border: '1px solid red',
      padding: 10,
      margin: 10,
    };
    return (<div
      onClick={this.props.onClick}
      style={style}
    >
      {props.children}
    </div>);
  }
}

class TodoList extends React.Component {
  state = {
    items: [
      { content: 'hello', visible: true },
      { content: 'world', visible: true },
      { content: 'click', visible: true },
      { content: 'me', visible: true }],
  }

  handleHide = (i, item) => {
    const newItems = this.state.items.concat([]);
    newItems.forEach((n, index) => {
      newItems[index] = assign({}, n, {
        visible: true,
      });
    });
    newItems[i] = assign({}, item, {
      visible: false,
    });
    this.setState({ items: newItems });
  }

  render() {
    const items = this.state.items.map((item, i) => {
      return (
        <Todo
          key={item.content}
          visible={item.visible}
          onClick={this.handleHide.bind(this, i, item)}
        >
          {item.content}
        </Todo>
      );
    });
    return (
      <div>
        <Animate
          showProp="visible"
          transitionName="fade"
        >
          {items}
        </Animate>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h2>Hide Todo</h2>
    <TodoList />
  </div>,
  document.getElementById('__react-content')
);
