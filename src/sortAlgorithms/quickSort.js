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