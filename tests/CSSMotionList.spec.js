/* eslint react/no-render-return-value:0, react/prefer-stateless-function:0, react/no-multi-comp:0 */
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import CSSMotionList from '../src/CSSMotionList';

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

  it('diff should work', (done) => {
    class Demo extends React.Component {
      state = {
        keys: ['a', 'b'],
      };

      render() {
        const { keys } = this.state;
        return (
          <CSSMotionList keys={keys}>
            {({ key }) => (
              <span className="spin">{key}</span>
            )}
          </CSSMotionList>
        );
      }
    }

    ReactDOM.render(<Demo />, div, function init() {
      const instance = this;

      function checkKeys(targetKeys) {
        const nodeList = TestUtils.scryRenderedDOMComponentsWithClass(instance, 'spin');
        const keys = nodeList.map(node => node.innerHTML);
        expect(keys).to.eql(targetKeys);
      }

      checkKeys(['a', 'b']);
      instance.setState({ keys: ['c', 'd'] });

      setTimeout(() => {
        checkKeys(['c', 'd']);
        done();
      }, 100);
      
    });
  });
});