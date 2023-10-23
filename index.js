function sleep(delay) {
	return new Promise((resolve) => setTimeout(resolve, delay));
}

function updateAnimationSpeed() {
	delay = (MAX_SPEED - speedSlider.value + 1) * 100;
}

/*FOR SLIDERS*/
const sizeSlider = document.getElementById("size-slider");
const speedSlider = document.getElementById("speed-slider");
const sizeDemo = document.getElementById("size-demo");
const speedDemo = document.getElementById("speed-demo");
const MAX_SPEED = 10;
let delay = (MAX_SPEED - speedSlider.value + 1) * 100;

sizeSlider.addEventListener("input", updateSizeValue);
speedSlider.addEventListener("input", function () {
	updateSpeedValue();
	updateAnimationSpeed();
});

function updateSizeValue() {
	sizeDemo.textContent = sizeSlider.value;
	console.log("size: " + sizeSlider.value);
}

function updateSpeedValue() {
	speedDemo.textContent = speedSlider.value;
	console.log("speed: " + speedSlider.value);
}

//call the update functions initially to display the default values
updateSizeValue();
updateSpeedValue();

console.log(delay);

/*FOR ARRAY GENERATION*/
let randomArray = [];
let arrayGenerated = document.getElementById("array-generator");

function arraygenerator() {
	randomArray = []; //first clear previous data
	let arraySize = parseInt(sizeSlider.value);
	for (let i = 0; i < arraySize; i++) {
		let randomNo = Math.floor(Math.random() * 50) + 4;
		randomArray.push(randomNo);
	}
	arrayGenerated.textContent = "Array: [ " + randomArray.join(", ") + " ]";
	generateBarsFromArray(randomArray);
}

arraygenerator(); //display random array at the start

/*Randomize button*/
let randomizeBtn = document.getElementById("randomize-btn");
randomizeBtn.addEventListener("click", () => {
	arraygenerator();

	// Enable the "sort" button
	sortBtn.disabled = false;
	sortBtn.classList.remove("disabled-hover");
});

/*FOR BAR GRAPH GENERATION*/
// Function to generate bars based on array values
function generateBarsFromArray(arr) {
	const barContainer = document.getElementById("bar-container");
	barContainer.innerHTML = ""; // Clear previous bars

	// Find the maximum value in the array
	const maxValue = Math.max(...arr); //...means all the elements

	const numBars = arr.length;
	const barWidth = 100 / numBars; // Calculate the width of each bar

	for (let i = 0; i < numBars; i++) {
		const bar = document.createElement("div");
		bar.className = "bar";

		//Calculate the bar height relative to the maximum value
		const barHeight = (arr[i] / maxValue) * 70;
		bar.style.height = barHeight + "%";

		bar.style.width = barWidth + "%";

		//to display same height for all bars
		//const fixedBarHeight = "50px";
		//bar.style.height = fixedBarHeight;

		const barValue = document.createElement("div");
		barValue.className = "bar-value";
		barValue.textContent = arr[i];
		bar.appendChild(barValue);

		barContainer.appendChild(bar);
	}
}

const compare = "linear-gradient(45deg, #3aa6b4, #5aecff)"; //for comparison
const swapping = "linear-gradient(45deg, orange, yellow)"; //for swapping
const selected = "linear-gradient(45deg, red, pink)"; //for selected

function changeColor(element, color) {
	element.style.backgroundImage = color;
}

function colorReset(element) {
	element.style.backgroundImage = "";
}

function swapBars(bar1, bar2) {
	// Swap the heights of the bars visually
	const tempHeight = bar1.style.height;
	bar1.style.height = bar2.style.height;
	bar2.style.height = tempHeight;
}

function swapText(bar1, bar2) {
	const bar1Text = bar1.querySelector(".bar-value");
	const bar2Text = bar2.querySelector(".bar-value");
	const tempText = bar1Text.textContent;
	bar1Text.textContent = bar2Text.textContent;
	bar2Text.textContent = tempText;
}

// Attach event listeners to all sorting algorithm buttons
document.getElementById("insertion-sort-btn").addEventListener("click", function () {
	setSelectedSortType("insertion");
});

document.getElementById("bubble-sort-btn").addEventListener("click", function () {
	setSelectedSortType("bubble");
});

document.getElementById("selection-sort-btn").addEventListener("click", function () {
	setSelectedSortType("selection");
});

document.getElementById("merge-sort-btn").addEventListener("click", function () {
	setSelectedSortType("merge");
});

document.getElementById("quick-sort-btn").addEventListener("click", function () {
	setSelectedSortType("quick");
});

document.getElementById("shell-sort-btn").addEventListener("click", function () {
	setSelectedSortType("shell");
});

let selectedSortType = null;

function setSelectedSortType(sortType) {
	// Deactivate previously selected button
	if (selectedSortType) {
		document.getElementById(selectedSortType + "-sort-btn").classList.remove("active");
	}

	selectedSortType = sortType;

	// Activate the selected button
	document.getElementById(selectedSortType + "-sort-btn").classList.add("active");
}

function sortTheArray() {
	if (selectedSortType === null) {
		alert("Please select a sorting algorithm.");
		return;
	}

	let sortFunction;

	if (selectedSortType === "insertion") {
		sortFunction = insertionSort;
	} else if (selectedSortType === "bubble") {
		sortFunction = bubbleSort;
	} else if (selectedSortType === "selection") {
		sortFunction = selectionSort;
	} else if (selectedSortType === "merge") {
		sortFunction = startMergeSort;
	} else if (selectedSortType === "quick") {
		sortFunction = startQuickSort;
	} else if (selectedSortType === "shell") {
		sortFunction = shellSort;
	}

	const sortBtn = document.getElementById("sort-btn");

	if (sortFunction) {
		sortFunction(randomArray)
			.then(() => {
				arrayGenerated.textContent = "Sorted Array: " + randomArray.join(", ");
				generateBarsFromArray(randomArray);
				// Display the completion message
				const completionMessage = document.getElementById("completion-message");
				completionMessage.textContent = "\u2705" + " Sorting is completed";
				setTimeout(() => {
					completionMessage.textContent = ""; // Clear the message content
					// Or can remove the entire element if needed:
					// completionMessage.remove();
				}, 3000);
				sortBtn.disabled = true;
				sortBtn.classList.add("disabled-hover");
			})
			.catch((error) => {
				console.error("Sorting error:", error);
			});
	}
}

let sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", function () {
	sortTheArray(randomArray);
});

// // Theme Switcher For Dark Mode

// const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
// const currentTheme = localStorage.getItem("theme");

// function setTheme(theme) {
// 	document.documentElement.setAttribute("color-scheme", theme);
// 	localStorage.setItem("theme", theme);
// }

// if (currentTheme) {
// 	setTheme(currentTheme);
// 	if (currentTheme === "dark") {
// 		toggleSwitch.checked = true;
// 	}
// }

// function switchTheme(e) {
// 	if (e.target.checked) {
// 		setTheme("dark");
// 	} else {
// 		setTheme("light");
// 	}
// }

// toggleSwitch.addEventListener("change", switchTheme);
