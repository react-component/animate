import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import classes from 'component-classes';
import raf from 'raf';

import {
  cloneProps, getTransitionName,
  supportTransition, animationEndName, transitionEndName,
} from './util';

const clonePropList = [
  'appeared',
  'show',
  'exclusive',
  'children',
  'animation',
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
    animation: PropTypes.object,
    onChildLeaved: PropTypes.func,

    onEnd: PropTypes.func,
    onAppear: PropTypes.func,
    onEnter: PropTypes.func,
    onLeave: PropTypes.func,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { prevProps = {} } = prevState;
    const { appeared } = nextProps;

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

    function pushEvent(eventType) {
      newState.eventQueue = newState.eventQueue || prevState.eventQueue;
      newState.eventQueue.push(eventType);
    }

    // Child update. Only set child.
    processState('children', (child) => {
      newState.child = child;
    });

    processState('appeared', (isAppeared) => {
      if (isAppeared) {
        pushEvent('appear');
      }
    });

    // Show update
    processState('show', (show) => {
      if (!appeared) {
        if (show) {
          pushEvent('enter');
        } else {
          pushEvent('leave');
        }
      }
    });

    // exclusive
    processState('exclusive', (isExclusive) => {
      if (isExclusive) {
        // TODO: clean the queue
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

    this.currentEvent = null;
  }

  state = {
    child: null,

    eventQueue: [],
    eventActive: false,
  }

  componentDidMount() {
    this.onDomUpdated({}, {});
  }

  componentDidUpdate(prevProps, prevState) {
    this.onDomUpdated(prevProps, prevState);
  }

  componentWillUnmount() {
    this._destroy = true;
    this.cleanDomEvent();
  }

  onDomUpdated = () => {
    const { eventActive } = this.state;
    const {
      transitionName, animation,
    } = this.props;

    const $ele = ReactDOM.findDOMNode(this);

    // Skip if dom element not ready
    if (!$ele) return;

    // [Legacy] Add animation/transition event by dom level
    if (supportTransition && this.$prevEle !== $ele) {
      this.cleanDomEvent();

      this.$prevEle = $ele;
      this.$prevEle.addEventListener(animationEndName, this.onMotionEnd);
      this.$prevEle.addEventListener(transitionEndName, this.onMotionEnd);
    }

    const currentEvent = this.getCurrentEvent();
    if (!currentEvent) return;

    const { eventType } = currentEvent;

    // [Legacy] Since origin code use js to set `className`.
    // This caused that any component without support `className` can be forced set.
    // Let's keep the logic.
    function legacyAppendClass() {
      if (!supportTransition) return;

      const nodeClasses = classes($ele);
      const basicClassName = getTransitionName(transitionName, eventType);
      if (basicClassName) nodeClasses.add(basicClassName);

      if (eventActive) {
        const activeClassName = getTransitionName(transitionName, `${eventType}-active`);
        if (activeClassName) nodeClasses.add(activeClassName);
      }

    }

    if (this.currentEvent && this.currentEvent.type === eventType) {
      legacyAppendClass();
      return;
    }

    // Clean up last event environment
    if (this.currentEvent && this.currentEvent.animateObj && this.currentEvent.animateObj.stop) {
      this.currentEvent.animateObj.stop();
    }

    // New event come
    this.currentEvent = {
      type: eventType,
    };

    const animationHandler = (animation || {})[eventType];
    // =============== Check if has customize animation ===============
    if (animationHandler) {
      this.currentEvent.animateObj = animationHandler($ele, () => {
        this.onMotionEnd({ target: $ele });
      });

    // ==================== Use transition instead ====================
    } else if (supportTransition) {
      legacyAppendClass();
      if (!eventActive) {
        // Trigger `eventActive` in next frame
        raf(() => {
          if (this.currentEvent && this.currentEvent.type === eventType) {
            this.setState({ eventActive: true });
          }
        });
      }

    // ======================= Just next action =======================
    } else {
      this.onMotionEnd({ target: $ele });
    }
  }

  onMotionEnd = ({ target }) => {
    const {
      transitionName, onChildLeaved, animateKey,
      onAppear, onEnter, onLeave, onEnd,
    } = this.props;
    const currentEvent = this.getCurrentEvent();
    if (!currentEvent) return;

    const { restQueue } = currentEvent;

    const $ele = ReactDOM.findDOMNode(this);
    if (!this.currentEvent || $ele !== target) return;

    if (this.currentEvent.animateObj && this.currentEvent.animateObj.stop) {
      this.currentEvent.animateObj.stop();
    }

    // [Legacy] Same as above, we need call js to remove the class
    if (supportTransition) {
      const basicClassName = getTransitionName(transitionName, this.currentEvent.type);
      const activeClassName = getTransitionName(transitionName, `${this.currentEvent.type}-active`);

      const nodeClasses = classes($ele);
      if (basicClassName) nodeClasses.remove(basicClassName);
      if (activeClassName) nodeClasses.remove(activeClassName);
    }

    // Additional process the leave event
    if (this.currentEvent.type === 'leave') {
      onChildLeaved(animateKey);
    }

    // [Legacy] Trigger on event when it's last event
    if (!restQueue.length) {
      if (this.currentEvent.type === 'appear' && onAppear) {
        onAppear(animateKey);
      } else if (this.currentEvent.type === 'enter' && onEnd) {
        onEnter(animateKey);
      } else if (this.currentEvent.type === 'leave' && onLeave) {
        onLeave(animateKey);
      }

      if (onEnd) {
        // OnEnd(key, isShow)
        onEnd(animateKey, this.currentEvent.type !== 'leave');
      }
    }

    this.currentEvent = null;

    // Next queue
    if (!this._destroy) {
      this.setState({
        eventQueue: restQueue,
        eventActive: false,
      });
    }
  };

  getCurrentEvent = () => {
    const { eventQueue = [] } = this.state;
    const {
      animation, exclusive,
      transitionAppear, transitionEnter, transitionLeave,
    } = this.props;

    function hasEventHandler(eventType) {
      return (eventType === 'appear' && (transitionAppear || animation.appear)) ||
        (eventType === 'enter' && (transitionEnter || animation.enter)) ||
        (eventType === 'leave' && (transitionLeave || animation.leave));
    }

    // If is exclusive, only check the last event
    if (exclusive) {
      const eventType = eventQueue[eventQueue.length - 1];
      if (hasEventHandler(eventType)) {
        return {
          eventType,
          restQueue: [],
        };
      }
      return null;
    }

    // Loop check the queue until find match
    let cloneQueue = eventQueue.slice();
    while (cloneQueue.length) {
      const [eventType, ...restQueue] = cloneQueue;
      if (hasEventHandler(eventType)) {
        return {
          eventType,
          restQueue,
        }
      }
      cloneQueue = restQueue;
    }

    return null;
  };

  cleanDomEvent = () => {
    if (this.$prevEle && supportTransition) {
      this.$prevEle.removeEventListener(animationEndName, this.onMotionEnd);
      this.$prevEle.removeEventListener(transitionEndName, this.onMotionEnd);
    }
  };

  render() {
    const { child, eventActive } = this.state;
    const { showProp, transitionName } = this.props;
    const { className } = child.props || {};

    // Class name
    const connectClassName = (supportTransition && this.currentEvent) ? classNames(
      className,
      getTransitionName(transitionName, this.currentEvent.type),
      eventActive && getTransitionName(transitionName, `${this.currentEvent.type}-active`),
    ) : className;

    let show = true;

    // Keep show when is in transition or has customize animate
    if (supportTransition && this.currentEvent) {
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