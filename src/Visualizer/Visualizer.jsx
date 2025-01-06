import React from 'react';
import './Visualizer.css';
import {
	getMergeAnimations,
	getQuickSortAnimations
} from '../sortAlgorithms/sortAlgorithms.js';
import Navbar from '../components/Navbar';


// Speed of the animation in ms
const ANIMATION_SPEED = 10;
// Number of array elements
const ARRAY_ELEMENTS = 100

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [], // This is the basic array
		};

		this.resetArray = this.resetArray.bind(this);
		this.mergeSort = this.mergeSort.bind(this);
		this.quickSort = this.quickSort.bind(this);
	}

	componentDidMount() {
		if (this.state.array.length === 0) {
			console.log("Component mounted, initializing array");
			this.resetArray();
		} // Reset the array when the component first loads
	}

	resetArray() {
		console.log("resetArray called");

		const newArray = Array.from({ length: ARRAY_ELEMENTS }, () =>
			intRandomise(5, 1000)
		);

		this.setState((prevState) => {
			if (JSON.stringify(prevState.array) === JSON.stringify(newArray)) {
				return null; // Prevent unnecessary re-render if the array hasn't changed
			}
			return { array: newArray };
		});
	}

	mergeSort() {
		const animations = getMergeAnimations(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');

		if (!arrayBars.length) {
			console.error("No array bars found. Make sure the array is rendered correctly.");
			return;
		}

		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 3 !== 2;

			if (isColorChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				if (barOneIndex >= arrayBars.length || barTwoIndex >= arrayBars.length) {
					console.error("Invalid indices in animations:", barOneIndex, barTwoIndex);
					continue;
				}

				const barOneStyle = arrayBars[barOneIndex].style;
				const barTwoStyle = arrayBars[barTwoIndex].style;
				const color = i % 3 === 0 ? 'red' : 'pink';

				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED);
			} else {
				setTimeout(() => {
					const [barOneIndex, newHeight] = animations[i];
					if (barOneIndex >= arrayBars.length) {
						console.error("Invalid index in animations:", barOneIndex);
						return;
					}
					const barOneStyle = arrayBars[barOneIndex].style;
					barOneStyle.height = `${newHeight / 3}px`;
				}, i * ANIMATION_SPEED);
			}
		}
	}

	// quickSort() {
	// 	const animations = getQuickSortAnimations(this.state.array);
	// 	const arrayBars = document.getElementsByClassName('array-bar');

	// 	if (!arrayBars.length) {
	// 		console.error("No array bars found. Make sure the array is rendered correctly.");
	// 		return;
	// 	}

	// 	for (let i = 0; i < animations.length; i++) {
	// 		const isColorChange = i % 4 < 2;

	// 		if (isColorChange) {
	// 			const [barOneIndex, barTwoIndex] = animations[i];
	// 			const color = i % 4 === 0 ? 'red' : 'pink';

	// 			if (arrayBars[barOneIndex] && arrayBars[barTwoIndex]) {
	// 				setTimeout(() => {
	// 					arrayBars[barOneIndex].style.backgroundColor = color;
	// 					arrayBars[barTwoIndex].style.backgroundColor = color;
	// 				}, i * ANIMATION_SPEED);
	// 			} else {
	// 				console.error("Invalid index in animations:", barOneIndex, barTwoIndex);
	// 			}
	// 		} else {
	// 			setTimeout(() => {
	// 				const [barIndex, newHeight] = animations[i];
	// 				if (arrayBars[barIndex]) {
	// 					arrayBars[barIndex].style.height = `${newHeight / 2}px`;
	// 				} else {
	// 					console.error("Invalid index in animations:", barIndex);
	// 				}
	// 			}, i * ANIMATION_SPEED);
	// 		}
	// 	}
	// }
	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);
		const arrayBars = document.getElementsByClassName('array-bar');
	
		if (!arrayBars.length) {
			console.error("No array bars found. Make sure the array is rendered correctly.");
			return;
		}
	
		for (let i = 0; i < animations.length; i++) {
			const isColorChange = i % 4 < 2; // Color change (for comparisons and swaps)
	
			if (isColorChange) {
				const [barOneIndex, barTwoIndex] = animations[i];
				const color = i % 4 === 0 ? 'red' : 'pink';
	
				if (arrayBars[barOneIndex] && arrayBars[barTwoIndex]) {
					setTimeout(() => {
						arrayBars[barOneIndex].style.backgroundColor = color;
						arrayBars[barTwoIndex].style.backgroundColor = color;
					}, i * ANIMATION_SPEED);
				} else {
					console.error("Invalid index in animations:", barOneIndex, barTwoIndex);
				}
			} else {
				setTimeout(() => {
					const [barOneIndex, newHeight] = animations[i];
					if (arrayBars[barOneIndex]) {
						const barOneStyle = arrayBars[barOneIndex].style;
						barOneStyle.height = `${newHeight/3}px`; // Set height based on array value
					} else {
						console.error("Invalid index in animations:", barOneIndex);
					}
				}, i * ANIMATION_SPEED);
			}
		}
	}	


	render() {
		console.log("Rendering Visualizer component");
		const { array } = this.state;

		return (
			<div className="container-fluid">
				<Navbar
					onResetArray={this.resetArray}
					onMergeSort={this.mergeSort}
					onQuickSort={this.quickSort}
				/>
				<div className="array-container container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								height: `${value / 3}px`,
							}}>
						</div>
					))}
				</div>
			</div>
		);
	}
}

function intRandomise(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}