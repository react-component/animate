import toArray from 'rc-util/lib/Children/toArray';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';

// ================= Transition =================
// Event wrapper. Copy from react source code
function makePrefixMap(styleProp, eventName) {
  const prefixes = {};

  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes[`Webkit${styleProp}`] = `webkit${eventName}`;
  prefixes[`Moz${styleProp}`] = `moz${eventName}`;
  prefixes[`ms${styleProp}`] = `MS${eventName}`;
  prefixes[`O${styleProp}`] = `o${eventName.toLowerCase()}`;

  return prefixes;
}

const vendorPrefixes = {
  animationend: makePrefixMap('Animation', 'AnimationEnd'),
  transitionend: makePrefixMap('Transition', 'TransitionEnd'),
};

let style = {};

if (canUseDOM) {
  style = document.createElement('div').style;

  if (!('AnimationEvent' in window)) {
    delete vendorPrefixes.animationend.animation;
  }

  if (!('TransitionEvent' in window)) {
    delete vendorPrefixes.transitionend.transition;
  }
}

const prefixedEventNames = {};

function getVendorPrefixedEventName(eventName) {
  const prefixMap = vendorPrefixes[eventName];

  const stylePropList = Object.keys(prefixMap);
  const len = stylePropList.length;
  for (let i = 0; i < len; i += 1) {
    const styleProp = stylePropList[i];
    if (Object.prototype.hasOwnProperty.call(prefixMap, styleProp) && styleProp in style) {
      prefixedEventNames[eventName] = prefixMap[styleProp];
      return prefixedEventNames[eventName];
    }
  }

  return '';
}

export const animationEndName = getVendorPrefixedEventName('animationend');
export const transitionEndName = getVendorPrefixedEventName('transitionend');
export const supportTransition = !!(animationEndName && transitionEndName);

// ==================== Node ====================
/**
 * [Legacy] Find the same children in both prev & next list.
 * Insert not find one before the find one, otherwise in the end. For example:
 * - prev: [1,2,3]
 * - next: [2,4]
 * -> [1,2,4,3]
 */
export function mergeChildren(prev, next) {
  const prevList = toArray(prev);
  const nextList = toArray(next);

  // Skip if is single children
  if (
    prevList.length === 1 && nextList.length === 1 &&
    prevList[0].key === nextList[0].key
  ) {
    return nextList;
  }

  let mergeList = [];
  const nextChildrenMap = {};
  let missMatchChildrenList = [];

  // Fill matched prev node into next node map
  prevList.forEach((prevNode) => {
    if (prevNode && nextList.some(({ key }) => key === prevNode.key)) {
      if (missMatchChildrenList.length) {
        nextChildrenMap[prevNode.key] = missMatchChildrenList;
        missMatchChildrenList = [];
      }
    } else {
      missMatchChildrenList.push(prevNode);
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

export function getTransitionName(transitionName = '', transitionType) {
  if (typeof transitionName === 'object') {
    return transitionName[transitionType];
  }

  return `${transitionName}-${transitionType}`;
}

