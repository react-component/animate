import React from 'react';
import ChildrenUtils, {
  toArrayChildren,
  isShownInChildrenByKey,
  inChildrenByKey,
  isShownInChildren,
  isSameChildren,
  inChildren
} from './ChildrenUtils';
import AnimateChild from './AnimateChild';
const defaultKey = 'rc_animate_' + Date.now();
import animUtil from './util';

function getChildrenFromProps(props) {
  const children = props.children;
  if (React.isValidElement(children)) {
    if (!children.key) {
      return React.cloneElement(children, {
        key: defaultKey,
      });
    }
  }
  return children;
}

function noop() {
}

const Animate = React.createClass({
  propTypes: {
    component: React.PropTypes.any,
    animation: React.PropTypes.object,
    transitionName: React.PropTypes.string,
    transitionEnter: React.PropTypes.bool,
    transitionAppear: React.PropTypes.bool,
    transitionLeave: React.PropTypes.bool,
    onEnd: React.PropTypes.func,
    onEnter: React.PropTypes.func,
    onLeave: React.PropTypes.func,
    onAppear: React.PropTypes.func,
    showProp: React.PropTypes.string,
  },

  getDefaultProps() {
    return {
      animation: {},
      component: 'span',
      transitionEnter: true,
      transitionLeave: true,
      transitionAppear: false,
      onEnd: noop,
      onEnter: noop,
      onLeave: noop,
      onAppear: noop,
    };
  },

  getInitialState() {
    this.currentlyAnimatingKeys = {};
    this.keysToEnter = [];
    this.keysToLeave = [];
    return {
      children: toArrayChildren(getChildrenFromProps(this.props)),
    };
  },

  componentDidMount() {
    const showProp = this.props.showProp;
    let children = this.state.children;
    if (showProp) {
      children = children.filter((c)=> {
        return !!c.props[showProp];
      });
    }
    children.forEach((c) => {
      this.performAppear(c.key);
    });
  },

  componentWillReceiveProps(nextProps) {
    const nextChildren = toArrayChildren(getChildrenFromProps(nextProps));
    const props = this.props;
    const showProp = props.showProp;
    const exclusive = props.exclusive;
    const currentlyAnimatingKeys = this.currentlyAnimatingKeys;
    // last props children if exclusive
    // exclusive needs immediate response
    let currentChildren = this.state.children;
    let newChildren = ChildrenUtils.mergeChildren(
      currentChildren,
      nextChildren
    );

    if (showProp && !exclusive) {
      newChildren = newChildren.map((c) => {
        let ret = c;
        if (!c.props[showProp] && isShownInChildren(currentChildren, c, showProp)) {
          ret = React.cloneElement(c, {
            [showProp]: true,
          });
        }
        return ret;
      });
    }

    this.setState({
      children: newChildren,
    });

    // exclusive needs immediate response
    if (exclusive) {
      Object.keys(currentlyAnimatingKeys).forEach((key) => {
        this.stop(key);
      });
      currentChildren = toArrayChildren(getChildrenFromProps(props));
    }

    nextChildren.forEach((c)=> {
      const key = c.key;
      if (currentlyAnimatingKeys[key]) {
        return;
      }
      const hasPrev = inChildren(currentChildren, c);
      if (showProp) {
        if (hasPrev) {
          const showInNow = isShownInChildren(currentChildren, c, showProp);
          const showInNext = c.props[showProp];
          if (!showInNow && showInNext) {
            this.keysToEnter.push(key);
          }
        }
      } else if (!hasPrev) {
        this.keysToEnter.push(key);
      }
    });

    currentChildren.forEach((c)=> {
      const key = c.key;
      if (currentlyAnimatingKeys[key]) {
        return;
      }
      const hasNext = inChildren(nextChildren, c);
      if (showProp) {
        if (hasNext) {
          const showInNext = isShownInChildren(nextChildren, c, showProp);
          const showInNow = c.props[showProp];
          if (!showInNext && showInNow) {
            this.keysToLeave.push(key);
          }
        }
      } else if (!hasNext) {
        this.keysToLeave.push(key);
      }
    });
  },

  componentDidUpdate() {
    const keysToEnter = this.keysToEnter;
    this.keysToEnter = [];
    keysToEnter.forEach(this.performEnter);
    const keysToLeave = this.keysToLeave;
    this.keysToLeave = [];
    keysToLeave.forEach(this.performLeave);
  },

  render() {
    const props = this.props;
    const children = this.state.children.map((child) => {
      if (!child.key) {
        throw new Error('must set key for <rc-animate> children');
      }
      return (<AnimateChild
        key={child.key}
        ref={child.key}
        animation={props.animation}
        transitionName={props.transitionName}
        transitionEnter={props.transitionEnter}
        transitionAppear={props.transitionAppear}
        transitionLeave={props.transitionLeave}>
        {child}
      </AnimateChild>);
    });
    const Component = props.component;
    if (Component) {
      return <Component {...this.props}>{children}</Component>;
    }
    return children[0] || null;
  },

  performEnter(key) {
    // may already remove by exclusive
    if (this.refs[key]) {
      this.currentlyAnimatingKeys[key] = true;
      this.refs[key].componentWillEnter(
        this.handleDoneAdding.bind(this, key, 'enter')
      );
    }
  },

  performAppear(key) {
    if (this.refs[key]) {
      this.currentlyAnimatingKeys[key] = true;
      this.refs[key].componentWillAppear(
        this.handleDoneAdding.bind(this, key, 'appear')
      );
    }
  },

  handleDoneAdding(key, type) {
    const props = this.props;
    delete this.currentlyAnimatingKeys[key];
    const currentChildren = toArrayChildren(getChildrenFromProps(props));
    if (!this.isValidChildByKey(currentChildren, key)) {
      // exclusive will not need this
      this.performLeave(key);
    } else {
      if (type === 'appear') {
        if (animUtil.isAppearSupported(props)) {
          props.onAppear(key);
          props.onEnd(key, true);
        }
      } else {
        if (animUtil.isEnterSupported(props)) {
          props.onEnter(key);
          props.onEnd(key, true);
        }
      }
      if (this.isMounted() && !isSameChildren(this.state.children, currentChildren)) {
        this.setState({
          children: currentChildren,
        });
      }
    }
  },

  performLeave(key) {
    // may already remove by exclusive
    if (this.refs[key]) {
      this.currentlyAnimatingKeys[key] = true;
      this.refs[key].componentWillLeave(this.handleDoneLeaving.bind(this, key));
    }
  },


  handleDoneLeaving(key) {
    const props = this.props;
    delete this.currentlyAnimatingKeys[key];
    const currentChildren = toArrayChildren(getChildrenFromProps(props));
    // in case state change is too fast
    if (this.isValidChildByKey(currentChildren, key)) {
      this.performEnter(key);
    } else {
      if (animUtil.isLeaveSupported(props)) {
        props.onLeave(key);
        props.onEnd(key, false);
      }
      if (this.isMounted() && !isSameChildren(this.state.children, currentChildren)) {
        this.setState({
          children: currentChildren,
        });
      }
    }
  },

  isValidChildByKey(currentChildren, key) {
    const showProp = this.props.showProp;
    if (showProp) {
      return isShownInChildrenByKey(currentChildren, key, showProp);
    }
    return inChildrenByKey(currentChildren, key);
  },

  stop(key) {
    delete this.currentlyAnimatingKeys[key];
    const component = this.refs[key];
    if (component) {
      component.stop();
    }
  },
});

export default Animate;
