/* eslint-disable react/no-access-state-in-setstate,
  no-console, react/no-multi-comp, react/jsx-no-bind */

import React from 'react';
import velocity from 'velocity-animate';
import Animate from '../src';

import './assets/index.less';

const Box = props => {
  const style = {
    width: '200px',
    display: props.visible ? 'block' : 'none',
    height: '200px',
    backgroundColor: 'red',
  };
  return <div style={style} />;
};

class Demo extends React.Component {
  state = {
    destroyed: false,
    visible: true,
    exclusive: false,
  };

  toggleAnimate = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };

  animateEnter = (node, done) => {
    let ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'none';

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

    node.style.display = 'block';

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

  toggle = field => {
    this.setState({
      [field]: !this.state[field],
    });
  };

  destroy = () => {
    this.setState({
      destroyed: true,
    });
  };

  render() {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };

    return (
      <div>
        <label>
          <input
            type="checkbox"
            onChange={this.toggle.bind(this, 'visible')}
            checked={this.state.visible}
          />
          show
        </label>
        &nbsp;
        <label>
          <input
            type="checkbox"
            onChange={this.toggle.bind(this, 'exclusive')}
            checked={this.state.exclusive}
          />
          exclusive
        </label>
        &nbsp;
        <button type="button" onClick={this.destroy}>
          destroy
        </button>
        <br />
        <br />
        <Animate component="" exclusive={this.state.exclusive} showProp="visible" animation={anim}>
          {this.state.destroyed ? null : <Box visible={this.state.visible} />}
        </Animate>
      </div>
    );
  }
}

export default Demo;
