/* eslint no-console:0, react/no-multi-comp:0 */

import './assets/slow.less';
import Animate from 'rc-animate';
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const Box = React.createClass({
  propTypes: {
    visible: PropTypes.bool,
  },
  render() {
    console.log('render', this.props.visible);
    const style = {
      display: this.props.visible ? 'block' : 'none',
      marginTop: '20px',
      width: '200px',
      height: '200px',
      backgroundColor: 'red',
    };
    return (<div style={style}/>);
  },
});

const Demo = React.createClass({
  getInitialState() {
    return {
      visible: 1,
    };
  },

  onAppear(key) {
    console.log('appear', key);
  },

  onEnter(key) {
    console.log('enter', key);
  },

  onLeave(key) {
    console.log('leave', key);
  },

  toggleAnimate() {
    this.setState({
      visible: !this.state.visible,
    });
  },

  render() {
    return (
      <div>
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          showProp="visible"
          onAppear={this.onAppear}
          onEnter={this.onEnter}
          onLeave={this.onLeave}
          transitionAppear
          transitionName="fade">
          <Box visible={this.state.visible}/>
        </Animate>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
