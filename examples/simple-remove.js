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

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter,
    });
  },

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
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          transitionName="fade"
        >
          {this.state.enter ? <div key="1" style={style}/> : null}
        </Animate>
      </div>
    );
  },
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
