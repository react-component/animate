import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { polyfill } from 'react-lifecycles-compat';
import classNames from 'classnames';
import raf from 'raf';
import { getTransitionName } from './util';

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
    onEnterStart: PropTypes.func,
    onEnterActive: PropTypes.func,
    onLeaveStart: PropTypes.func,
    onLeaveActive: PropTypes.func,
  };

  static defaultProps = {
    transitionEnter: true,
    transitionAppear: true,
    transitionLeave: true,
  };

  state = {
    status: STATUS_NONE,
    newStatus: false,
    statusStyle: null,
  };

  static getDerivedStateFromProps(props, { prevProps }) {
    const { visible } = props;
    const newState = {
      prevProps: props,
    };

    // Appear
    if (!prevProps && visible) {
      newState.status = STATUS_APPEAR;
      newState.newStatus = true;
    }

    // Enter
    if (prevProps && !prevProps.visible && visible) {
      newState.status = STATUS_ENTER;
      newState.newStatus = true;
    }

    // Leave
    if (prevProps && prevProps.visible && !visible) {
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

  onDomUpdate = () => {
    const { status, newStatus } = this.state;
    const {
      onAppearStart, onEnterStart, onLeaveStart,
      onAppearActive, onEnterActive, onLeaveActive,
    } = this.props;

    // Init status
    if (newStatus && status === STATUS_APPEAR) {
      this.updateStatus(onAppearStart);
    } else if (newStatus && status === STATUS_ENTER) {
      this.updateStatus(onEnterStart);
    } else if (newStatus && status === STATUS_LEAVE) {
      this.updateStatus(onLeaveStart);
    }

    // To be active
    if (!newStatus && status === STATUS_APPEAR) {
      this.asyncUpdateStatus(onAppearActive, STATUS_APPEAR, STATUS_APPEAR_ACTIVE);
    } else if (!newStatus && status === STATUS_ENTER) {
      this.asyncUpdateStatus(onEnterActive, STATUS_ENTER, STATUS_ENTER_ACTIVE);
    } else if (!newStatus && status === STATUS_LEAVE) {
      this.asyncUpdateStatus(onLeaveActive, STATUS_LEAVE, STATUS_LEAVE_ACTIVE);
    }
  };

  updateStatus = (styleFunc, additionalState) => {
    this.setState({
      statusStyle: styleFunc ? styleFunc(ReactDOM.findDOMNode(this)) : null,
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
    const { children, transitionName } = this.props;

    if (!children) return null;

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
