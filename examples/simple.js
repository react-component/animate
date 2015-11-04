// use jsx to render html, do not modify simple.html
'use strict';

import './assets/slow.less';
import Animate from 'rc-animate';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import assign from 'object-assign';

let transitionEnter = true;
let remove = false;

const Div = (props)=>{
  var {style,show}=props;
  style=assign({},style,{
    display:show?'':'none'
  });
  return <div {...props} style={style}/>
};

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exclusive:false,
      enter: true
    };
  }

  toggle(field){
    this.setState({
      [field]:!this.state[field]
    });
  }

  render() {
    return (
      <div>
        <label><input type='checkbox' onChange={this.toggle.bind(this,'enter')} checked={this.state.enter}/> show</label>
        &nbsp;
        <label><input type='checkbox' onChange={this.toggle.bind(this,'exclusive')} checked={this.state.exclusive}/> exclusive</label>
        <br/><br/>
        <Animate
          component=""
          exclusive={this.state.exclusive}
          showProp='show'
          transitionName="fade">
          <Div show={this.state.enter} style={{
          width: '200px',
          height: '200px',
          backgroundColor: 'red'
          }}/>
        </Animate>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
