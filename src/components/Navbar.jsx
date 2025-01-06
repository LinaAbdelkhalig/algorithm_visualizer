import React from 'react';

function Navbar({ onResetArray, onMergeSort, onQuickSort }) {
    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="navbar-brand" href="#">Navbar</a>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <button className="btn btn-outline-primary mx-2" onClick={onResetArray}>Generate a New Array</button>
                        </li>
                        <li class="nav-item">
                            <button className="btn btn-outline-primary mx-2" onClick={onMergeSort}>Merge Sort</button>
                        </li>
                        <li class="nav-item">
                            <button className="btn btn-outline-primary mx-2" onClick={onQuickSort}>Quick Sort</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
