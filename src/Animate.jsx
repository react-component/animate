import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';

import AnimateChild from './AnimateChild';
import { cloneProps, mergeChildren } from './util';

const defaultKey = `rc_animate_${Date.now()}`;
const clonePropList = ['children'];

class Animate extends React.Component {
  // [Legacy] Not sure usage
  // commit: https://github.com/react-component/animate/commit/0a1cbfd647407498b10a8c6602a2dea80b42e324
  static isAnimate = true; // eslint-disable-line

  static propTypes = {
    component: PropTypes.any,
    componentProps: PropTypes.object,
    animation: PropTypes.object,
    transitionName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    transitionEnter: PropTypes.bool,
    transitionAppear: PropTypes.bool,
    exclusive: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    onEnd: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
    onAppear: PropTypes.func,
    showProp: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    className: PropTypes.string,
  }

  static defaultProps = {
    animation: {},
    component: 'span',
    componentProps: {},
    transitionEnter: true,
    transitionLeave: true,
    transitionAppear: false,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const newState = {
      prevProps: cloneProps(nextProps, clonePropList),
    };

    function processState(propName, updater) {
      if (prevProps[propName] !== nextProps[propName]) {
        updater(nextProps[propName]);
        return true;
      }
      return false;
    }

    processState('children', (children) => {
      const prevChildren = prevState.children;
      newState.children = (React.Children.toArray(children) || [])
        .filter(node => node);

      // Merge prev children to keep the animation
      newState.children = mergeChildren(prevChildren, newState.children);
      console.log('children update:', newState);
    });

    return newState;
  }

  state = {
    appeared: true,
    children: [],
  };

  componentDidMount() {
    // Next animation update will not rigger appear
    setTimeout(() => {
      this.setState({ appeared: false });
    });
  }

  render() {
    const { appeared, children } = this.state;
    const {
      component: Component, componentProps,
      className, style, showProp,
    } = this.props;


    const $children = children.map((node) => {
      if (children.length > 1 && !node.key) {
        throw new Error('must set key for <rc-animate> children');
      }

      const show = showProp ? node.props[showProp] : true;

      return (
        <AnimateChild
          {...this.props}
          appeared={appeared}
          show={show}
          className={node.props.className}
          style={node.props.style}
          key={node.key || defaultKey}
        >
          {node}
        </AnimateChild>
      );
    });

    // Wrap with component
    if (Component) {
      let passedProps = this.props;
      if (typeof Component === 'string') {
        passedProps = {
          className,
          style,
          ...componentProps,
        };
      }

      return (
        <Component {...passedProps}>
          {$children}
        </Component>
      );
    }

    return $children[0] || null;
  }
}

polyfill(Animate);

export default Animate;