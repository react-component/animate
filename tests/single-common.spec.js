/**
 * only require other specs here
 */
'use strict';

var expect = require('expect.js');
var Animate = require('../index');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;
require('./index.spec.css');

module.exports = function (createClass, title) {
  function getOpacity(node) {
    return parseFloat(window.getComputedStyle(node).getPropertyValue('opacity'));
  }

  describe(title, function () {
    describe('when remove is true', function () {
      var instance;
      var div;

      beforeEach(function () {
        div = document.createElement('div');
        document.body.appendChild(div);
        var Component = createClass({transitionEnter: true, component: '', remove: true});

        instance = React.render(<Component/>, div);
      });

      afterEach(function () {
        try {
          React.unmountComponentAtNode(div);
          document.body.removeChild(div);
        } catch (e) {
          console.log(e);
        }
      });

      describe('when transitionAppear', function () {
        it('should render children', function () {
          expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0]).not.to.be.ok();
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
          expect(getOpacity(React.findDOMNode(child))).to.be(1);
        });

        it('should anim children', function (done) {
          var div = document.createElement('div');
          document.body.appendChild(div);
          var Component = createClass({transitionEnter: true, transitionAppear: true, component: '', remove: true});

          var instance = React.render(<Component/>, div);
          expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0]).not.to.be.ok();
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
          expect(getOpacity(React.findDOMNode(child))).not.to.be(1);
          setTimeout(function () {
            expect(getOpacity(React.findDOMNode(child))).to.be(1);
            React.unmountComponentAtNode(div);
            document.body.removeChild(div);
            done();
          }, 900);
        });
      });

      describe('when transitionEnter', function () {
        it('should render children', function () {
          expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'span')[0]).not.to.be.ok();
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
          expect(React.findDOMNode(child).textContent).to.be('child element');
        });
      });

      describe('when toggle transitionEnter', function () {
        it('should remove children after transition', function (done) {
          if (window.callPhantom) {
            return done();
          }
          instance.setState({transitionEnter: false});
          expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]).to.be.ok();
          setTimeout(function () {
            expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'div')[0]).not.to.be.ok();
            done();
          }, 1000);
        });
      });

      describe('toggle transitionEnter after remove', function () {

        it('should render again', function () {
          instance.setState({transitionEnter: true});
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
          expect(React.findDOMNode(child).textContent).to.be('child element');
        });
      })
    });

    describe('when remove is false', function () {
      var instance;

      before(function () {
        var Component = createClass({transitionEnter: true, remove: false});
        instance = TestUtils.renderIntoDocument(<Component/>);
      });

      describe('when toggle transitionEnter', function () {

        it('child still exists after transition', function () {
          instance.setState({transitionEnter: false});
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'div');
          expect(React.findDOMNode(child).textContent).to.be('child element');
        });
      })
    });

    describe('when define container', function () {
      var instance;

      before(function () {

        var Component = createClass({
          transitionEnter: true,
          remove: false,
          component: 'ul'
        });

        instance = TestUtils.renderIntoDocument(<Component/>);
      });

      describe('when transitionEnter', function () {

        it('will render container', function () {
          var child = TestUtils.findRenderedDOMComponentWithTag(instance, 'ul');
          expect(React.findDOMNode(child).textContent).to.be('child element');
        });
      })
    });
  });
};
