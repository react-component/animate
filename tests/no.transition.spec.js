/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import { genAnimate } from '../src/Animate';
import { genAnimateChild } from '../src/AnimateChild';


describe('no transition', () => {
  const AnimateChild = genAnimateChild(false);
  const Animate = genAnimate(AnimateChild);

  class SimpleWrapper extends React.Component {
    state = { show: this.props.show || false };

    render() {
      const { ...props } = this.props;
      delete props.show;
      return (
        <Animate {...props}>
          {this.state.show && <div />}
        </Animate>
      );
    }
  }
  SimpleWrapper.propTypes = {
    show: PropTypes.bool,
  };

  let div;
  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    try {
      ReactDOM.unmountComponentAtNode(div);
    } catch (e) {
      // Do nothing
    }
  });


  it('event queue', (done) => {
    const instance = ReactDOM.render(<SimpleWrapper component="" transitionName="none" />, div);

    instance.setState({ show: true }, () => {
      const child = TestUtils.findRenderedComponentWithType(instance, AnimateChild);
      expect(child.state.eventQueue).to.eql(['enter']);

      setTimeout(() => {
        expect(child.state.eventQueue).to.eql([]);
        done();
      }, 100);
    });
  });
});
