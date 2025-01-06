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

// export function getQuickSortAnimations(array) {
//     const animations = [];
//     if (array.length <= 1)
//         return animations;
//     const auxArray = array.slice();
//     quickSortHelper(auxArray, 0, array.length - 1, animations);
//     return animations;
// }

// function quickSortHelper(auxArray, startIdx, endIdx, animations) {
//     if (startIdx >= endIdx)
//         return;
//     const pivotIdx = partition(auxArray, startIdx, endIdx, animations);
//     quickSortHelper(auxArray, startIdx, pivotIdx - 1, animations);
//     quickSortHelper(auxArray, pivotIdx + 1, endIdx, animations);
// }

// function partition(auxArray, startIdx, endIdx, animations) {
//     const pivotValue = auxArray[endIdx];
//     let pivotIdx = startIdx;

//     for (let i = startIdx; i < endIdx; i++) {
//         animations.push([i, endIdx]); // Color Change
//         animations.push([i, endIdx]); // Revert Color

//         if (auxArray[i] <= pivotValue) {
//             // Swap animation
//             animations.push([pivotIdx, auxArray[i]]);
//             animations.push([i, auxArray[pivotIdx]]);
            
//             // Perform the swap
//             [auxArray[pivotIdx], auxArray[i]] = [auxArray[i], auxArray[pivotIdx]];
//             pivotIdx++;
//         }
//     }
//     // Final pivot swap animation
//     animations.push([pivotIdx, endIdx]); // Color change
//     animations.push([pivotIdx, endIdx]); // Revert color
//     animations.push([pivotIdx, auxArray[endIdx]]);
//     animations.push([endIdx, auxArray[pivotIdx]]);
    
//     [auxArray[pivotIdx], auxArray[endIdx]] = [auxArray[endIdx], auxArray[pivotIdx]];
    
//     return pivotIdx;
// }

export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxArray = array.slice();
    quickSortHelper(auxArray, 0, auxArray.length - 1, animations);
    return animations;
}

function quickSortHelper(dupBlocks, l, r, animations) {
    if (l >= r) {
        if (l === r) animations.push([null, null, null, l]); // Mark sorted element
        return;
    }

    const pivot = l + Math.floor(Math.random() * (r - l)); // Random pivot
    swap(dupBlocks, l, pivot); // Swap pivot with first element
    animations.push([l, pivot, dupBlocks.slice(), null]); // Animation for pivot swap

    const m = partition(dupBlocks, l, r, animations); // Partition and get new pivot index
    quickSortHelper(dupBlocks, l, m - 1, animations); // Left side recursion
    quickSortHelper(dupBlocks, m + 1, r, animations); // Right side recursion
}

function partition(dupBlocks, l, r, animations) {
    const pivot = l;
    let j = l;

    for (let i = l + 1; i <= r; i++) {
        animations.push([i, pivot, null, null]); // Color change for comparison
        if (dupBlocks[i] < dupBlocks[pivot]) {
            j += 1;
            swap(dupBlocks, i, j); // Swap elements
            animations.push([i, j, dupBlocks.slice(), null]); // After swap animation
        }
    }

    swap(dupBlocks, pivot, j); // Final pivot swap
    animations.push([pivot, j, dupBlocks.slice(), null]); // Pivot swap animation
    animations.push([null, null, null, j]); // Return the final pivot position

    return j;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

