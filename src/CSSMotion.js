/* eslint-disable react/default-props-match-prop-types, react/no-multi-comp */
import React from 'react';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import findDOMNode from 'rc-util/lib/Dom/findDOMNode';
import classNames from 'classnames';
import raf from 'raf';
import {
  getTransitionName,
  animationEndName, transitionEndName,
  supportTransition,
} from './util/motion';

const STATUS_NONE = 'none';
const STATUS_APPEAR = 'appear';
const STATUS_ENTER = 'enter';
const STATUS_LEAVE = 'leave';

export const MotionPropTypes = {
  eventProps: PropTypes.object, // Internal usage. Only pass by CSSMotionList
  visible: PropTypes.bool,
  children: PropTypes.func,
  motionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  motionAppear: PropTypes.bool,
  motionEnter: PropTypes.bool,
  motionLeave: PropTypes.bool,
  motionLeaveImmediately: PropTypes.bool, // Trigger leave motion immediately
  removeOnLeave: PropTypes.bool,
  leavedClassName: PropTypes.string,
  onAppearStart: PropTypes.func,
  onAppearActive: PropTypes.func,
  onAppearEnd: PropTypes.func,
  onEnterStart: PropTypes.func,
  onEnterActive: PropTypes.func,
  onEnterEnd: PropTypes.func,
  onLeaveStart: PropTypes.func,
  onLeaveActive: PropTypes.func,
  onLeaveEnd: PropTypes.func,
};

/**
 * `transitionSupport` is used for none transition test case.
 * Default we use browser transition event support check.
 */
