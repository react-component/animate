export const STATUS_ADD = 'add';
export const STATUS_KEEP = 'keep';
export const STATUS_REMOVE = 'remove';

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

  // Check prev keys to insert or keep
  prevKeys.forEach((key) => {
    let hit = false;

    for (let i = currentIndex; i < currentLen; i += 1) {
      const currentKey = currentKeys[i];
      if (currentKey === key) {
        // New added keys should add before current key
        if (currentIndex < i) {
          list = list.concat(
            currentKeys.slice(currentIndex, i).map(addKey => ({ key: addKey, status: STATUS_ADD }))
          );
          currentIndex = i;
        }
        list.push({
          key,
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
        key,
        status: STATUS_REMOVE,
      });
    }
  });

  // Add rest to the list
  if (currentIndex < currentLen) {
    list = list.concat(
      currentKeys.slice(currentIndex).map(addKey => ({ key: addKey, status: STATUS_ADD }))
    );
  }

  return list;
}
