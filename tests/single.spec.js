/* eslint no-console:0, react/no-multi-comp:0 */

import Animate from '../index';
import React from 'react';

import './index.spec.css';

function createClass(options) {
  return class extends React.Component {
    state = {
      transitionEnter: options.transitionEnter,
      transitionAppear: options.transitionAppear,
    }

    render() {
      return (
        <Animate
          ref="anim"
          transitionAppear={!!this.state.transitionAppear}
          transitionName="example"
          component={options.component}
        >
          {options.remove && !this.state.transitionEnter ? null : <div key="1">child element</div>}
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