export function genCSSMotion(config) {
  let transitionSupport;
  let forwardRef = !!React.forwardRef;

  if (typeof config === 'object') {
    transitionSupport = config.transitionSupport;
    forwardRef = 'forwardRef' in config ? config.forwardRef : forwardRef;
  }

  function isSupportTransition(props) {
    return !!(props.motionName && transitionSupport);
  }

  class CSSMotion extends React.Component {
    static propTypes = {
      ...MotionPropTypes,
      
      internalRef: PropTypes.oneOfType([
        PropTypes.object, PropTypes.func
      ]),
    };

    static defaultProps = {
      visible: true,
      motionEnter: true,
      motionAppear: true,
      motionLeave: true,
      removeOnLeave: true,
    };

    constructor() {
      super();

      this.state = {
        status: STATUS_NONE,
        statusActive: false,
        newStatus: false,
        statusStyle: null,
      };
      this.$cacheEle = null;
      this.node = null;
      this.raf = null;
    }

    static getDerivedStateFromProps(props, { prevProps }) {
      if (!isSupportTransition(props)) return {};

      const {
        visible, motionAppear, motionEnter, motionLeave,
        motionLeaveImmediately,
      } = props;
      const newState = {
        prevProps: props,
      };

      // Appear
      if (!prevProps && visible && motionAppear) {
        newState.status = STATUS_APPEAR;
        newState.statusActive = false;
        newState.newStatus = true;
      }

      // Enter
      if (prevProps && !prevProps.visible && visible && motionEnter) {
        newState.status = STATUS_ENTER;
        newState.statusActive = false;
        newState.newStatus = true;
      }

      // Leave
      if (
        (prevProps && prevProps.visible && !visible && motionLeave) ||
        (!prevProps && motionLeaveImmediately && !visible && motionLeave)
      ) {
        newState.status = STATUS_LEAVE;
        newState.statusActive = false;
        newState.newStatus = true;
      }

      return newState;
    };

    componentDidMount() {
      this.onDomUpdate();
    }

    componentDidUpdate() {
      this.onDomUpdate();
    }

    componentWillUnmount() {
      this._destroyed = true;
      this.removeEventListener(this.$cacheEle);
      this.cancelNextFrame();
    }

    onDomUpdate = () => {
      const { status, newStatus } = this.state;
      const {
        onAppearStart, onEnterStart, onLeaveStart,
        onAppearActive, onEnterActive, onLeaveActive,
        motionAppear, motionEnter, motionLeave,
      } = this.props;

      if (!isSupportTransition(this.props)) {
        return;
      }

      // Event injection
      const $ele = this.getElement();
      if (this.$cacheEle !== $ele) {
        this.removeEventListener(this.$cacheEle);
        this.addEventListener($ele);
        this.$cacheEle = $ele;
      }

      // Init status
      if (newStatus && status === STATUS_APPEAR && motionAppear) {
        this.updateStatus(onAppearStart, null, null, () => {
          this.updateActiveStatus(onAppearActive, STATUS_APPEAR);
        });
      } else if (newStatus && status === STATUS_ENTER && motionEnter) {
        this.updateStatus(onEnterStart, null, null, () => {
          this.updateActiveStatus(onEnterActive, STATUS_ENTER);
        });
      } else if (newStatus && status === STATUS_LEAVE && motionLeave) {
        this.updateStatus(onLeaveStart, null, null, () => {
          this.updateActiveStatus(onLeaveActive, STATUS_LEAVE);
        });
      }
    };

    onMotionEnd = (event) => {
      const { status, statusActive } = this.state;
      const { onAppearEnd, onEnterEnd, onLeaveEnd } = this.props;
      if (status === STATUS_APPEAR && statusActive) {
        this.updateStatus(onAppearEnd, { status: STATUS_NONE }, event);
      } else if (status === STATUS_ENTER && statusActive) {
        this.updateStatus(onEnterEnd, { status: STATUS_NONE }, event);
      } else if (status === STATUS_LEAVE && statusActive) {
        this.updateStatus(onLeaveEnd, { status: STATUS_NONE }, event);
      }
    };

    setNodeRef = (node) => {
      const { internalRef } = this.props;
      this.node = node;

      if (typeof internalRef === 'function') {
        internalRef(node);
      } else if ('current' in internalRef) {
        internalRef.current = node;
      }
    };

    getElement = () => {
      return findDOMNode(this.node || this);
    };

    addEventListener = ($ele) => {
      if (!$ele) return;

      $ele.addEventListener(transitionEndName, this.onMotionEnd);
      $ele.addEventListener(animationEndName, this.onMotionEnd);
    };
    removeEventListener = ($ele) => {
      if (!$ele) return;

      $ele.removeEventListener(transitionEndName, this.onMotionEnd);
      $ele.removeEventListener(animationEndName, this.onMotionEnd);
    };

    updateStatus = (styleFunc, additionalState, event, callback) => {
      const statusStyle = styleFunc ? styleFunc(this.getElement(), event) : null;

      if (statusStyle === false || this._destroyed) return;

      let nextStep;
      if (callback) {
        nextStep = () => {
          this.nextFrame(callback);
        };
      }

      this.setState({
        statusStyle: typeof statusStyle === 'object' ? statusStyle : null,
        newStatus: false,
        ...additionalState,
      }, nextStep); // Trigger before next frame & after `componentDidMount`
    };

    updateActiveStatus = (styleFunc, currentStatus) => {
      // `setState` use `postMessage` to trigger at the end of frame.
      // Let's use requestAnimationFrame to update new state in next frame.
      this.nextFrame(() => {
        const { status } = this.state;
        if (status !== currentStatus) return;

        this.updateStatus(styleFunc, { statusActive: true });
      });
    };

    nextFrame = (func) => {
      this.cancelNextFrame();
      this.raf = raf(func);
    };

    cancelNextFrame = () => {
      if (this.raf) {
        raf.cancel(this.raf);
        this.raf = null;
      }
    };

    render() {
      const { status, statusActive, statusStyle } = this.state;
      const { children, motionName, visible, removeOnLeave, leavedClassName, eventProps } = this.props;

      if (!children) return null;

      if (status === STATUS_NONE || !isSupportTransition(this.props)) {
        if (visible) {
          return children({ ...eventProps }, this.setNodeRef);
        } else if (!removeOnLeave) {
          return children({ ...eventProps, className: leavedClassName }, this.setNodeRef);
        }

        return null;
      }

      return children({
        ...eventProps,
        className: classNames({
          [getTransitionName(motionName, status)]: status !== STATUS_NONE,
          [getTransitionName(motionName, `${status}-active`)]: status !== STATUS_NONE && statusActive,
          [motionName]: typeof motionName === 'string',
        }),
        style: statusStyle,
      }, this.setNodeRef);
    }
  }

  polyfill(CSSMotion);

  if (!forwardRef) {
    return CSSMotion;
  }

  return React.forwardRef((props, ref) => <CSSMotion internalRef={ref} {...props} />);
}

export default genCSSMotion(supportTransition);