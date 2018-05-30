/* eslint react/no-render-return-value:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import Animate from '../';

describe('basic', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    try {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
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
});
