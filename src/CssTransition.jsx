'use strict';

import React, {Component} from 'react';
import anim from 'css-animation';
const {findDOMNode, cloneElement, createElement} = React;

function isEmpty(obj) {
  return obj === null || obj === undefined;
}

export default class CssTransition extends Component {

  constructor() {
    super(...arguments);
    this.state = {
      children: this.props.children
    };
    this.requestRemoveChildren = this.requestRemoveChildren.bind(this);
  }

  renderContainer(children) {
    return createElement(
      this.props.container,
      null,
      children
    );
  }

  getChildrenToRender(component) {
    return this.state.children && cloneElement(React.Children.only(component));
  }

  render() {
    const children = this.getChildrenToRender(this.state.children);
    if (this.props.container) {
      return this.renderContainer(children);
    }
    return children;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  anim(el, transitionName, enter, fn) {
    if (transitionName) {
      anim(el, transitionName + (enter ? '-enter' : '-leave'), fn);
    } else if (fn) {
      fn();
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({children: nextProps.children});
  }

  requestRemoveChildren(removeRequired) {
    return () => {
      if (removeRequired) {
        this.setState({children: null});
      }
    };
  }

  componentDidUpdate(prevProps) {
    const props = this.props;
    const domNode = findDOMNode(this);
    if (!domNode) {
      return;
    }
    // render at first time
    if (isEmpty(prevProps)) {
      if (props.defaultTransitionEnter !== props.transitionEnter) {
        this.anim(domNode, props.transitionName, props.transitionEnter);
      }
    } else if (prevProps.transitionEnter !== props.transitionEnter) {
      if (props.transitionEnter) {
        this.anim(domNode, props.transitionName, true);
      } else {
        this.anim(domNode, props.transitionName, false, this.requestRemoveChildren(props.remove));
      }
    }
  }
}

CssTransition.propTypes = {
  transitionEnter: React.PropTypes.bool.isRequired,
  defaultTransitionEnter: React.PropTypes.bool,
  transitionName: React.PropTypes.string,
  remove: React.PropTypes.bool,
  container: React.PropTypes.string
};

CssTransition.defaultProps = {
  transitionEnter: false,
  defaultTransitionEnter: false,
  remove: false
};
