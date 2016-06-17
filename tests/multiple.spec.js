/* eslint no-console:0, react/no-multi-comp:0 */
const Animate = require('../');
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = React.PropTypes;
const TestUtils = require('react-addons-test-utils');
const expect = require('expect.js');
require('./index.spec.css');

const Todo = React.createClass({
  propTypes: {
    end: PropTypes.func,
    onClick: PropTypes.func,
  },
  getDefaultProps() {
    return {
      end() {
      },
    };
  },

  componentWillUnmount() {
    this.props.end();
  },

  render() {
    const props = this.props;
    return (<div onClick={this.props.onClick} className="item">
      {props.children}
    </div>);
  },
});
const TodoList = React.createClass({
  getInitialState() {
    return { items: ['hello', 'world', 'click', 'me'] };
  },

  handleAdd(item) {
    const newItems =
      this.state.items.concat(item);
    this.setState({ items: newItems });
  },

  handleRemove(i) {
    const newItems = this.state.items;
    newItems.splice(i, 1);
    this.setState({ items: newItems });
  },

  render() {
    const items = this.state.items.map((item, i) => {
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
  },
});

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

  const CssAnimation = require('css-animation');
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
    }, 1400);
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
    }, 1400);
  });

  it('does not fail with null/undefined children', (done) => {
    ReactDOM.render(
      <Animate>
        {undefined}
        {null}
        <div key="test"></div>
      </Animate>,
      container,
      done
    );
  });
});
