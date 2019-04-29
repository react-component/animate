/* eslint no-console:0, react/no-multi-comp:0 */

import React from 'react';
import ReactDOM from 'react-dom';
import { CSSMotionList } from 'rc-animate';
import classNames from 'classnames';
import './CSSMotionList.less';

class Demo extends React.Component {
  state = {
    count: 1,
    checkedMap: {},
    keyList: [],
  };

  componentDidMount() {
    this.onFlushMotion();
  }

  onCountChange = ({ target: { value } }) => {
    this.setState({ count: Number(value) });
  };

  onFlushMotion = () => {
    const { count, checkedMap } = this.state;
    const keyList = [];
    for (let i = 0; i < count; i += 1) {
      if (checkedMap[i] !== false) {
        keyList.push(i);
      }
    }
    this.setState({ keyList });
  };

  // Motion
  onCollapse = () => ({ width: 0, margin: '0 -5px 0 0' });

  render() {
    const { count, checkedMap, keyList } = this.state;

    return (
      <div>
        {/* Input field */}
        <div>
          <label>
            node count
            <input type="number" value={count} onChange={this.onCountChange} />
          </label>
          <button onClick={this.onFlushMotion}>Flush Motion</button>
        </div>
        {/* Motion State */}
        <div>
          {new Array(count).fill().map((_, key) => {
            const checked = checkedMap[key] !== false;
            return (
              <label key={key}>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    this.setState({
                      checkedMap: {
                        ...checkedMap,
                        [key]: !checked,
                      },
                    });
                  }}
                />
                {key}
              </label>
            );
          })}
        </div>

          {/* Motion List */}
        <CSSMotionList
          keys={keyList}
          motionName="transition"
          onAppearStart={this.onCollapse}
          onEnterStart={this.onCollapse}
          onLeaveActive={this.onCollapse}
          onEnterEnd={this.skipColorTransition}
          onLeaveEnd={this.skipColorTransition}
        >
          {({ key, className, style }) => {
            return (
              <div
                className={classNames('demo-block', className)}
                style={style}
              >
                <span>{key}</span>
              </div>
            );
          }}
        </CSSMotionList>
      </div>
    );
  }
}

ReactDOM.render(<Demo />, document.getElementById('__react-content'));
