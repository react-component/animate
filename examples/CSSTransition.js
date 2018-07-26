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

  render() {
    const { show } = this.state;

    return (
      <div>
        <label>
          <input type="checkbox" onChange={this.onTrigger} checked={show} />
          {' '}
          Show Component
        </label>
        <CSSTransition
          visible={show}
          transitionName="transition"
          onAppearStart={this.onCollapse}
          onEnterStart={this.onCollapse}
          onLeaveActive={this.onCollapse}
        >
          {({ style, className }) => {
            return (
              <div
                className={classNames('demo-block', className)}
                style={style}
              >
                666
              </div>
            );
          }}
        </CSSTransition>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
