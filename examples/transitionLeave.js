/* eslint react/no-access-state-in-setstate:0, no-console:0, react/no-multi-comp:0 */

import React from 'react';
import Animate from '../src';

import './assets/index.less';

class Demo extends React.Component {
  state = {
    enter: true,
  };

  onEvent = e => {
    console.log(e);
  };

  toggleAnimate = () => {
    this.setState({
      enter: !this.state.enter,
    });
  };

  render() {
    const text = this.state.enter ? 'ON' : 'OFF';
    return (
      <div>
        <Animate transitionLeave={false} transitionName="fade">
          <button type="button" key={text} onClick={this.toggleAnimate}>
            {text}
          </button>
        </Animate>
      </div>
    );
  }
}

export default Demo;
