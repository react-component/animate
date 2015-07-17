'use strict';

var React = require('react');
var CssAnimation = require('css-animation');

class AnimIfChange extends React.Component {
  render() {
    return React.Children.only(this.props.children);
  }
}
module.exports = AnimIfChange;