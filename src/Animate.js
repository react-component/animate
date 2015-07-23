'use strict';

import React from 'react';
import ChildrenUtils, {
  toArrayChildren,
  isShownInChildrenByKey,
  inChildrenByKey,
  isShownInChildren,
  inChildren
} from './ChildrenUtils';
import AnimateChild from './AnimateChild';

var Animate = React.createClass({
  protoTypes: {
    component: React.PropTypes.any,
    animation: React.PropTypes.object,
    transitionName: React.PropTypes.string,
    transitionEnter: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    onEnd: React.PropTypes.func,
    showProp: React.PropTypes.bool,
    animateMount: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      animation: {},
      component: 'span',
      transitionEnter: true,
      transitionLeave: true,
      enter: true,
      animateMount: false,
      onEnd: function () {
      }
    };
  },

  getInitialState() {
    this.currentlyAnimatingKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
    return {
      children: toArrayChildren(this.props.children)
    };
  },

  componentWillReceiveProps(nextProps) {
    var nextChildren = toArrayChildren(nextProps.children);
    var props = this.props;
    var showProp = props.showProp;
    var exclusive = props.exclusive;
    // last props children if exclusive
    // exclusive needs immediate response
    var currentChildren = exclusive ? toArrayChildren(props.children) : this.state.children;
    var newChildren = ChildrenUtils.mergeChildren(
      currentChildren,
      nextChildren
    );

    if (showProp) {
      newChildren = newChildren.map((c) => {
        if (!c.props[showProp] && isShownInChildren(currentChildren, c, showProp)) {
          c = React.cloneElement(c, {
            [showProp]: true
          });
        }
        return c;
      });
    }

    // exclusive needs immediate response
    if (exclusive) {
      // make middle state children invalid
      // restore to last props children
      newChildren.forEach((c)=> {
        this.stop(c.key);
      });
    }

    this.setState({
      children: newChildren
    });

    var currentlyAnimatingKeys = this.currentlyAnimatingKeys;

    nextChildren.forEach((c)=> {
      var key = c.key;
      if (currentlyAnimatingKeys[key]) {
        return;
      }
      var hasPrev = inChildren(currentChildren, c);
      if (showProp) {
        if (hasPrev) {
          var showInNow = isShownInChildren(currentChildren, c, showProp);
          var showInNext = c.props[showProp];
          if (!showInNow && showInNext) {
            this.keysToEnter.push(key);
          }
        }
      } else if (!hasPrev) {
        this.keysToEnter.push(key);
      }
    });

    currentChildren.forEach((c)=> {
      var key = c.key;
      if (currentlyAnimatingKeys[key]) {
        return;
      }
      var hasNext = inChildren(nextChildren, c);
      if (showProp) {
        if (hasNext) {
          var showInNext = isShownInChildren(nextChildren, c, showProp);
          var showInNow = c.props[showProp];
          if (!showInNext && showInNow) {
            this.keysToLeave.push(key);
          }
        }
      } else if (!hasNext) {
        this.keysToLeave.push(key);
      }
    });
  },

  performEnter(key) {
    this.currentlyAnimatingKeys[key] = true;
    this.refs[key].componentWillEnter(
      this._handleDoneEntering.bind(this, key)
    );
  },

  _handleDoneEntering(key) {
    delete this.currentlyAnimatingKeys[key];
    var currentChildren = toArrayChildren(this.props.children);
    if (!this.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      this.performLeave(key);
    } else {
      this.props.onEnd(key, true);
      if (this.isMounted()) {
        this.setState({
          children: currentChildren
        });
      }
    }
  },

  performLeave(key) {
    this.currentlyAnimatingKeys[key] = true;
    this.refs[key].componentWillLeave(this._handleDoneLeaving.bind(this, key));
  },

  isValidChildByKey(currentChildren, key) {
    var showProp = this.props.showProp;
    if (showProp) {
      return isShownInChildrenByKey(currentChildren, key, showProp);
    } else {
      return inChildrenByKey(currentChildren, key);
    }
  },

  _handleDoneLeaving(key) {
    delete this.currentlyAnimatingKeys[key];
    var currentChildren = toArrayChildren(this.props.children);
    // in case state change is too fast
    if (this.isValidChildByKey(currentChildren, key)) {
      this.performEnter(key);
    } else {
      this.props.onEnd(key, false);
      if (this.isMounted()) {
        this.setState({
          children: currentChildren
        });
      }
    }
  },

  stop(key) {
    delete this.currentlyAnimatingKeys[key];
    var component = this.refs[key];
    if (component) {
      component.stop();
    }
  },

  componentDidMount() {
    if (this.props.animateMount) {
      this.state.children.map(function (c) {
        return c.key;
      }).forEach(this.performEnter);
    }
  },

  componentDidUpdate() {
    var keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    var keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  },

  render() {
    var props = this.props;
    var children = this.state.children.map((child) => {
      return <AnimateChild
        key={child.key}
        ref={child.key}
        animation={props.animation}
        transitionName={props.transitionName}
        transitionEnter={props.transitionEnter}
        transitionLeave={props.transitionLeave}>
        {child}
      </AnimateChild>;
    });
    var Component = props.component;
    if (Component) {
      return <Component {...this.props}>{children}</Component>;
    } else {
      return children[0] || null;
    }
  }
});

export default Animate;
