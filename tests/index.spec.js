/**
 * only require other specs here
 */
'use strict';

var expect = require('expect.js');
var AnimIfChange = require('../index');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var createParentComponent = function(options) {
  return React.createClass({
    getInitialState() {
      return {
        transitionEnter: options.transitionEnter, 
        remove: options.remove
      };
    }, 
    render() {
      return (
        <AnimIfChange 
          ref="anim"
          transitionEnter={this.state.transitionEnter} 
          defaultTransitionEnter={true}
          container={options.container}
          remove={this.state.remove}>
            <div>child element</div>
        </AnimIfChange>
      );
    }
  });
}

describe('when remove is true', function() {

  var parentComponent;
  var childComponent
 
  before(function() {
    var ParentComponent = createParentComponent({transitionEnter: true, remove: true});
    parentComponent = TestUtils.renderIntoDocument(<ParentComponent/>);
    childComponent = parentComponent.refs.anim;
  });
  
  describe('when transitionEnter', function() {
  
    it('should render children', function() {
      var child = TestUtils.findRenderedDOMComponentWithTag(childComponent, 'div');
      expect(React.findDOMNode(child).textContent).to.be('child element');
    });
  });

  describe('when toggle transitionEnter', function() {
    it('should remove children after transition', function() {
      parentComponent.setState({transitionEnter: false});
      childComponent = parentComponent.refs.anim;
      expect(function() {
        TestUtils.findRenderedDOMComponentWithTag(childComponent, 'div');
      }).to.throwException();
      //console.log(React.findDOMNode(child).textContent);
    });
  });

  describe('toggle transitionEnter after remove', function() {
  
    it('should render again', function() {
      parentComponent.setState({transitionEnter: true});
      var child = TestUtils.findRenderedDOMComponentWithTag(childComponent, 'div');
      expect(React.findDOMNode(child).textContent).to.be('child element');
    });
  })

});

describe('when remove is false', function() {

  var parentComponent;
  var childComponent
 
  before(function() {
    var ParentComponent = createParentComponent({transitionEnter: true, remove: false});
    parentComponent = TestUtils.renderIntoDocument(<ParentComponent/>);
    childComponent = parentComponent.refs.anim;
  });
  
  describe('when toggle transitionEnter', function() {
  
    it('child still exists after transition', function() {
      parentComponent.setState({transitionEnter: false});
      var child = TestUtils.findRenderedDOMComponentWithTag(childComponent, 'div');
      expect(React.findDOMNode(child).textContent).to.be('child element');
    });
  })
});

describe('when define container', function() {

  var parentComponent;
  var childComponent
 
  before(function() {

    var ParentComponent = createParentComponent({
      transitionEnter: true, 
      remove: false,
      container: 'ul'
    });

    parentComponent = TestUtils.renderIntoDocument(<ParentComponent/>);
    childComponent = parentComponent.refs.anim;
  });
  
  describe('when transitionEnter', function() {
  
    it('will render container', function() {
      var child = TestUtils.findRenderedDOMComponentWithTag(childComponent, 'ul');
      expect(React.findDOMNode(child).textContent).to.be('child element');
    });
  })

});

