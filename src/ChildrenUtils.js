'use strict';

import React from 'react';

function inChildren(children, child) {
  var found = 0;
  children.forEach(function (c) {
    if (found) {
      return;
    }
    found = c.key === child.key;
  });
  return found;
}

export default {
  inChildren: inChildren,

  toArrayChildren(children) {
    var ret = [];
    React.Children.forEach(children, (c)=> {
      ret.push(c);
    });
    return ret;
  },

  isShownInChildren(children, child, showProp) {
    var found = 0;
    children.forEach((c) => {
      if (found) {
        return;
      }
      found = (c.key === child.key && c.props[showProp]);
    });
    return found;
  },

  inChildrenByKey(children, key) {
    var found = 0;
    if (children) {
      children.forEach((c) => {
        if (found) {
          return;
        }
        found = c.key === key;
      });
    }
    return found;
  },

  isShownInChildrenByKey(children, key, showProp) {
    var found = 0;
    if (children) {
      children.forEach((c) => {
        if (found) {
          return;
        }
        found = c.key === key && c.props[showProp];
      });
    }
    return found;
  },

  isSameChildren(c1, c2) {
    var same = c1.length === c2.length;
    if (same) {
      c1.forEach(function (c, i) {
        if (c !== c2[i]) {
          same = false;
        }
      });
    }
    return same;
  },

  mergeChildren(prev, next) {
    var ret = [];

    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    var nextChildrenPending = {};
    var pendingChildren = [];
    prev.forEach((c) => {
      if (inChildren(next, c)) {
        if (pendingChildren.length) {
          nextChildrenPending[c.key] = pendingChildren;
          pendingChildren = [];
        }
      } else {
        pendingChildren.push(c);
      }
    });

    next.forEach((c) => {
      if (nextChildrenPending.hasOwnProperty(c.key)) {
        ret = ret.concat(nextChildrenPending[c.key]);
      }
      ret.push(c);
    });

    ret = ret.concat(pendingChildren);

    return ret;
  }
};
