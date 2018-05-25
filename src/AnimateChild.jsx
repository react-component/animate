import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import classes from 'component-classes';

import {
  cloneProps, getTransitionName,
  supportTransition, animationEndName, transitionEndName,
} from './util';

const clonePropList = [
  'appeared',
  'show',
  'exclusive',
  'children',
];

/**
 * AnimateChild only accept one child node.
 */

class AnimateChild extends React.Component {
  static propTypes = {
    transitionName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]),
    transitionAppear: PropTypes.bool,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
    exclusive: PropTypes.bool,
    appeared: PropTypes.bool,
    showProp: PropTypes.string,

    animateKey: PropTypes.any,
    onChildLeaved: PropTypes.func,

    // Customize event handler
    onChildAppear: PropTypes.func,
    onChildEnter: PropTypes.func,
    onChildLeave: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const {
      transitionName, transitionAppear, transitionEnter, transitionLeave,
      exclusive, appeared,
    } = nextProps;

    const newState = {
      prevProps: cloneProps(nextProps, clonePropList),
    };

    function processState(propName, updater) {
      if (prevProps[propName] !== nextProps[propName]) {
        if (updater) {
          updater(nextProps[propName]);
        }
        return true;
      }
      return false;
    }

    function pushTransition(transition) {
      newState.transitionQueue = newState.transitionQueue || prevState.transitionQueue;
      if (exclusive) {
        newState.transitionQueue = [transition];
        newState.transitionActive = false;

        newState.currentTransitionHandler = null
      } else {
        newState.transitionQueue.push(transition);
      }
    }

    // Child update. Only set child.
    processState('children', (child) => {
      newState.child = child;
    });

    processState('appeared', (isAppeared) => {
      if (isAppeared && transitionAppear) {
        pushTransition({
          type: 'appear',
          basic: getTransitionName(transitionName, 'appear'),
          active: getTransitionName(transitionName, 'appear-active'),
        });
      }
    });

    // Show update
    processState('show', (show) => {
      if (!appeared && show && transitionEnter) {
        pushTransition({
          type: 'enter',
          basic: getTransitionName(transitionName, 'enter'),
          active: getTransitionName(transitionName, 'enter-active'),
        });
      } else if (!appeared && !show && transitionLeave) {
        if (!supportTransition || !transitionLeave) {
          // Call leave directly if not support or not set leave
          nextProps.onChildLeaved(nextProps.animateKey);
        } else {
          pushTransition({
            type: 'leave',
            basic: getTransitionName(transitionName, 'leave'),
            active: getTransitionName(transitionName, 'leave-active'),
          });
        }
      }
    });

    // exclusive
    processState('exclusive', (isExclusive) => {
      if (supportTransition && isExclusive) {
        const transitionQueue = newState.transitionQueue || prevState.transitionQueue;
        newState.transitionQueue = transitionQueue.slice(-1);
        if (transitionQueue.length !== 1) {
          newState.transitionActive = false;
        }
      }
    });

    return newState;
  }

  constructor() {
    super();

    // [Legacy] Since old code addListener on the element.
    // To avoid break the behaviour that component not handle animation/transition
    // also can handle the animate, let keep the logic.
    this.$prevEle = null;

    // Keep the current transition
    this.currentTransition = null;
  }

  state = {
    child: null,
    transitionQueue: [],
    transitionActive: false,

    // Customize animation handler
    currentTransitionHandler: null,
  }

  componentDidMount() {
    this.onDomUpdated({}, {});
  }

  componentDidUpdate(prevProps, prevState) {
    this.onDomUpdated(prevProps, prevState);
  }

  componentWillUnmount() {
    this.cleanDomEvent();
  }

  onDomUpdated = (prevProps, prevState) => {
    const { transitionQueue, transitionActive, currentTransitionHandler } = this.state;
    const { animateKey, onChildAppear, onChildEnter, onChildLeave } = this.props;

    const transition = transitionQueue[0];

    const $ele = ReactDOM.findDOMNode(this);

    // Clean up if currentTransitionHandler set to null
    if (
      prevState.currentTransitionHandler &&
      prevState.currentTransitionHandler !== currentTransitionHandler
    ) {
      prevState.currentTransitionHandler.stop();
    }

    if (transition && $ele) {
      // [Legacy] Since origin code use js to set `className`.
      // This caused that any component without support `className` can be forced set.
      // Let's keep the logic.
      const nodeClasses = classes($ele);
      nodeClasses.add(transition.basic);

      if (transitionActive) {
        nodeClasses.add(transition.active);
      }

      // [Legacy] Add animation/transition event by dom level
      if (supportTransition && this.$prevEle !== $ele) {
        this.cleanDomEvent();

        this.$prevEle = $ele;
        this.$prevEle.addEventListener(animationEndName, this.onMotionEnd);
        this.$prevEle.addEventListener(transitionEndName, this.onMotionEnd);
      }

      // Check if transition update
      let hasHandler = false;
      if (this.currentTransition !== transition) {
        this.currentTransition = transition;

        // Trigger customize animation
        const mapAnimation = (type, func) => {
          if (transition.type === type && func) {
            const handler = func(animateKey, $ele, () => {
              this.onMotionEnd({ target: $ele });
            });
            if (handler) {
              this.setState({
                currentTransitionHandler: handler,
              });
              hasHandler = true;
            }
          }
        };

        mapAnimation('appear', onChildAppear);
        mapAnimation('enter', onChildEnter);
        mapAnimation('leave', onChildLeave);
      }

      // Update transition active class
      if (!transitionActive) {
        // requestAnimationFrame not support in IE 9-
        // Use setTimeout instead
        setTimeout(() => {
          this.setState({transitionActive: true});
        }, 0);
      }

      // Call onMotionEnd directly
      if (!supportTransition && !hasHandler) {
        this.onMotionEnd({ target: $ele });
      }
    }
  };

  onMotionEnd = ({ target }) => {
    const { transitionQueue } = this.state;
    if (!transitionQueue.length) return;

    const $ele = ReactDOM.findDOMNode(this);
    if ($ele === target) {
      const { onChildLeaved, animateKey } = this.props;
      const transition = transitionQueue[0];

      // Update transition queue
      this.setState({
        transitionQueue: transitionQueue.slice(1),
        currentTransitionHandler: null,
      });

      // [Legacy] Same as above, we need call js to remove the class
      if (transition) {
        const nodeClasses = classes($ele);
        nodeClasses.remove(transition.basic);
        nodeClasses.remove(transition.active);
      }

      // Trigger parent event
      if (transition.type === 'leave') {
        onChildLeaved(animateKey);
      }
    }
  }

  cleanDomEvent = () => {
    if (this.$prevEle && supportTransition) {
      this.$prevEle.removeEventListener(animationEndName, this.onMotionEnd);
      this.$prevEle.removeEventListener(transitionEndName, this.onMotionEnd);
    }
  };

  render() {
    const { child, transitionQueue, transitionActive } = this.state;
    const { showProp } = this.props;
    const { className } = child.props || {};

    // Class name
    const transition = transitionQueue[0];
    const connectClassName = (supportTransition && transition) ? classNames(
      className,
      transition.basic,
      transitionActive && transition.active,
    ) : className;

    let show = true;
    if (supportTransition && transition) {
      show = true;
    } else {
      show = child.props[showProp];
    }

    // Clone child
    const newChildProps = {
      className: connectClassName,
    };

    if (showProp) {
      newChildProps[showProp] = show;
    }

    return React.cloneElement(child, newChildProps);
  }
}

polyfill(AnimateChild);

export default AnimateChild;