/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import { genCSSMotionList } from '../src/CSSMotionList';
import CSSMotion from '../src/CSSMotion';

import './CSSMotion.spec.css';

describe('motion list', () => {
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

  describe('diff should work', () => {
    function testMotion(CSSMotionList, done, injectLeave) {
      let leaveCalled = 0;
      function onLeaveEnd() {
        leaveCalled += 1;
      }

      class Demo extends React.Component {
        state = {
          keys: [ 'a', 'b' ],
        };

        render() {
          const { keys } = this.state;
          return (
            <CSSMotionList motionName="transition" keys={keys} onLeaveEnd={onLeaveEnd}>
              {({ key, style, className }) => (
                <div key={key} style={style} className={classNames('motion-box', className)}>
                  {key}
                </div>
              )}
            </CSSMotionList>
          );
        }
      }

      ReactDOM.render(<Demo />, div, function init() {
        const instance = this;

        function checkKeys(targetKeys) {
          const nodeList = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'motion-box');
          const keys = nodeList.map((node) => node.innerHTML);
          expect(keys).to.eql(targetKeys);
        }

        checkKeys([ 'a', 'b' ]);
        instance.setState({ keys: [ 'c', 'd' ] });

        if (injectLeave) {
          injectLeave(instance);
        }

        setTimeout(() => {
          checkKeys([ 'c', 'd' ]);
          if (injectLeave) {
            expect(leaveCalled).to.be(2);
          }
          done();
        }, 100);
      });
    }

    it('with motion support', (done) => {
      const CSSMotionList = genCSSMotionList(true);
      testMotion(CSSMotionList, done, (instance) => {
        const motionList = TestUtils.scryRenderedComponentsWithType(instance, CSSMotion);
        motionList.slice(0, 2).forEach((cssMotion) => {
          cssMotion.props.onLeaveEnd();
        });
      });
    });

    it('without motion support', (done) => {
      const CSSMotionList = genCSSMotionList(false);
      testMotion(CSSMotionList, done);
    });
  });
});
