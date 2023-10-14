async function bubbleSort(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
      const bar1 = document.querySelectorAll(".bar")[j];
      const bar2 = document.querySelectorAll(".bar")[j + 1];
          
      changeColor(bar1, compare);
      changeColor(bar2, compare);   
      await sleep(delay);
    
        if (arr[j] > arr[j + 1]) {
          swapBars(bar1,bar2);
    
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          
          swapText(bar1,bar2);
    
          changeColor(bar1, swapping);
          changeColor(bar2, swapping);
          await sleep(delay);
          colorReset(bar1);
          colorReset(bar2);
          

          generateBarsFromArray(arr);
        }        
      colorReset(bar1);
      colorReset(bar2);
    }
  }
}

