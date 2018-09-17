/* eslint no-console:0, react/no-multi-comp:0 */

import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CSSMotion } from 'rc-animate';
import classNames from 'classnames';
import './CSSMotion.less';

class Demo extends React.Component {
  state = {
    show: true,
    motionLeaveImmediately: false,
  };

  onTrigger = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  onCollapse = () => ({ height: 0 });

  onMotionLeaveImmediately = () => {
    this.setState({
      motionLeaveImmediately: !this.state.motionLeaveImmediately,
    });
  };

  skipColorTransition = (_, event) => {
    // CSSMotion support multiple transition.
    // You can return false to prevent motion end when fast transition finished.
    if (event.propertyName === 'background-color') {
      return false;
    }
    return true;
  };

  styleGreen = () => ({
    background: 'green',
  });

  render() {
    const { show, motionLeaveImmediately } = this.state;

    return (
      <div>
        <label>
          <input type="checkbox" onChange={this.onTrigger} checked={show} />
          {' '}
          Show Component
        </label>

        <div className="grid">
          <div>
            <h2>With Transition Class</h2>
            <CSSMotion
              visible={show}
              motionName="transition"
              onAppearStart={this.onCollapse}
              onEnterStart={this.onCollapse}
              onLeaveActive={this.onCollapse}

              onEnterEnd={this.skipColorTransition}
              onLeaveEnd={this.skipColorTransition}
            >
              {({ style, className }) => (
                <div className={classNames('demo-block', className)} style={style} />
              )}
            </CSSMotion>
          </div>

          <div>
            <h2>With Animation Class</h2>
            <CSSMotion
              visible={show}
              motionName="animation"
              onLeaveActive={this.styleGreen}
            >
              {({ style, className }) => (
                <div className={classNames('demo-block', className)} style={style} />
              )}
            </CSSMotion>
          </div>
        </div>

        <div>
          <button onClick={this.onMotionLeaveImmediately}>
            motionLeaveImmediately
          </button>

          <div>
            {
              motionLeaveImmediately &&
              <CSSMotion
                visible={false}
                motionName="transition"
                onLeaveActive={this.onCollapse}
                motionLeaveImmediately

                onLeaveEnd={this.skipColorTransition}
              >
                {({ style, className }) => (
                  <div className={classNames('demo-block', className)} style={style} />
                )}
              </CSSMotion>
            }
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