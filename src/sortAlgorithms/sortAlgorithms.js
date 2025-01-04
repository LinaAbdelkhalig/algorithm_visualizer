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

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        const pivotIdx = partition(array, startIdx, endIdx, animations);
        quickSortHelper(array, startIdx, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
}

function partition(array, startIdx, endIdx, animations) {
    const pivot = array[endIdx];
    let i = startIdx - 1;

    for (let j = startIdx; j < endIdx; j++) {
        animations.push([j, endIdx]); // Color Change
        animations.push([j, endIdx]); // Revert Color

        if (array[j] <= pivot) {
            i++;
            animations.push([i, array[j]]); // Swap
            animations.push([j, array[i]]); // Swap
            swap(array, i, j);
        }
    }
    animations.push([i + 1, array[endIdx]]); // Swap
    animations.push([endIdx, array[i + 1]]); // Swap
    swap(array, i + 1, endIdx);

    return i + 1;
}

function swap(array, i, j) {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
