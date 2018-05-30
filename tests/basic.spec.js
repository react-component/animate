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

  it('transition last callback', (done) => {
    function createOnCalled(type) {
      function callback() {
        callback.times += 1;
      }
      callback.type = type;
      callback.times = 0;

      return callback;
    }

    const onAppear = createOnCalled('appear');
    const onEnter = createOnCalled('enter');
    const onLeave = createOnCalled('leave');
    const onEnd = createOnCalled('end');

    const instance = ReactDOM.render(<SimpleWrapper
      onAppear={onAppear}
      onEnter={onEnter}
      onLeave={onLeave}
      onEnd={onEnd}
      show
      transitionAppear
    />, div);

    // What event state change, this will only trigger once when final transition finished
    setTimeout(() => {
      expect(onAppear.times).to.be(1);
      expect(onEnter.times).to.be(0);
      expect(onLeave.times).to.be(0);
      expect(onEnd.times).to.be(1);

      instance.setState({ show: false }, () => {
        expect(onAppear.times).to.be(1);
        expect(onEnter.times).to.be(0);
        expect(onLeave.times).to.be(0);
        expect(onEnd.times).to.be(1);

        setTimeout(() => {
          expect(onAppear.times).to.be(1);
          expect(onEnter.times).to.be(0);
          expect(onLeave.times).to.be(1);
          expect(onEnd.times).to.be(2);

          instance.setState({ show: true }, () => {
            const child = TestUtils.findRenderedComponentWithType(instance, AnimateChild);

            instance.setState({ show: false }, () => {
              expect(child.state.eventQueue).to.eql(['enter', 'leave']);

              instance.setState({ show: true }, () => {
                expect(onAppear.times).to.be(1);
                expect(onEnter.times).to.be(0);
                expect(onLeave.times).to.be(1);
                expect(onEnd.times).to.be(2);

                expect(child.state.eventQueue).to.eql(['enter']);

                setTimeout(() => {
                  expect(child.state.eventQueue).to.eql([]);

                  expect(onAppear.times).to.be(1);
                  expect(onEnter.times).to.be(1);
                  expect(onLeave.times).to.be(1);
                  expect(onEnd.times).to.be(3);

                  done();
                }, 100);
              });
            });
          });
        }, 100);
      });


    }, 100);


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

    class UL extends React.Component {
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

    const instance = ReactDOM.render(<UL />, div);
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
    it('without exclusive', (done) => {
      const instance = ReactDOM.render(<SimpleWrapper component="" transitionName="example" />, div);

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
      const instance = ReactDOM.render(<SimpleWrapper component="" transitionName="example" exclusive />, div);

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

  it('remove child when transitionLeave is false', () => {
    const instance = ReactDOM.render(<SimpleWrapper component="" transitionName="test" transitionLeave={false} show />, div);
    instance.setState({ show: false });

    expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'li').length).to.be(0);
  });

  it('clean up animation when exclusive item remove', (done) => {
    let stopCalled = false;
    const animation = {
      enter() {
        return {
          stop() {
            stopCalled = true;
          },
        };
      },
    };
    const instance = ReactDOM.render(
      <SimpleWrapper
        component=""
        animation={animation}
        exclusive
      />, div);
    instance.setState({ show: true }, () => {
      instance.setState({ show: false }, () => {
        expect(stopCalled).to.be.ok();
        done();
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
