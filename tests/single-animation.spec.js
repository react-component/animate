/**
 * only require other specs here
 */
'use strict';

var expect = require('expect.js');
var Animate = require('../index');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
require('./index.spec.css');
var $ = require('jquery');

var createClass = function (options) {
  return React.createClass({
    getInitialState(){
      return {
        transitionEnter: options.transitionEnter,
        transitionAppear: options.transitionAppear
      };
    },

    fake(type, node, done){
      if (type == 'appear' || type === 'enter') {
        node.style.display = 'none';
        $(node).fadeIn(500, done);
      } else {
        $(node).fadeOut(500, done);
      }
      return {
        stop(){
          $(node).stop(1, 1);
        }
      }
    },

    render() {
      return (
        <Animate
          animation={{
            enter:this.fake.bind(this,'enter'),
            appear:this.state.transitionAppear?this.fake.bind(this,'appear'):null,
            leave:this.fake.bind(this,'leave')
          }}
          component={options.component}>
          {options.remove && !this.state.transitionEnter ? null : <div key="1">child element</div>}
        </Animate>
      );
    }
  });
};

require('./single-common.spec')(createClass, 'animation');
