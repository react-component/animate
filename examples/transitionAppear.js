/* eslint react/no-access-state-in-setstate:0, no-console:0, react/no-multi-comp:0 */

import React from 'react';
import Animate from '../src';

import './assets/slow.less';

const Box = props => {
  console.log('render', props.visible);
  const style = {
    display: props.visible ? 'block' : 'none',
    marginTop: '20px',
    width: '200px',
    height: '200px',
    backgroundColor: 'red',
  };
  return <div style={style} />;
};

class Demo extends React.Component {
  state = {
    visible: true,
  };

  onAppear = key => {
    console.log('appear', key);
  };

  onEnter = key => {
    console.log('enter', key);
  };

  onLeave = key => {
    console.log('leave', key);
  };

  toggleAnimate = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  render() {
    return (
      <div>
        <button type="button" onClick={this.toggleAnimate}>
          toggle
        </button>
        <Animate
          component=""
          showProp="visible"
          onAppear={this.onAppear}
          onEnter={this.onEnter}
          onLeave={this.onLeave}
          transitionAppear
          transitionName="fade"
        >
          <Box visible={this.state.visible} />
        </Animate>
      </div>
    );
  }
}

export default Demo;
