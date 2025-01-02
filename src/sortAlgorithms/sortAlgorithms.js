// 

export function mergeSort(array) {
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
        const animation = {};
        animation.comparison = [i, j];

        if (auxArray[i] <= auxArray[j]) {
            animation.swap = [k, j];
            mainArray[k++] = auxArray[i++];
        }
        else {
            animation.swap = [k, j];
            mainArray[k++] = auxArray[j++];
        }
        animation.push(animation);
    }

    while (i <= midIndex) {
        animations.push({
            comparison: [i, i],
            swap: [k, i],
        });

        mainArray[k++] = auxArray[i++];
    }

    while (j <= endIndex) {
        animations.push({
            comparison: [j, j],
            swap: [k, j],
        });

        mainArray[k++] = auxArray[j++];
    }
}