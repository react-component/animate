/* eslint-disable react/no-access-state-in-setstate,
  no-console, react/no-multi-comp, no-alert, no-undef, react/jsx-no-bind */

import React from 'react';
import velocity from 'velocity-animate';
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
    exclusive: false,
    items: ['hello', 'world', 'click', 'me'],
  };

  animateEnter = (node, done) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideDown', {
      duration: 1000,
      complete,
    });
    return {
      stop() {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      },
    };
  };

  animateLeave = (node, done) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideUp', {
      duration: 1000,
      complete,
    });
    return {
      stop() {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      },
    };
  };

  handleAdd = () => {
    const newItems = this.state.items.concat([prompt('Enter some text')]);
    this.setState({ items: newItems });
  };

  handleRemove = i => {
    const newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  };

  toggle = field => {
    this.setState({
      [field]: !this.state[field],
    });
  };

  render() {
    const items = this.state.items.map((item, i) => (
      <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
        {item}
      </Todo>
    ));
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };
    return (
      <div>
        <button type="button" onClick={this.handleAdd}>
          Add Item
        </button>
        &nbsp;
        <label>
          <input
            type="checkbox"
            onChange={this.toggle.bind(this, 'exclusive')}
            checked={this.state.exclusive}
          />
          exclusive
        </label>
        <br />
        <br />
        <Animate exclusive={this.state.exclusive} animation={anim}>
          {items}
        </Animate>
      </div>
    );
  }
}

export default TodoList;
