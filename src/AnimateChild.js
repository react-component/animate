'use strict';

import React from 'react';
import CssAnimate, {isCssAnimationSupported} from 'css-animation';


var AnimateChild = React.createClass({
  transition(animationType, finishCallback) {
    var node = React.findDOMNode(this);
    var props = this.props;
    var transitionName = props.transitionName;
    this.stop();
    var end = () => {
      this.stopper = null;
      finishCallback();
    };
    if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props.transitionEnter) {
      this.stopper = CssAnimate(node, transitionName + '-' + animationType, end);
    } else {
      this.stopper = props.animation[animationType](node, end);
    }
  },

  stop() {
    if (this.stopper) {
      this.stopper.stop();
      this.stopper = null;
    }
  },

  componentWillUnmount() {
    this.stop();
  },

  componentWillEnter(done) {
    var props = this.props;
    if (props.transitionEnter && props.transitionName || props.animation.enter) {
      this.transition('enter', done);
    } else {
      done();
    }
  },

  componentWillLeave(done) {
    var props = this.props;
    if (props.transitionLeave && props.transitionName || props.animation.leave) {
      this.transition('leave', done);
    } else {
      done();
    }
  },

  render() {
    return this.props.children;
  }
});

export default AnimateChild;
