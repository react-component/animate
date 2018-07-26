import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import raf from 'raf';
import {
  getTransitionName,
  animationEndName, transitionEndName,
} from './util';

const STATUS_NONE = 'none';
const STATUS_APPEAR = 'appear';
const STATUS_APPEAR_ACTIVE = 'appear-active';
const STATUS_ENTER = 'enter';
const STATUS_ENTER_ACTIVE = 'enter-active';
const STATUS_LEAVE = 'leave';
const STATUS_LEAVE_ACTIVE = 'leave-active';

class CSSTransition extends React.Component {
  static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.func,
    transitionName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    transitionAppear: PropTypes.bool,
    transitionEnter: PropTypes.bool,
    transitionLeave: PropTypes.bool,
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

  static defaultProps = {
    transitionEnter: true,
    transitionAppear: true,
    transitionLeave: true,
  };

  constructor() {
    super();

    this.state = {
      status: STATUS_NONE,
      newStatus: false,
      statusStyle: null,
    };
    this.$ele = null;
  }

  static getDerivedStateFromProps(props, { prevProps }) {
    const { visible, transitionAppear, transitionEnter, transitionLeave } = props;
    const newState = {
      prevProps: props,
    };

    // Appear
    if (!prevProps && visible && transitionAppear) {
      newState.status = STATUS_APPEAR;
      newState.newStatus = true;
    }

    // Enter
    if (prevProps && !prevProps.visible && visible && transitionEnter) {
      newState.status = STATUS_ENTER;
      newState.newStatus = true;
    }

    // Leave
    if (prevProps && prevProps.visible && !visible && transitionLeave) {
      newState.status = STATUS_LEAVE;
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
    this.removeEventListener(this.$ele);
  }

  onDomUpdate = () => {
    const { status, newStatus } = this.state;
    const {
      onAppearStart, onEnterStart, onLeaveStart,
      onAppearActive, onEnterActive, onLeaveActive,
      transitionAppear, transitionEnter, transitionLeave,
    } = this.props;

    // Event injection
    const $ele = ReactDOM.findDOMNode(this);
    if (this.$ele !== $ele) {
      this.removeEventListener(this.$ele);
      this.addEventListener($ele);
      this.$ele = $ele;
    }

    // Init status
    if (newStatus && status === STATUS_APPEAR && transitionAppear) {
      this.updateStatus(onAppearStart);
    } else if (newStatus && status === STATUS_ENTER && transitionEnter) {
      this.updateStatus(onEnterStart);
    } else if (newStatus && status === STATUS_LEAVE && transitionLeave) {
      this.updateStatus(onLeaveStart);
    }

    // To be active
    if (!newStatus && status === STATUS_APPEAR && transitionAppear) {
      this.asyncUpdateStatus(onAppearActive, STATUS_APPEAR, STATUS_APPEAR_ACTIVE);
    } else if (!newStatus && status === STATUS_ENTER && transitionEnter) {
      this.asyncUpdateStatus(onEnterActive, STATUS_ENTER, STATUS_ENTER_ACTIVE);
    } else if (!newStatus && status === STATUS_LEAVE && transitionLeave) {
      this.asyncUpdateStatus(onLeaveActive, STATUS_LEAVE, STATUS_LEAVE_ACTIVE);
    }
  };

  onAnimationEnd = (event) => {
    this.onMotionEnd(event);
  };

  onTransitionEnd = (event) => {
    this.onMotionEnd(event);
  };

  onMotionEnd = (event) => {
    const { status } = this.state;
    const { onAppearEnd, onEnterEnd, onLeaveEnd } = this.props;
    if (status === STATUS_APPEAR_ACTIVE) {
      this.updateStatus(onAppearEnd, { status: STATUS_NONE }, event);
    } else if (status === STATUS_ENTER_ACTIVE) {
      this.updateStatus(onEnterEnd, { status: STATUS_NONE }, event);
    } else if (status === STATUS_LEAVE_ACTIVE) {
      this.updateStatus(onLeaveEnd, { status: STATUS_NONE }, event);
    }
  };

  addEventListener = ($ele) => {
    if (!$ele) return;

    $ele.addEventListener(transitionEndName, this.onTransitionEnd);
    $ele.addEventListener(animationEndName, this.onAnimationEnd);
  };
  removeEventListener = ($ele) => {
    if (!$ele) return;

    $ele.removeEventListener(transitionEndName, this.onTransitionEnd);
    $ele.removeEventListener(animationEndName, this.onAnimationEnd);
  };

  updateStatus = (styleFunc, additionalState, event) => {
    const statusStyle = styleFunc ? styleFunc(ReactDOM.findDOMNode(this), event) : null;

    if (statusStyle === false) return;

    this.setState({
      statusStyle,
      newStatus: false,
      ...additionalState,
    });
  };

  asyncUpdateStatus = (styleFunc, fromStatus, toStatus) => {
    raf(() => {
      const { status } = this.state;
      if (status !== fromStatus) return;

      this.updateStatus(styleFunc, { status: toStatus });
    });
  };

  render() {
    const { status, statusStyle } = this.state;
    const { children, transitionName, visible } = this.props;

    if (!children) return null;

    if (status === STATUS_NONE) {
      return visible ? children({}) : null;
    }

    return children({
      className: classNames({
        [getTransitionName(transitionName, status)]: status !== STATUS_NONE,
        [transitionName]: typeof transitionName === 'string',
      }),
      style: statusStyle,
    });
  }
}

polyfill(CSSTransition);

export default CSSTransition;
