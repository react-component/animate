/* eslint no-console:0, react/no-multi-comp:0, no-alert:0, no-undef:0, react/jsx-no-bind:0 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import velocity from 'velocity-animate';

import './assets/index.less';

class Todo extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    end: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
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
  }

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
  }

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
  }

  handleAdd = () => {
    const newItems =
      this.state.items.concat([prompt('Enter some text')]);
    this.setState({ items: newItems });
  }

  handleRemove = (i) => {
    const newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  toggle = (field) => {
    this.setState({
      [field]: !this.state[field],
    });
  }

  render() {
    const items = this.state.items.map((item, i) => {
      return (
        <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </Todo>
      );
    });
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };
    return (
      <div>
        <button onClick={this.handleAdd}>Add Item</button>
        &nbsp;
        <label>
          <input
            type="checkbox"
            onChange={this.toggle.bind(this, 'exclusive')}
            checked={this.state.exclusive}
          />
          exclusive</label>
        <br/><br/>
        <Animate
          exclusive={this.state.exclusive}
          animation={anim}
        >
          {items}
        </Animate>
      </div>
    );
  }
}

ReactDOM.render(
  <div>
    <h2>Todo</h2>
    <TodoList />
  </div>,
  document.getElementById('__react-content')
);
