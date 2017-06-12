/* eslint no-console:0, react/no-multi-comp:0, react/prop-types:0 */
const Animate = require('../');
const React = require('react');
const ReactDOM = require('react-dom');
const expect = require('expect.js');
require('./index.spec.css');

class Child extends React.Component {
  state = {
    visible: true,
  };
  componentDidMount() {
    // strange setTimeout
    setTimeout(() => {
      this.setState({ visible: false });
      this.props.onClick();
    }, 0);
  }
  render() {
    return (
      <Animate onLeave={this.props.onLeave} transitionName="example">
        {this.state.visible ? <div key="xxxx">xxxx</div> : null}
      </Animate>
    );
  }
}

class App extends React.Component {
  state = {
    visible: true,
  }
  removeFather = () => {
    this.setState({ visible: false });
  }
  render() {
    return this.state.visible
      ? <Child onClick={this.removeFather} onLeave={this.props.onLeave} /> : null;
  }
}

describe('animation end', () => {
  let onLeaveCalled;
  const container = document.createElement('div');
  document.body.appendChild(container);
  const onLeave = () => {
    onLeaveCalled = true;
  };

  beforeEach((done) => {
    ReactDOM.render(<App onLeave={onLeave} />, container, () => {
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

  it('onLeave should always be triggered when father is unmounted', (done) => {
    setTimeout(() => {
      expect(onLeaveCalled).to.be(true);
      done();
    }, 0);
  });
});
