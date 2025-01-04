export function getMergeAnimations(array) {
    const animations = [];

    if (array.length <= 1)
        return array;

    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);

    return animations;
}

function mergeSortHelper(mainArray, startIndex, endIndex, auxArray, animations) {
    if (startIndex === endIndex)
        return;

    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxArray, startIndex, midIndex, mainArray, animations);
    mergeSortHelper(auxArray, midIndex + 1, endIndex, mainArray, animations);
    mergify(mainArray, startIndex, midIndex, endIndex, auxArray, animations);
}

function mergify(mainArray, startIndex, midIndex, endIndex, auxArray, animations)
{
    let k = startIndex;
    let i = startIndex;
    let j = midIndex + 1;

    while (i <= midIndex && j <= endIndex) {
        animations.push([i, j]); // Color Change
        animations.push([i, j]); // Revert Color

        if (auxArray[i] <= auxArray[j]) {
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        }
        else {
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }

    while (i <= midIndex) {
        animations.push([i, j]); // Color Change
        animations.push([i, j]); // Revert Color
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIndex) {
        animations.push([j, j]); // Color Change
        animations.push([j, j]); // Rever Color
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}