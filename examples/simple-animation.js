// use jsx to render html, do not modify simple.html
'use strict';

import './assets/index.css';
import Animate from 'rc-animate';
import React, {Component} from 'react';
import $ from 'jquery';

let transitionEnter = true;
let remove = false;

var Demo = React.createClass({
  getInitialState() {
    return {
      enter: true
    };
  },

  toggleAnimate() {
    this.setState({
      enter: !this.state.enter
    });
  },

  animateEnter(node, done){
    $(node).css('display', 'none');
    $(node).slideDown(1000, done);
    return {
      stop: function () {
        $(node).stop(true, true);
      }
    };
  },

  animateLeave(node, done){
    $(node).css('display', '');
    $(node).slideUp(1000, done);
    return {
      stop: function () {
        $(node).stop(true, true);
      }
    };
  },

  render() {
    return (
      <div>
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          showProp='data-show'
          animation={{
            enter:this.animateEnter,
            leave:this.animateLeave
          }}>
          <div data-show={this.state.enter} key="1" style={{
          marginTop: '20px',
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
