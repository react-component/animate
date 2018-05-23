import React from 'react';

// ================== Browser ==================
function checkTransitionSupport() {
  if (typeof document === 'undefined') {
    return false;
  }

  const dom = document.createElement('span');

  const transitionList = [
    'WebkitTransition', 'MozTransition', 'OTransition', 'transition',
  ];

  return transitionList.some(name => name in dom.style);
}

export const supportTransition = checkTransitionSupport();

// =================== Node ====================
/**
 * [Legacy] Find the same children in both prev & next list.
 * Insert not find one before the find one, otherwise in the end. For example:
 * - prev: [1,2,3]
 * - next: [2,4]
 * -> [1,2,4,3]
 */
export function mergeChildren(prev, next) {
  const prevList = React.Children.toArray(prev) || [];
  const nextList = React.Children.toArray(next) || [];
  let mergeList = [];
  const nextChildrenMap = {};
  let missMatchChildrenList = [];

  // Fill matched prev node into next node map
  prevList.forEach((prevNode) => {
    if (prevNode && nextList.some(({ key }) => key === prevNode.key)) {
      if (missMatchChildrenList.length) {
        nextChildrenMap[prevNode.key] = missMatchChildrenList;
        missMatchChildrenList = [];
      } else {
        missMatchChildrenList.push(prevNode);
      }
    }
  });

  // Insert prev node before the matched next node
  nextList.forEach((nextNode) => {
    if (nextNode && nextChildrenMap[nextNode.key]) {
      mergeList = mergeList.concat(nextChildrenMap[nextNode.key]);
    }
    mergeList.push(nextNode);
  });

  mergeList = mergeList.concat(missMatchChildrenList);

  return mergeList;
}

export function cloneProps(props, propList) {
  const newProps = {};
  propList.forEach((prop) => {
    if (prop in props) {
      newProps[prop] = props[prop];
    }
  });

  return newProps;
}

export function getTransitionName(transitionName, transitionType) {
  if (typeof transitionName === 'object') {
    return transitionName[transitionType];
  }

  return `${transitionName}-${transitionType}`;
}

