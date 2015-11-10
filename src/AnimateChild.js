import React from 'react';
import ReactDOM from 'react-dom';
import cssAnimate, {isCssAnimationSupported} from 'css-animation';
import animUtil from './util';

const transitionMap = {
  enter: 'transitionEnter',
  appear: 'transitionAppear',
  leave: 'transitionLeave',
};

const AnimateChild = React.createClass({
  propTypes: {
    children: React.PropTypes.any,
  },

  componentWillUnmount() {
    this.stop();
  },

  componentWillEnter(done) {
    if (animUtil.isEnterSupported(this.props)) {
      this.transition('enter', done);
    } else {
      done();
    }
  },

  componentWillAppear(done) {
    if (animUtil.isAppearSupported(this.props)) {
      this.transition('appear', done);
    } else {
      done();
    }
  },

  componentWillLeave(done) {
    if (animUtil.isLeaveSupported(this.props)) {
      this.transition('leave', done);
    } else {
      done();
    }
  },

  transition(animationType, finishCallback) {
    const node = ReactDOM.findDOMNode(this);
    const props = this.props;
    const transitionName = props.transitionName;
    this.stop();
    const end = () => {
      this.stopper = null;
      finishCallback();
    };
    if ((isCssAnimationSupported || !props.animation[animationType]) && transitionName && props[transitionMap[animationType]]) {
      this.stopper = cssAnimate(node, transitionName + '-' + animationType, end);
    } else {
      this.stopper = props.animation[animationType](node, end);
    }
  },

  stop() {
    const stopper = this.stopper;
    if (stopper) {
      this.stopper = null;
      stopper.stop();
    }
  },

  render() {
    return this.props.children;
  },
});

export default AnimateChild;
