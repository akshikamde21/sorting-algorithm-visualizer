async function radixSort(arr) {
	const max = Math.max(...arr);
	const maxDigits = Math.floor(Math.log10(max)) + 1;

	for (let digitPlace = 1; digitPlace <= maxDigits; digitPlace++) {
		const buckets = Array.from({ length: 10 }, () => []);

		for (let i = 0; i < arr.length; i++) {
			const num = arr[i];
			const digit = Math.floor((num / Math.pow(10, digitPlace - 1)) % 10);
			const bar = document.querySelectorAll(".bar")[i];
			changeColor(bar, compare);
			await sleep(delay);
			buckets[digit].push({ num, bar });
		}

		let currentIndex = 0;
		for (let digit = 0; digit < 10; digit++) {
			while (buckets[digit].length > 0) {
				const { num, bar } = buckets[digit].shift();
				const targetIndex = currentIndex;
				const targetBar = document.querySelectorAll(".bar")[targetIndex];
				changeColor(bar, swapping);
				changeColor(targetBar, swapping);
				await sleep(delay);
				arr[currentIndex] = num; // Update the original array
				swapBars(bar, targetBar);
				swapText(bar, targetBar);
				await sleep(delay);
				colorReset(bar);
				colorReset(targetBar);
				currentIndex++;
			}
		}
	}

	generateBarsFromArray(arr);
}
