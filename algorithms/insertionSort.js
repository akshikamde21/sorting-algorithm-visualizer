async function insertionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
      let j = i;
      while (j > 0 && arr[j - 1] > arr[j]) {
        const bar1 = document.querySelectorAll(".bar")[j-1];
        const bar2 = document.querySelectorAll(".bar")[j];    
        changeColor(bar1, compare);
        changeColor(bar2, compare);
        await sleep(delay);  
        
        let temp = arr[j - 1];
        arr[j - 1] = arr[j];
        arr[j] = temp;

        swapBars(bar1, bar2);
        swapText(bar1,bar2);
        changeColor(bar1, swapping);
        changeColor(bar2, swapping);
        await sleep(delay);
          
        j--;
        generateBarsFromArray(arr);
      }
  }
}
