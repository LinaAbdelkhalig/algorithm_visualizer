import React from 'react';
import './Visualizer.css';
import {getMergeAnimations} from '../sortAlgorithms/sortAlgorithms.js';

// Speed of the animation in ms
const ANIMATION_SPEED = 3;
// Number of array elements
const ARRAY_ELEMENTS = 100

export default class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [], // This is the basic array
			sortingInProgress: false, // Flag to check whether sorting
        };
    }

    componentDidMount() {
        if (this.state.array.length === 0) {
			console.log("Component mounted, initializing array");
			this.resetArray();
		} // Reset the array when the component first loads
    }

    resetArray() {
		console.log("resetArray called");
		
		this.setState({sortingInProgress: false}); // Stop sorting if it's in progress
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
                    barOneStyle.height = `${newHeight / 2}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    render() {
		console.log("Rendering Visualizer component");
        const { array } = this.state;

        return (
            <div className="container">
                <div className="array-container">
                    {array.map((value, idx) => (
                        <div
                            className="array-bar"
                            key={idx}
                            style={{
                                height: `${value / 2}px`,
                            }}>
                        </div>
                    ))}
                </div>
                <div className="footer">
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
    return Math.floor(Math.random() * (max - min + 1) + min);
}