/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import Animate from '../';
import AnimateChild from '../src/AnimateChild';
import { getVendorPrefixes, getVendorPrefixedEventName, transitionEndName } from '../src/util';

import './index.spec.css';

describe('basic', () => {
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

  it('exception if children has key', () => {
    const instance = ReactDOM.render(
      <Animate component="ul">
        <li key={1} />
        <li key={2} />
      </Animate>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(2);
  });

  it('exception if children without key', () => {
    const instance = ReactDOM.render(
      <Animate component="ul">
        <li/>
        <li/>
      </Animate>, div);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(0);
  });

  it('transitionName is an object', (done) => {
    const transitionName = {
      appear: 'trans-appear',
      appearActive: 'trans-appear-active',
    };

    const instance = ReactDOM.render(
      <Animate component="" transitionName={transitionName} transitionAppear>
        <div />
      </Animate>, div);

    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0].className)
      .to.contain('trans-appear');
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0].className)
      .not.to.contain('trans-appear-active');

    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0].className)
        .to.contain('trans-appear');
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0].className)
        .to.contain('trans-appear-active');
      done();
    }, 0);
  });

  it('clean up when hidden children removed', (done) => {
    // Stateless component not work for `scryRenderedComponentsWithType`
    class LI extends React.Component {
      render() {
        const {show} = this.props;
        return (
          show ? <li/> : null
        )
      }
    }

    LI.propTypes = {
      show: PropTypes.bool,
    };

    class Wrapper extends React.Component {
      state = {
        show: true,
        propShow: true,
      };

      render() {
        const { show, propShow } = this.state;
        return (
          <Animate component="ul" transitionName="basic-test" showProp="show">
            {show && <LI key={1} show={propShow}/>}
          </Animate>
        );
      }
    }

    const instance = ReactDOM.render(<Wrapper />, div);
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(1);

    instance.setState({ propShow: false });
    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(1);

    setTimeout(() => {
      expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(0);
      expect(TestUtils.scryRenderedComponentsWithType(instance, LI).length).to.be(1);

      instance.setState({ show: false });
      setTimeout(() => {
        expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(0);
        expect(TestUtils.scryRenderedComponentsWithType(instance, LI).length).to.be(0);
        done();
      }, 100);
    }, 100);
  });

  describe('de-dup event', () => {
    class Wrapper extends React.Component {
      static propTypes = {
        exclusive: PropTypes.bool,
      };
      state = { show: false };

      render() {
        return (
          <Animate component="" transitionName="example" exclusive={this.props.exclusive}>
            {this.state.show && <div />}
          </Animate>
        );
      }
    }

    it('without exclusive', (done) => {
      const instance = ReactDOM.render(<Wrapper />, div);

      instance.setState({ show: true }, () => {
        // Enter
        const child = TestUtils.findRenderedComponentWithType(instance, AnimateChild);
        expect(child.state.eventQueue).to.eql(['enter']);

        instance.setState({ show: false }, () => {
          // Leave
          expect(child.state.eventQueue).to.eql(['enter', 'leave']);

          instance.setState({ show: true }, () => {
            // Enter again, clean the leave in queue
            expect(child.state.eventQueue).to.eql(['enter']);

            done();
          });
        });
      });
    });

    it('exclusive', (done) => {
      const instance = ReactDOM.render(<Wrapper exclusive />, div);

      instance.setState({ show: true }, () => {
        // Enter
        const child = TestUtils.findRenderedComponentWithType(instance, AnimateChild);

        instance.setState({ show: false }, () => {
          // Leave, exclusive only get the latest one
          const currentEvent = child.getCurrentEvent();
          expect(currentEvent.eventType).to.eql('leave');
          done();
        });
      });
    });
  });
});

describe('util', () => {
  it('getVendorPrefixes without window support', () => {
    const prefix = getVendorPrefixes(true, {});
    expect(prefix.animationend.animation).to.be(undefined);
    expect(prefix.transitionend.transition).to.be(undefined);
  });

  it('getVendorPrefixedEventName cache check', () => {
    expect(getVendorPrefixedEventName('transitionend')).to.be(transitionEndName);
  });

  it('getVendorPrefixedEventName not exist', () => {
    expect(getVendorPrefixedEventName('NotExist')).to.be('');
  });
});
