'use strict';


// cao not run in phantomjs, fail!
var Animate = require('../');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
var Simulate = TestUtils.Simulate;
var expect = require('expect.js');
require('./index.spec.css');

var Todo = React.createClass({
  getDefaultProps: function () {
    return {
      end: function () {
      }
    }
  },

  componentWillUnmount: function () {
    this.props.end();
  },

  render: function () {
    var props = this.props;
    return <div onClick={this.props.onClick} className="item">
      {props.children}
    </div>;
  }
});
var TodoList = React.createClass({
  getInitialState: function () {
    return {items: ['hello', 'world', 'click', 'me']};
  },

  handleAdd: function (item) {
    var newItems =
      this.state.items.concat(item);
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
        <Animate transitionName="example">
          {items}
        </Animate>
      </div>
    );
  }
});

describe('Animate', function () {
  var list;
  var container = document.createElement('div');
  document.body.appendChild(container);

  beforeEach(function (done) {
    React.render(<TodoList/>, container, function () {
      list = this;
      done();
    });
  });

  afterEach(function () {
    try {
      React.unmountComponentAtNode(container);
    } catch (e) {
      console.log(e);
      container.innerHTML = '';
    }
  });

  it('create works', function () {
    expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
  });

  var CssAnimation = require('css-animation');
  if (!CssAnimation.isCssAnimationSupported) {
    return;
  }

  it('transitionLeave works', function (done) {
    this.timeout(5999);
    list.handleRemove(0);
    setTimeout(function () {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(4);
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].getDOMNode().className)
          .to.contain('example-leave');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[0].getDOMNode().className)
          .to.contain('example-leave-active');
      }
    }, 100);
    setTimeout(function () {
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(3);
      }
      done();
    }, 1400);
  });

  it('transitionLeave works', function (done) {
    this.timeout(5999);
    list.handleAdd(Date.now());
    setTimeout(function () {
      expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(5);
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].getDOMNode().className)
          .to.contain('example-enter');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].getDOMNode().className)
          .to.contain('example-enter-active');
      }
    }, 100);
    setTimeout(function () {
      if (!window.callPhantom) {
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item').length).to.be(5);
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].getDOMNode().className)
          .not.to.contain('example-enter');
        expect(TestUtils.scryRenderedDOMComponentsWithClass(list, 'item')[4].getDOMNode().className)
          .not.to.contain('example-enter-active');
      }
      done();
    }, 1400);
  });
});
