import React from 'react';

function inChildren(children, child) {
  let found = 0;
  children.forEach((c) => {
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
    const ret = [];
    React.Children.forEach(children, (c)=> {
      ret.push(c);
    });
    return ret;
  },

  inChildrenByKey(children, key) {
    let found = 0;
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

  findShownChildInChildrenByKey(children, key, showProp) {
    let ret = null;
    if (children) {
      children.forEach((c) => {
        if (c.key === key && c.props[showProp]) {
          if (ret) {
            throw new Error('two child with same key for <rc-animate> children');
          }
          ret = c;
        }
      });
    }
    return ret;
  },

  findHiddenChildInChildrenByKey(children, key, showProp) {
    let found = 0;
    if (children) {
      children.forEach((c) => {
        if (found) {
          return;
        }
        found = c.key === key && !c.props[showProp];
      });
    }
    return found;
  },

  isSameChildren(c1, c2, showProp) {
    let same = c1.length === c2.length;
    if (same) {
      c1.forEach((child, i) => {
        const child2 = c2[i];
        if (child.key !== child2.key) {
          same = false;
        } else if (showProp && child.props[showProp] !== child2.props[showProp]) {
          same = false;
        }
      });
    }
    return same;
  },

  mergeChildren(prev, next) {
    let ret = [];

    // For each key of `next`, the list of keys to insert before that key in
    // the combined list
    const nextChildrenPending = {};
    let pendingChildren = [];
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
  },
};
