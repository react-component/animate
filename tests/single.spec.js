/* eslint no-console:0, react/no-multi-comp:0 */

import Animate from '../index';
import React from 'react';
import PropTypes from 'prop-types';

import './index.spec.css';

function createClass(options) {
  return class extends React.Component {
    static propTypes = {
      showProp: PropTypes.string,
      children: PropTypes.any,
    }

    state = {
      transitionEnter: options.transitionEnter,
      transitionAppear: options.transitionAppear,
    }

    render() {
      const extProps = {};
      if ('showProp' in this.props) {
        extProps.showProp = this.props.showProp;
      }

      const children = this.props.children || <div key="1">child element</div>;

      return (
        <Animate
          ref="anim"
          transitionAppear={!!this.state.transitionAppear}
          transitionName="example"
          component={options.component}
          {...extProps}
        >
          {options.remove && !this.state.transitionEnter ? null : children}
        </Animate>
      );
    }
  };
}

import CssAnimation from 'css-animation';
import single from './single-common.spec';
if (CssAnimation.isCssAnimationSupported) {
  single(createClass, 'transition');
}
