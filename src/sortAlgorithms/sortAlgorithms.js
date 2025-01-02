export const mergeSort = array => {
    if (array.length === 1) return array;

    const midIndex = Math.floor(array.length / 2);
    const left = mergeSort(array.slice(0, midIndex));
    const right = mergeSort(array.slice(midIndex));

    const sortedArr = [];

    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] < right[j])
            sortedArr.push(left[i++]);
        else
        sortedArr.push(right[j++]);
    }

    while (i < left.length)
        sortedArr.push(left[i++]);
    while (j < right.length)
        sortedArr.push(right[j++]);
    
    return sortedArr;
}