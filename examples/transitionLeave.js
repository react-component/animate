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


  render() {

    var text = this.state.enter ? "ON" : "OFF";
    return (
      <div>
        <Animate transitionLeave={false} transitionName="fade">
          <button key={text} onClick={this.toggleAnimate}>{text}</button>
        </Animate>
      </div>
    );
  }
});

React.render(<Demo />, document.getElementById('__react-content'));
