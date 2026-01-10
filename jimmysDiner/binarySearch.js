export const binarySearch = function(objectArray, targetObjectID) {
  let high = objectArray.length;
  let low = 0;

  do {
    let median = Math.floor((high + low) / 2);
    let currentObjectID = objectArray[median].id;

    if (currentObjectID == targetObjectID) {
      return objectArray[median];
    } else if (currentObjectID > targetObjectID) {
      high = median;
    } else {
      low = median + 1;
    }
  } while (low < high);

  return null;
};
