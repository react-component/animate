/* eslint no-console:0, react/no-multi-comp:0 */
import Animate from '../';
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import './index.spec.css';
import CssAnimation from 'css-animation';

class Todo extends React.Component {
  static propTypes = {
    end: PropTypes.func,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    end() {},
  }

  componentWillUnmount() {
    this.props.end();
  }

  render() {
    const props = this.props;
    return (
      <div onClick={this.props.onClick} className="item">
        {props.children}
      </div>
    );
  }
}

class TodoList extends React.Component {
  state = {
    items: ['hello', 'world', 'click', 'me'],
  }

  handleAdd = (item) => {
    const newItems =
      this.state.items.concat(item);
    this.setState({ items: newItems });
  }

  handleRemove = (i) => {
    const newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  }

  insertUndefined = (i) => {
    const newItems = this.state.items;
    newItems.splice(i, 1, undefined);
    this.setState({ items: newItems });
  }

  render() {
    const items = this.state.items.map((item, i) => {
      // Allow testing of null/undefined values by just passing them directly to
      // Animate instead of wrapping them with a Todo component
      if (item === null || item === undefined) {
        return item;
      }

      return (
        <Todo key={item} onClick={this.handleRemove.bind(this, i)}>
          {item}
        </Todo>
      );
    });
    return (
      <div>
        <Animate transitionName="example">
          {items}
        </Animate>
      </div>
    );
  }
}

describe('Animate', () => {
  let list;
  const container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach((done) => {
    ReactDOM.render(<TodoList/>, container, function init() {
      list = this;
      done();
    });
  });

  afterEach(() => {
    try {
      ReactDOM.unmountComponentAtNode(container);
    } catch (e) {
      console.log(e);
      container.innerHTML = '';
    }
  });

  it('create works', () => {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
  });

  if (!CssAnimation.isCssAnimationSupported) {
    return;
  }

  it('transitionLeave works', function t2(done) {
    this.timeout(5999);
    list.handleRemove(0);
    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].className)
          .to.contain('example-leave');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].className)
          .to.contain('example-leave-active');
      }
    }, 100);
    setTimeout(() => {
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(3);
      }
      done();
    }, 1000);
  });

  it('transitionLeave works', function t1(done) {
    this.timeout(5999);
    list.handleAdd(Date.now());
    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(5);
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].className)
          .to.contain('example-enter');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].className)
          .to.contain('example-enter-active');
      }
    }, 100);
    setTimeout(() => {
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(5);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].className)
          .not.to.contain('example-enter');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].className)
          .not.to.contain('example-enter-active');
      }
      done();
    }, 1000);
  });

  it('does not generate an error when a null or undefined child is present', () => {
    list.handleAdd(null);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
    list.handleAdd(undefined);
    expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
  });

  it('transitionLeave works when a child becomes undefined', function t4(done) {
    this.timeout(5999);
    list.insertUndefined(0);
    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].className)
          .to.contain('example-leave');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].className)
          .to.contain('example-leave-active');
      }
    }, 100);
    setTimeout(() => {
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(3);
      }
      done();
    }, 1000);
  });
});
