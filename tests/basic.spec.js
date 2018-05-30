/* eslint react/no-render-return-value:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import expect from 'expect.js';
import Animate from '../';
import { getVendorPrefixes, getVendorPrefixedEventName, transitionEndName } from '../src/util';

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
