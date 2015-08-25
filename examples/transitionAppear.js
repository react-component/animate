// use jsx to render html, do not modify simple.html
'use strict';

import './assets/index.less';
import Animate from 'rc-animate';
import React, {Component} from 'react';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enter: 1
    };
    this.toggleAnimate = this.toggleAnimate.bind(this);
  }

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter
    });
  }

  onAppear(key){
    console.log('appear',key);
  }

  onEnter(key){
    console.log('enter',key);
  }

  onLeave(key){
    console.log('leave',key);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          showProp='data-show'
          onAppear={this.onAppear}
          onEnter={this.onEnter}
          onLeave={this.onLeave}
          transitionAppear={true}
          transitionName="fade">
          <div data-show={this.state.enter} key="1" style={{
          display:this.state.enter?'block':'none',
          marginTop: '20px',
          width: '200px',
          height: '200px',
          backgroundColor: 'red'
          }}></div>
        </Animate>
      </div>
    );
  }
}

React.render(<Demo />, document.getElementById('__react-content'));
