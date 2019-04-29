export const STATUS_ADD = 'add';
export const STATUS_KEEP = 'keep';
export const STATUS_REMOVE = 'remove';
export const STATUS_REMOVED = 'removed';

export function wrapKeyToObject(key) {
  if (key && typeof key === 'object' && 'key' in key) {
    return key;
  }
  return { key };
}

export function parseKeys(keys = []) {
  return keys.map(wrapKeyToObject);
}

export function diffKeys(prevKeys = [], currentKeys = []) {
  let list = [];
  let currentIndex = 0;
  const currentLen = currentKeys.length;

  const prevKeyObjects = parseKeys(prevKeys);
  const currentKeyObjects = parseKeys(currentKeys);

  // Check prev keys to insert or keep
  prevKeyObjects.forEach((keyObj) => {
    let hit = false;

    for (let i = currentIndex; i < currentLen; i += 1) {
      const currentKeyObj = currentKeyObjects[i];
      if (currentKeyObj.key === keyObj.key) {
        // New added keys should add before current key
        if (currentIndex < i) {
          list = list.concat(
            currentKeyObjects.slice(currentIndex, i).map(obj => ({ ...obj, status: STATUS_ADD }))
          );
          currentIndex = i;
        }
        list.push({
          ...currentKeyObj,
          status: STATUS_KEEP,
        });
        currentIndex += 1;

        hit = true;
        break;
      }
    }

    // If not hit, it means key is removed
    if (!hit) {
      list.push({
        ...keyObj,
        status: STATUS_REMOVE,
      });
    }
  });

  // Add rest to the list
  if (currentIndex < currentLen) {
    list = list.concat(
      currentKeyObjects.slice(currentIndex).map(obj => ({ ...obj, status: STATUS_ADD }))
    );
  }

  return list;
}
