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

