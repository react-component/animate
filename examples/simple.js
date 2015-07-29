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
      exclusive:false,
      enter: true
    };
  }

  toggle(field){
    this.setState({
      [field]:!this.state[field]
    });
  }

  render() {
    return (
      <div>
        <label><input type='checkbox' onChange={this.toggle.bind(this,'enter')} checked={this.state.enter}/> show</label>
        &nbsp;
        <label><input type='checkbox' onChange={this.toggle.bind(this,'exclusive')} checked={this.state.exclusive}/> exclusive</label>
        <br/><br/>
        <Animate
          component=""
          exclusive={this.state.exclusive}
          showProp='data-show'
          transitionName="fade">
          <div data-show={this.state.enter} style={{
          visibility:this.state.enter?'':'hidden',
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
