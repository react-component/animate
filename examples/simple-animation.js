/* eslint no-console:0, react/no-multi-comp:0 */

import './assets/index.less';
import Animate from 'rc-animate';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import velocity from 'velocity-animate';
const Box = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
  },
  render() {
    const style = {
      width: '200px',
      display: this.props.visible ? 'block' : 'none',
      height: '200px',
      backgroundColor: 'red',
    };
    return (<div style={style}></div>);
  },
});

const Demo = React.createClass({
  getInitialState() {
    return {
      destroyed: false,
      visible: true,
      exclusive: false,
    };
  },

  toggleAnimate() {
    this.setState({
      visible: !this.state.visible,
    });
  },

  animateEnter(node, done) {
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
  },

  animateLeave(node, done) {
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
  },

  toggle(field) {
    this.setState({
      [field]: !this.state[field],
    });
  },

  destroy() {
    this.setState({
      destroyed: true,
    });
  },

  render() {
    const anim = {
      enter: this.animateEnter,
      leave: this.animateLeave,
    };
    return (
      <div>
        <label><input
          type="checkbox"
          onChange={this.toggle.bind(this, 'visible')}
          checked={this.state.visible}
        />
          show</label>
        &nbsp;
        <label><input
          type="checkbox"
          onChange={this.toggle.bind(this, 'exclusive')}
          checked={this.state.exclusive}
        />
          exclusive</label>
        &nbsp;
        <button onClick={this.destroy}>destroy</button>
        <br/><br/>
        <Animate
          component=""
          exclusive={this.state.exclusive}
          showProp="visible"
          animation={anim}
        >
          {this.state.destroyed ? null : <Box visible={this.state.visible}/>}
        </Animate>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
