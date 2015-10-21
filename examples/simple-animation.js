// use jsx to render html, do not modify simple.html
'use strict';

import './assets/index.less';
import Animate from 'rc-animate';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import velocity from 'velocity-animate';

let transitionEnter = true;
let remove = false;

const Box = React.createClass({
  render() {
    console.log('render', this.props.visible);
    return (<div style={{
          width: '200px',
          display: this.props.visible ? 'block' : 'none',
          height: '200px',
          backgroundColor: 'red'
          }}></div>);
  }
});

var Demo = React.createClass({
  getInitialState() {
    return {
      destroyed:false,
      visible: true,
      exclusive: false
    };
  },

  toggleAnimate() {
    this.setState({
      visible: !this.state.visible
    });
  },

  animateEnter(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'none';

    velocity(node, 'slideDown', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },

  animateLeave(node, done){
    var ok = false;

    function complete() {
      if (!ok) {
        ok = 1;
        done();
      }
    }

    node.style.display = 'block';

    velocity(node, 'slideUp', {
      duration: 1000,
      complete: complete
    });
    return {
      stop: function () {
        velocity(node, 'finish');
        // velocity complete is async
        complete();
      }
    };
  },

  toggle(field){
    this.setState({
      [field]: !this.state[field]
    });
  },

  destroy(){
    this.setState({
      destroyed:true
    });
  },

  render() {
    return (
      <div>
        <label><input type='checkbox' onChange={this.toggle.bind(this,'visible')} checked={this.state.visible}/>
          show</label>
        &nbsp;
        <label><input type='checkbox' onChange={this.toggle.bind(this,'exclusive')} checked={this.state.exclusive}/>
          exclusive</label>
        &nbsp;
        <button onClick={this.destroy}>destroy</button>
        <br/><br/>
        <Animate
          component=""
          exclusive={this.state.exclusive}
          showProp='visible'
          animation={{
            enter:this.animateEnter,
            leave:this.animateLeave
          }}>
          {this.state.destroyed?null:<Box visible={this.state.visible}/>}
        </Animate>
      </div>
    );
  }
});

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
