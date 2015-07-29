// use jsx to render html, do not modify simple.html
'use strict';

import './assets/slow.css';
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
          exclusive={true}
          showProp='data-show'
          transitionName="fade">
          <div data-show={this.state.enter} style={{
          visibility:this.state.enter?'':'hidden',
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
