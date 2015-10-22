// use jsx to render html, do not modify simple.html
'use strict';

import './assets/slow.less';
import Animate from 'rc-animate';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

const Box = React.createClass({
  render(){
    console.log('render',this.props.visible);
    return <div style={{
          display:this.props.visible?'block':'none',
          marginTop: '20px',
          width: '200px',
          height: '200px',
          backgroundColor: 'red'
          }}></div>
  }
});

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: 1
    };
    this.toggleAnimate = this.toggleAnimate.bind(this);
  }

  toggleAnimate() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onAppear(key){
    console.log('appear',key);
  }

  onEnter(key){
    console.log('enter',key);
  }

  onLeave(key){
    console.log('leave',key);
  }

  render() {
    return (
      <div>
        <button onClick={this.toggleAnimate}>toggle</button>
        <Animate
          component=""
          showProp='visible'
          onAppear={this.onAppear}
          onEnter={this.onEnter}
          onLeave={this.onLeave}
          transitionAppear={true}
          transitionName="fade">
         <Box visible={this.state.visible} />
        </Animate>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
