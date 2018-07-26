import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import raf from 'raf';
import {
  getTransitionName,
  animationEndName, transitionEndName,
  supportTransition,
} from './util';

const STATUS_NONE = 'none';
const STATUS_APPEAR = 'appear';
const STATUS_ENTER = 'enter';
const STATUS_LEAVE = 'leave';

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
      statusActive: false,
      newStatus: false,
      statusStyle: null,
    };
    this.$ele = null;
  }

  static getDerivedStateFromProps(props, { prevProps }) {
    if (!supportTransition) return {};

    const { visible, transitionAppear, transitionEnter, transitionLeave } = props;
    const newState = {
      prevProps: props,
    };

    // Appear
    if (!prevProps && visible && transitionAppear) {
      newState.status = STATUS_APPEAR;
      newState.statusActive = false;
      newState.newStatus = true;
    }

    // Enter
    if (prevProps && !prevProps.visible && visible && transitionEnter) {
      newState.status = STATUS_ENTER;
      newState.statusActive = false;
      newState.newStatus = true;
    }

    // Leave
    if (prevProps && prevProps.visible && !visible && transitionLeave) {
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
    this.removeEventListener(this.$ele);
  }

  onDomUpdate = () => {
    const { status, newStatus } = this.state;
    const {
      onAppearStart, onEnterStart, onLeaveStart,
      onAppearActive, onEnterActive, onLeaveActive,
      transitionAppear, transitionEnter, transitionLeave,
    } = this.props;

    if (!supportTransition) {
      return;
    }

    // Event injection
    const $ele = ReactDOM.findDOMNode(this);
    if (this.$ele !== $ele) {
      this.removeEventListener(this.$ele);
      this.addEventListener($ele);
      this.$ele = $ele;
    }

    // Init status
    if (newStatus && status === STATUS_APPEAR && transitionAppear) {
      this.updateStatus(onAppearStart).then(() => {
        this.updateActiveStatus(onAppearActive, STATUS_APPEAR);
      });
    } else if (newStatus && status === STATUS_ENTER && transitionEnter) {
      this.updateStatus(onEnterStart).then(() => {
        this.updateActiveStatus(onEnterActive, STATUS_ENTER);
      });
    } else if (newStatus && status === STATUS_LEAVE && transitionLeave) {
      this.updateStatus(onLeaveStart).then(() => {
        this.updateActiveStatus(onLeaveActive, STATUS_LEAVE);
      });
    }
  };

  onAnimationEnd = (event) => {
    this.onMotionEnd(event);
  };

  onTransitionEnd = (event) => {
    this.onMotionEnd(event);
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

  updateStatus = (styleFunc, additionalState, event) => (
    new Promise((resolve) => {
      const statusStyle = styleFunc ? styleFunc(ReactDOM.findDOMNode(this), event) : null;

      if (statusStyle === false) return;

      this.setState({
        statusStyle,
        newStatus: false,
        ...additionalState,
      }, resolve); // Trigger before next frame & after `componentDidMount`
    })
  );

  updateActiveStatus = (styleFunc, currentStatus) => {
    // `setState` use `postMessage` to trigger at the end of frame.
    // Let's use requestAnimationFrame to update new state in next frame.
    raf(() => {
      const { status } = this.state;
      if (status !== currentStatus) return;

      this.updateStatus(styleFunc, { statusActive: true });
    });
  };

  render() {
    const { status, statusActive, statusStyle } = this.state;
    const { children, transitionName, visible } = this.props;

    if (!children) return null;

    if (status === STATUS_NONE || !supportTransition) {
      return visible ? children({}) : null;
    }

    return children({
      className: classNames({
        [getTransitionName(transitionName, status)]: status !== STATUS_NONE,
        [getTransitionName(transitionName, `${status}-active`)]: status !== STATUS_NONE && statusActive,
        [transitionName]: typeof transitionName === 'string',
      }),
      style: statusStyle,
    });
  }
}

polyfill(CSSTransition);

export default CSSTransition;
