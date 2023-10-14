async function startQuickSort(arr) {
    const low = 0;
    const high = arr.length - 1;
    await quickSort(arr, low, high);
}

async function quickSort(arr, low, high) {
    if (low < high) {
        const pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

async function partition(arr, low, high) {
    const pivot = arr[high];
    const pivotBar = document.querySelectorAll(".bar")[high];
    changeColor(pivotBar, selected);
    await sleep(delay);

    let i = low - 1;
    for (let j = low; j < high; j++) {
        const bar = document.querySelectorAll(".bar")[j];
        changeColor(bar, compare);
        await sleep(delay);

        if (arr[j] < pivot) {
            i++;
            const iBar = document.querySelectorAll(".bar")[i];
            changeColor(iBar, swapping);
            changeColor(bar, swapping);
            
            await sleep(delay);

            swapBars(bar, iBar);
            swapText(bar, iBar);

            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            colorReset(iBar);
            colorReset(bar);
        }
        colorReset(bar);
    }

    const pivotBar2 = document.querySelectorAll(".bar")[i + 1];
    changeColor(pivotBar2, swapping);
    changeColor(pivotBar, swapping);
    
    await sleep(delay);

    swapBars(pivotBar, pivotBar2);
    swapText(pivotBar, pivotBar2);

    let temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    colorReset(pivotBar2);
    colorReset(pivotBar);

    generateBarsFromArray(arr);

    return i + 1;
}



