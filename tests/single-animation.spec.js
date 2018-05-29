/* eslint no-console:0, react/no-multi-comp:0 */

import React from 'react';
import $ from 'jquery';
import Animate from '../index';
import single from './single-common.spec';
import './index.spec.css';

function createClass(options) {
  return class extends React.Component {
    state = {
      transitionEnter: options.transitionEnter,
      transitionAppear: options.transitionAppear,
    }

    fake = (type, node, done) => {
      if (type === 'appear' || type === 'enter') {
        node.style.display = 'none';
        $(node).fadeIn(500, done);
      } else {
        $(node).fadeOut(500, done);
      }
      return {
        stop() {
          $(node).stop(1, 1);
        },
      };
    }

    render() {
      return (
        <Animate
          animation={{
            enter: this.fake.bind(this, 'enter'),
            appear: this.state.transitionAppear ? this.fake.bind(this, 'appear') : null,
            leave: this.fake.bind(this, 'leave'),
          }}
          component={options.component}
        >
          {options.remove && !this.state.transitionEnter ? null : <div key="1">child element</div>}
        </Animate>
      );
    }
  };
}


single(createClass, 'animation');
