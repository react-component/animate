'use strict';

import './assets/index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
var seed = 0;

var Alert = React.createClass({
  protoTypes: {
    time: React.PropTypes.number,
    type: React.PropTypes.number,
    str: React.PropTypes.string,
    onEnd: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      onEnd: function () {
      },
      time: 2000,
      type: 'success'
    }
  },

  componentDidMount: function () {
    var props = this.props;
    setTimeout(function () {
      props.onEnd();
    }, props.time);
  },

  render: function () {
    var props = this.props;
    return <div style={{
    background: 'yellow',
  width: 600,
  padding: 20,
  marginLeft: 'auto',
  marginRight: 'auto'
    }}>{props.str}</div>;
  }
});


var AlertGroup = React.createClass({
  getInitialState: function () {
    return {
      alerts: []
    }
  },
  addAlert: function (a) {
    this.setState({
      alerts: this.state.alerts.concat(a)
    });
  },
  onEnd: function (key) {
    var alerts = this.state.alerts;
    var ret = [];
    var target;
    alerts.forEach(function (a) {
      if (a.key === key) {
        target = a;
      } else {
        ret.push(a);
      }
    });
    if (target) {
      this.setState({
        alerts: ret
      }, function () {
        if (target.callback) {
          target.callback();
        }
      })
    }
  },
  render: function () {
    var alerts = this.state.alerts;
    var self = this;
    var children = alerts.map(function (a) {
      if (!a.key) {
        seed++;
        a.key = seed + '';
      }
      return <Alert {...a} onEnd={self.onEnd.bind(self, a.key)}/>
    });
    return <div style={{
    position: 'fixed',
  width: '100%',
  top: 50,
  zIndex: 9999
    }}>
      <Animate transitionName="fade">{children}</Animate>
    </div>;
  }
});

var alertGroup;

function alert(str, time, type, callback) {
  if (!alertGroup) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    alertGroup = ReactDOM.render(<AlertGroup/>, div);
  }
  alertGroup.addAlert({
    str: str,
    time: time,
    type: type,
    callback: callback
  });
}

function onClick() {
  for (var i = 0; i < 4; i++) {
    (function (i) {
      setTimeout(function () {
        alert(i);
      }, 1000 * i);
    })(i);
  }
}

ReactDOM.render(<div>
    <h2>notification</h2>
    <button onClick={onClick}>show notification</button>
  </div>,
  document.getElementById('__react-content'));
