/* eslint no-console:0, react/no-multi-comp:0 */

const Animate = require('../index');
const React = require('react');

require('./index.spec.css');

function createClass(options) {
  return class extends React.Component {
    state = {
      transitionEnter: options.transitionEnter,
      transitionAppear: options.transitionAppear,
    }

    render() {
      return (
        <Animate
          ref="anim"
          transitionAppear={!!this.state.transitionAppear}
          transitionName="example"
          component={options.component}
        >
          {options.remove && !this.state.transitionEnter ? null : <div key="1">child element</div>}
        </Animate>
      );
    }
  };
}

const CssAnimation = require('css-animation');
if (CssAnimation.isCssAnimationSupported) {
  require('./single-common.spec')(createClass, 'transition');
}
