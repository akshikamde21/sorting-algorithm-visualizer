async function startMergeSort(arr) {
    const start = 0;
    const end = arr.length - 1;
    await mergeSort(arr, start, end);
}

async function mergeSort(arr, start, end) {
    if (start < end) {
        const mid = Math.floor((start + end) / 2);
        await mergeSort(arr, start, mid);
        await mergeSort(arr, mid + 1, end);
        await merge(arr, start, mid, end);
    }
}

async function merge(arr, start, mid, end) {
    const n1 = mid - start + 1;
    const n2 = end - mid;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    //copy data to temporary arrays
    for (let i = 0; i < n1; i++) {
        leftArr[i] = arr[start + i];
    }
    for (let j = 0; j < n2; j++) {
        rightArr[j] = arr[mid + 1 + j];
    }

    let i = 0, j = 0, k = start;

    while (i < n1 && j < n2) {
        const bar1 = document.querySelectorAll(".bar")[start + i];
        const bar2 = document.querySelectorAll(".bar")[mid + 1 + j];

        changeColor(bar1, compare);
        changeColor(bar2, compare);
        await sleep(delay);

        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            i++;
        } else {
            arr[k] = rightArr[j];
            j++;
        }

        swapBars(bar1, bar2);
        swapText(bar1, bar2);

        changeColor(bar1, swapping);
        changeColor(bar2, swapping); 

        colorReset(bar1);
        colorReset(bar2);

        generateBarsFromArray(arr);

        k++;
        await sleep(delay);
    }


    while (i < n1) {
        const bar1 = document.querySelectorAll(".bar")[start + i];
        changeColor(bar1, compare);
        await sleep(delay);

        arr[k] = leftArr[i];

        swapBars(bar1, document.querySelectorAll(".bar")[k]);
        swapText(bar1, document.querySelectorAll(".bar")[k]);

        colorReset(bar1);

        generateBarsFromArray(arr);

        i++;
        k++;
        await sleep(delay);
    }

    while (j < n2) {
        const bar2 = document.querySelectorAll(".bar")[mid + 1 + j];
        changeColor(bar2, compare);
        await sleep(delay);

        arr[k] = rightArr[j];

        swapBars(bar2, document.querySelectorAll(".bar")[k]);
        swapText(bar2, document.querySelectorAll(".bar")[k]);

        colorReset(bar2);

        generateBarsFromArray(arr);

        j++;
        k++;
        await sleep(delay);
    }
}


