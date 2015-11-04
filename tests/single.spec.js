/**
 * only require other specs here
 */
'use strict';

var expect = require('expect.js');
var Animate = require('../index');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
require('./index.spec.css');

var createClass = function (options) {
  return React.createClass({
    getInitialState(){
      return {
        transitionEnter: options.transitionEnter,
        transitionAppear: options.transitionAppear,
      };
    },
    render() {
      return (
        <Animate
          ref="anim"
          transitionAppear={!!this.state.transitionAppear}
          transitionName="example"
          component={options.component}>
          {options.remove && !this.state.transitionEnter ? null : <div key="1">child element</div>}
        </Animate>
      );
    }
  });
};

var CssAnimation = require('css-animation');
if (CssAnimation.isCssAnimationSupported) {
  require('./single-common.spec')(createClass, 'transition');
}
