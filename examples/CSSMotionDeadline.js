/* eslint no-console:0, react/no-multi-comp:0, react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSMotion } from 'rc-animate';
import classNames from 'classnames';
import './CSSMotion.less';

class Demo extends React.Component {
  state = {
    show: true,
  };

  onTrigger = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  onStart = (ele, event) => {
    console.log('start!', ele, event);
  };

  onEnd = (ele, event) => {
    console.log('end!', ele, event);
  };

  render() {
    const { show } = this.state;

    return (
      <div>
        <label>
          <input type="checkbox" onChange={this.onTrigger} checked={show} />{' '}
          Show Component
        </label>

        <div className="grid">
          <div>
            <h2>With Transition Class</h2>
            <CSSMotion
              visible={show}
              motionName="no-trigger"
              motionDeadline={1000}
              removeOnLeave
              onAppearStart={this.onStart}
              onEnterStart={this.onStart}
              onLeaveStart={this.onStart}
              onAppearEnd={this.onEnd}
              onEnterEnd={this.onEnd}
              onLeaveEnd={this.onEnd}
            >
              {({ style, className }, ref) => (
                <div
                  ref={ref}
                  className={classNames('demo-block', className)}
                  style={style}
                />
              )}
            </CSSMotion>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

// Remove for IE9 test
// const aaa = document.getElementsByClassName('navbar')[0];
// aaa.parentNode.removeChild(aaa);
