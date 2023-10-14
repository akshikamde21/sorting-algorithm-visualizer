async function selectionSort(arr){
    let n = arr.length;

    for(let i=0 ; i<n-1; i++){ //till second last el
        let mini = i;
        const bar1 = document.querySelectorAll(".bar")[mini];
        changeColor(bar1, selected);
        await sleep(delay);
        for(let j=i+1; j<n; j++){ //till last el           
            const bar2 = document.querySelectorAll(".bar")[j];
            changeColor(bar2, compare);
            await sleep(delay);
            if(arr[j]<arr[mini]){
                mini = j;
            }
            colorReset(bar2);
        }
        changeColor(bar1, swapping);
        changeColor(document.querySelectorAll(".bar")[mini], swapping); 
        await sleep(delay);

        swapBars(bar1, document.querySelectorAll(".bar")[mini]);
        swapText(bar1, document.querySelectorAll(".bar")[mini]);

        let temp = arr[mini];
        arr[mini] = arr[i];
        arr[i] = temp;

        await sleep(delay);
        
        colorReset(bar1);
        colorReset(document.querySelectorAll(".bar")[mini]);
        generateBarsFromArray(arr);
    }
} 

