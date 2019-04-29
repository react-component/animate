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
            currentKeys.slice(currentIndex, i).map(addKey => ({ key: addKey, add: true }))
          );
          currentIndex = i;
        }
        list.push({
          key,
          keep: true,
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
        remove: true,
      });
    }
  });

  // Add rest to the list
  if (currentIndex < currentLen) {
    list = list.concat(
      currentKeys.slice(currentIndex).map(addKey => ({ key: addKey, add: true }))
    );
  }

  return list;
}

export default diffKeys;