/* eslint no-console:0, react/no-multi-comp:0 */

import './assets/slow.less';
import Animate from 'rc-animate';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Div = (props) => {
  const { style, show, ...restProps } = props;
  const newStyle = { ...style, display: show ? '' : 'none' };
  return <div {...restProps} style={newStyle}/>;
};

Div.propTypes = {
  style: PropTypes.object,
  show: PropTypes.bool,
};

class Demo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      exclusive: false,
      enter: true,
    };
  }

  toggle(field) {
    this.setState({
      [field]: !this.state[field],
    });
  }

  render() {
    const style = {
      width: '200px',
      height: '200px',
      backgroundColor: 'red',
    };
    return (
      <div>
        <label><input
          type="checkbox"
          onChange={this.toggle.bind(this, 'enter')}
          checked={this.state.enter}
        />
          show</label>
        &nbsp;
        <label><input
          type="checkbox"
          onChange={this.toggle.bind(this, 'exclusive')}
          checked={this.state.exclusive}
        />
          exclusive</label>
        <br/><br/>
        <Animate
          component=""
          exclusive={this.state.exclusive}
          showProp="show"
          transitionName="fade"
        >
          <Div show={this.state.enter} style={style}/>
        </Animate>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
