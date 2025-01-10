import React from 'react';

function Footer() {
    return (
        <footer class="text-center text-lg-start pb-3">
            <div class="container pt-4">
                <div class="row text-center">
                    <p class="mb-0">Created by Lina Abdelkhalig for the ALX Webstack Portfolio Project</p>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-md-6 text-center px-0">
                        <ul id="links">
                            <li>
                                <a href="https://github.com/LinaAbdelkhalig"><i class="fa-brands fa-github"></i></a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/linaabdelkhalig"><i class="fa-brands fa-linkedin"></i></a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-md-6 text-center" id="gh-repo">
                        The <a href="https://github.com/LinaAbdelkhalig/algorithm_visualizer">Github Repository</a> for this project
                    </div>
                </div>
            </div>
        </footer >
    );
}

export default Footer;