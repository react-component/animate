import React from 'react';

const utils = {
  toArrayChildren(children) {
    const ret = [];
    React.Children.forEach(children, (child)=> {
      ret.push(child);
    });
    return ret;
  },

  findChildInChildrenByKey(children, key) {
    let ret = null;
    if (children) {
      children.forEach((child) => {
        if (ret) {
          return;
        }
        if (child.key === key) {
          ret = child;
        }
      });
    }
    return ret;
  },

  findShownChildInChildrenByKey(children, key, showProp) {
    let ret = null;
    if (children) {
      children.forEach((child) => {
        if (child.key === key && child.props[showProp]) {
          if (ret) {
            throw new Error('two child with same key for <rc-animate> children');
          }
          ret = child;
        }
      });
    }
    return ret;
  },

  findHiddenChildInChildrenByKey(children, key, showProp) {
    let found = 0;
    if (children) {
      children.forEach((child) => {
        if (found) {
          return;
        }
        found = child.key === key && !child.props[showProp];
      });
    }
    return found;
  },

  isSameChildren(c1, c2, showProp) {
    let same = c1.length === c2.length;
    if (same) {
      c1.forEach((child, index) => {
        const child2 = c2[index];
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
    prev.forEach((child) => {
      if (utils.findChildInChildrenByKey(next, child.key)) {
        if (pendingChildren.length) {
          nextChildrenPending[child.key] = pendingChildren;
          pendingChildren = [];
        }
      } else {
        pendingChildren.push(child);
      }
    });

    next.forEach((child) => {
      if (nextChildrenPending.hasOwnProperty(child.key)) {
        ret = ret.concat(nextChildrenPending[child.key]);
      }
      ret.push(child);
    });

    ret = ret.concat(pendingChildren);

    return ret;
  },
};

export default utils;
