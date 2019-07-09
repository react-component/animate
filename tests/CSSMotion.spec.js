/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import $ from 'jquery';
import raf from 'raf';
import { genCSSMotion } from '../src/CSSMotion';

import './CSSMotion.spec.css';

describe('motion', () => {
  const CSSMotion = genCSSMotion({ transitionSupport: true, forwardRef: false });

  let div;
  beforeEach(() => {
    div = document.createElement('div');
    document.body.appendChild(div);
  });

  afterEach(() => {
    try {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    } catch (e) {
      // Do nothing
    }
  });

  describe('transition', () => {
    const onCollapse = () => ({ height: 0 });
    const actionList = [
      {
        name: 'appear',
        props: { motionAppear: true, onAppearStart: onCollapse },
        visible: [true],
        oriHeight: 0,
        tgtHeight: 100,
        oriOpacity: 0,
        tgtOpacity: 1,
      },
      {
        name: 'enter',
        props: { motionEnter: true, onEnterStart: onCollapse },
        visible: [false, true],
        oriHeight: 0,
        tgtHeight: 100,
        oriOpacity: 0,
        tgtOpacity: 1,
      },
      {
        name: 'leave',
        props: { motionLeave: true, onLeaveActive: onCollapse },
        visible: [true, false],
        oriHeight: 100,
        tgtHeight: 0,
        oriOpacity: 1,
        tgtOpacity: 0,
      },
    ];

    actionList.forEach(({ name, props, visible, oriHeight, tgtHeight, oriOpacity, tgtOpacity }) => {
      class Demo extends React.Component {
        state = {
          visible: visible[0],
        };

        render() {
          return (
            <CSSMotion
              motionName="transition"
              motionAppear={false}
              motionEnter={false}
              motionLeave={false}
              visible={this.state.visible}
              {...props}
            >
              {({ style, className }) => (
                <div style={style} className={classNames('motion-box', className)} />
              )}
            </CSSMotion>
          );
        }
      }

      it(name, done => {
        ReactDOM.render(<Demo />, div, function init() {
          const nextVisible = visible[1];
          const instance = this;

          const doStartTest = () => {
            const $ele = $(div).find('.motion-box');

            const basicClassName = TestUtils.findRenderedDOMComponentWithClass(
              instance,
              'motion-box',
            ).className;
            expect(basicClassName).to.contain('transition');
            expect(basicClassName).to.contain(`transition-${name}`);
            expect(basicClassName).to.not.contain(`transition-${name}-active`);

            raf(() => {
              // After first dom render, merge the style into element
              expect($ele.height()).to.be(oriHeight);
              expect(Number($ele.css('opacity'))).to.be(oriOpacity);

              setTimeout(() => {
                const activeClassName = TestUtils.findRenderedDOMComponentWithClass(
                  instance,
                  'motion-box',
                ).className;
                expect(activeClassName).to.contain('transition');
                expect(activeClassName).to.contain(`transition-${name}`);
                expect(activeClassName).to.contain(`transition-${name}-active`);

                setTimeout(() => {
                  if (nextVisible === false) {
                    expect(
                      TestUtils.scryRenderedDOMComponentsWithClass(instance, 'motion-box').length,
                    ).to.be(0);
                  } else {
                    const endClassName = TestUtils.findRenderedDOMComponentWithClass(
                      instance,
                      'motion-box',
                    ).className;
                    expect(endClassName).to.not.contain('transition');
                    expect(endClassName).to.not.contain(`transition-${name}`);
                    expect(endClassName).to.not.contain(`transition-${name}-active`);

                    expect($ele.height()).to.be(tgtHeight);
                    expect(Number($ele.css('opacity'))).to.be(tgtOpacity);
                  }
                  done();
                }, 300);
              }, 100);
            });
          };

          // Delay for the visible finished
          if (nextVisible !== undefined) {
            setTimeout(() => {
              instance.setState({ visible: nextVisible });
              doStartTest();
            }, 100);
          } else {
            doStartTest();
          }
        });
        // End of test case
      });
    });
  });

  describe('animation', () => {
    const actionList = [
      {
        name: 'appear',
        props: { motionAppear: true },
        visible: [true],
      },
      {
        name: 'enter',
        props: { motionEnter: true },
        visible: [false, true],
      },
      {
        name: 'leave',
        props: { motionLeave: true },
        visible: [true, false],
      },
    ];

    actionList.forEach(({ name, visible, props }) => {
      class Demo extends React.Component {
        state = {
          visible: visible[0],
        };

        render() {
          return (
            <CSSMotion
              motionName="animation"
              motionAppear={false}
              motionEnter={false}
              motionLeave={false}
              visible={this.state.visible}
              {...props}
            >
              {({ style, className }) => (
                <div style={style} className={classNames('motion-box', className)} />
              )}
            </CSSMotion>
          );
        }
      }

      it(name, done => {
        ReactDOM.render(<Demo />, div, function init() {
          const nextVisible = visible[1];
          const instance = this;

          const doStartTest = () => {
            const basicClassName = TestUtils.findRenderedDOMComponentWithClass(
              instance,
              'motion-box',
            ).className;
            expect(basicClassName).to.contain('animation');
            expect(basicClassName).to.contain(`animation-${name}`);
            expect(basicClassName).to.not.contain(`animation-${name}-active`);

            setTimeout(() => {
              const activeClassName = TestUtils.findRenderedDOMComponentWithClass(
                instance,
                'motion-box',
              ).className;
              expect(activeClassName).to.contain('animation');
              expect(activeClassName).to.contain(`animation-${name}`);
              expect(activeClassName).to.contain(`animation-${name}-active`);

              // Simulation browser env not support animation. Not check end event
              done();
            }, 100);
          };

          // Delay for the visible finished
          if (nextVisible !== undefined) {
            setTimeout(() => {
              instance.setState({ visible: nextVisible });
              doStartTest();
            }, 100);
          } else {
            doStartTest();
          }
        });
      });
      // End of it
    });
  });

  describe('immediately', () => {
    it('motionLeaveImmediately', done => {
      ReactDOM.render(
        <CSSMotion motionName="transition" motionLeaveImmediately visible={false}>
          {({ style, className }) => (
            <div style={style} className={classNames('motion-box', className)} />
          )}
        </CSSMotion>,
        div,
        function init() {
          const instance = this;

          const basicClassName = TestUtils.findRenderedDOMComponentWithClass(instance, 'motion-box')
            .className;
          expect(basicClassName).to.contain('transition');
          expect(basicClassName).to.contain('transition-leave');
          expect(basicClassName).to.not.contain('transition-leave-active');

          setTimeout(() => {
            const activeClassName = TestUtils.findRenderedDOMComponentWithClass(
              instance,
              'motion-box',
            ).className;
            expect(activeClassName).to.contain('transition');
            expect(activeClassName).to.contain('transition-leave');
            expect(activeClassName).to.contain('transition-leave-active');

            done();
          }, 100);
        },
      );
    });
  });

  it('no transition', done => {
    const NoCSSTransition = genCSSMotion({ transitionSupport: false, forwardRef: false });

    ReactDOM.render(
      <NoCSSTransition motionName="transition">
        {({ style, className }) => (
          <div style={style} className={classNames('motion-box', className)} />
        )}
      </NoCSSTransition>,
      div,
      function init() {
        const basicClassName = TestUtils.findRenderedDOMComponentWithClass(this, 'motion-box')
          .className;
        expect(basicClassName).to.not.contain('transition');
        expect(basicClassName).to.not.contain('transition-appear');
        expect(basicClassName).to.not.contain('transition-appear-active');

        done();
      },
    );
  });

  it('forwardRef', () => {
    
  });
});
