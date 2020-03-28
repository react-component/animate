/* eslint-disable react/no-access-state-in-setstate,
  no-console, react/no-multi-comp */

import React from 'react';
import Animate from '../src';

import './assets/index.less';

class Demo extends React.Component {
  state = {
    enter: true,
  };

  toggleAnimate = () => {
    this.setState({
      enter: !this.state.enter,
    });
  };

  render() {
    const style = {
      display: this.state.enter ? 'block' : 'none',
      marginTop: '20px',
      width: '200px',
      height: '200px',
      backgroundColor: 'red',
    };
    return (
      <div>
        <button type="button" onClick={this.toggleAnimate}>
          toggle
        </button>
        <Animate component="" transitionName="fade">
          {this.state.enter ? <div key="1" style={style} /> : null}
        </Animate>
      </div>
    );
  }
}

export default Demo;
