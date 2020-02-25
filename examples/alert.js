/* eslint no-console:0, react/no-multi-comp:0, react/jsx-no-bind:0 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';

import './assets/index.less';

let seed = 0;

class Alert extends React.Component {
  static propTypes = {
    time: PropTypes.number,
    type: PropTypes.string,
    str: PropTypes.string,
    onEnd: PropTypes.func,
  }

  static defaultProps = {
    onEnd() {},
    time: 2000,
    type: 'success',
  }

  componentDidMount() {
    const props = this.props;
    setTimeout(() => {
      props.onEnd();
    }, props.time);
  }

  render() {
    const props = this.props;
    const style = {
      background: 'yellow',
      width: 600,
      padding: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
    };
    return <div style={style}>{props.str}</div>;
  }
}


class AlertGroup extends React.Component {
  state = {
    alerts: [],
  }

  onEnd = (key) => {
    const alerts = this.state.alerts;
    const ret = [];
    let target;
    alerts.forEach((a) => {
      if (a.key === key) {
        target = a;
      } else {
        ret.push(a);
      }
    });
    if (target) {
      this.setState({
        alerts: ret,
      }, () => {
        if (target.callback) {
          target.callback();
        }
      });
    }
  }

  addAlert = (a) => {
    this.setState({
      alerts: this.state.alerts.concat(a),
    });
  }

  render() {
    const alerts = this.state.alerts;
    const self = this;
    const children = alerts.map((a) => {
      if (!a.key) {
        seed++;
        a.key = String(seed);
      }
      return <Alert {...a} onEnd={self.onEnd.bind(self, a.key)}/>;
    });
    const style = {
      position: 'fixed',
      width: '100%',
      top: 50,
      zIndex: 9999,
    };
    return (<div style={style}>
      <Animate transitionName="fade" component="div">{children}</Animate>
    </div>);
  }
}

let alertGroup;

function alert(str, time, type, callback) {
  if (!alertGroup) {
    const div = document.createElement('div');
    document.body.appendChild(div);
    // eslint-disable-next-line react/no-render-return-value
    alertGroup = ReactDOM.render(<AlertGroup/>, div);
  }
  alertGroup.addAlert({
    str,
    time,
    type,
    callback,
  });
}

function alertFn(i) {
  function m() {
    alert(`${i}`);
  }

  return m;
}

function onClick() {
  for (let i = 0; i < 4; i++) {
    setTimeout(alertFn(i), 1000 * i);
  }
}

ReactDOM.render(
  <div>
    <h2>notification</h2>
    <button onClick={onClick}>show notification</button>
  </div>,
  document.getElementById('__react-content')
);
