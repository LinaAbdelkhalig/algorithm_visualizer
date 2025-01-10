import React, { useState } from 'react';

function Navbar({ onResetArray, onMergeSort, onQuickSort }) {
    // State to track the selected algorithm
    const [selectedAlgorithm, setSelectedAlgorithm] = useState("Select Algorithm");

    // Handle sorting based on the selected algorithm
    const handleSort = () => {
        if (selectedAlgorithm === "Merge Sort") {
            onMergeSort();
        } else if (selectedAlgorithm === "Quick Sort") {
            onQuickSort();
        } else {
            alert("Please select a sorting algorithm!");
        }
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Sorting Visualizer</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button className="btn btn-outline-primary mx-2" onClick={onResetArray}>Generate a New Array</button>
                        </li>
                        <li className="nav-item dropdown">
                            <button
                                className="btn btn-outline-primary dropdown-toggle mx-2"
                                id="algorithmDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {selectedAlgorithm}
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="algorithmDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => setSelectedAlgorithm("Merge Sort")}
                                    >
                                        Merge Sort
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => setSelectedAlgorithm("Quick Sort")}
                                    >
                                        Quick Sort
                                    </button>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-success mx-2" onClick={handleSort}>
                                Go
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
