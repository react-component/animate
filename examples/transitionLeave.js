/* eslint no-console:0, react/no-multi-comp:0 */

import './assets/index.less';
import Animate from 'rc-animate';
import React from 'react';
import ReactDOM from 'react-dom';

const Demo = React.createClass({
  getInitialState() {
    return {
      enter: true,
    };
  },

  onEvent(e) {
    console.log(e);
  },

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter,
    });
  },

  render() {
    const text = this.state.enter ? 'ON' : 'OFF';
    return (
      <div>
        <Animate
          transitionLeave={false}
          transitionName="fade"
        >
          <button key={text} onClick={this.toggleAnimate}>{text}</button>
        </Animate>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
