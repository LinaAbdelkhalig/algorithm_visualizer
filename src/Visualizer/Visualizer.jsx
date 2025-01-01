import React from 'react';
import './Visualizer.css';

export default class Visualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array: [], // this is the basic array
		};
	}

	componentDidMount() { // when the component first loads it will call the restArray method
		this.resetArray(); // this method will also be called when we click the generate new arrary button
	}

	resetArray() { // Create a new array
		const array = [];
		for (let i = 0; i < 100; i++) {
			array.push(intRandomise(5, 1000)); // this function will push a random int from the specified interval
		}
		this.setState({ array });
	}

	mergeSort() {

	}

	quickSort() {

	}

	heapSort() {

	}

	bubbleSort() {
		
	}

	render() {
		const { array } = this.state;

		return (
			<div className='container'>
				<div className='array-container'>
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								height: `${value / 2}px`, // Scale the height to fit the screen
							}}>
						</div>
					))}
				</div>
				<div className='footer'>
					<button onClick={() => this.resetArray()}>Generate a New Array</button>
					<button onClick={() => this.mergeSort()}>Merge Sort</button>
					<button onClick={() => this.quickSort()}>Quick Sort</button>
					<button onClick={() => this.heapSort()}>Heap Sort</button>
					<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				</div>
			</div>
		);
	}
}

function intRandomise(min, max) {
	// inclusive
	return Math.floor(Math.random() * (max - min + 1) + min);
}