/* eslint no-console:0, react/no-multi-comp:0 */

import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'rc-animate';
import classNames from 'classnames';
import './CSSTransition.less';

class Demo extends React.Component {
  state = {
    show: true,
  };

  onTrigger = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  onCollapse = () => ({ height: 0 });

  skipColorTransition = (_, event) => {
    // CSSTransition support multiple transition.
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
    const { show } = this.state;

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
            <CSSTransition
              visible={show}
              transitionName="transition"
              onAppearStart={this.onCollapse}
              onEnterStart={this.onCollapse}
              onLeaveActive={this.onCollapse}

              onEnterEnd={this.skipColorTransition}
              onLeaveEnd={this.skipColorTransition}
            >
              {({ style, className }) => (
                <div className={classNames('demo-block', className)} style={style} />
              )}
            </CSSTransition>
          </div>

          <div>
            <h2>With Animation Class</h2>
            <CSSTransition
              visible={show}
              transitionName="animation"
              onLeaveActive={this.styleGreen}
            >
              {({ style, className }) => (
                <div className={classNames('demo-block', className)} style={style} />
              )}
            </CSSTransition>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));

// Remove for IE9 test
const aaa = document.getElementsByClassName('navbar')[0];
aaa.parentNode.removeChild(aaa);
