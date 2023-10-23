async function shellSort(arr) {
	const n = arr.length;
	let gap = Math.floor(n / 2);

	while (gap > 0) {
		for (let i = gap; i < n; i++) {
			const temp = arr[i];
			let j = i;

			while (j >= gap && arr[j - gap] > temp) {
				const bar1 = document.querySelectorAll(".bar")[j];
				const bar2 = document.querySelectorAll(".bar")[j - gap];
				changeColor(bar1, compare);
				changeColor(bar2, compare);
				await sleep(delay);

				arr[j] = arr[j - gap];
				swapBars(bar1, bar2);
				swapText(bar1, bar2);

				await sleep(delay);
				colorReset(bar1);
				colorReset(bar2);
				j -= gap;
			}

			arr[j] = temp;
		}

		gap = Math.floor(gap / 2);
	}

	generateBarsFromArray(arr);
}
