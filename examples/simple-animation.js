// use jsx to render html, do not modify simple.html
'use strict';

import './assets/index.css';
import Animate from 'rc-animate';
import React, {Component} from 'react';
import velocity from 'velocity-animate';

let transitionEnter = true;
let remove = false;

var Demo = React.createClass({
  getInitialState() {
    return {
      enter: true,
      exclusive:false
    };
  },

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter
    });
  },

  animateEnter(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideDown', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },

  animateLeave(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    velocity(node, 'slideUp', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },

  toggle(field){
    this.setState({
      [field]:!this.state[field]
    });
  },

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
          animation={{
            enter:this.animateEnter,
            leave:this.animateLeave
          }}>
          <div data-show={this.state.enter} key="1" style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'red'
          }}></div>
        </Animate>
      </div>
    );
  }
});

React.render(<Demo />, document.getElementById('__react-content'));
