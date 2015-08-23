// use jsx to render html, do not modify simple.html
'use strict';

import './assets/index.less';
import Animate from 'rc-animate';
import React, {Component} from 'react';

let transitionEnter = true;
let remove = false;

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      enter: true
    };
    this.toggleAnimate = this.toggleAnimate.bind(this);
  }

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          transitionName="fade">
          {this.state.enter?<div key="1" style={{
          display:this.state.enter?'block':'none',
          marginTop: '20px',
          width: '200px',
          height: '200px',
          backgroundColor: 'red'
          }}></div>:null}
        </Animate>
      </div>
    );
  }
}

React.render(<Demo />, document.getElementById('__react-content'));
