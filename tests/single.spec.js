/* eslint no-console:0, react/no-multi-comp:0 */

import React from 'react';
import Animate from '../index';
import { supportTransition } from '../src/util';
import single from './single-common.spec';

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
          // ref="anim"
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

if (supportTransition) {
  single(createClass, 'transition');
}
