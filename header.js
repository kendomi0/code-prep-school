let appHeader = `
    <a href="index.html" class="title">CodePrepSchool</a>
    <nav class="nav-dropdown">
        <div class="dropdown" id="dropdown-time-complexity">
            <div class="dropdown-title">
                Time Complexity
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <div class="nav-links">
                <a href="time-complexity-basics.html" class="nav-item">
                    Time Complexity Basics
                </a>
                <a href="built-in-methods.html" class="nav-item">
                    Built-In Methods
                </a>
                <a href="constant-time-complexity.html" class="nav-item">
                    Constant Time Complexity
                </a>
                <a href="linear-time-complexity.html" class="nav-item">
                    Linear Time Complexity
                </a>
                <a href="quadratic-time-complexity.html" class="nav-item">
                    Quadratic Time Complexity
                </a>
                <a href="time-complexity-quiz.html" class="nav-item">
                    Time Complexity Quiz
                </a>
            </div>
        </div>
        <div class="dropdown" id="dropdown-algorithms">
            <div class="dropdown-title">
                Algorithms
                <i class="fa-solid fa-caret-down"></i>
            </div>
            <div class="nav-links">
                <a href="intro-to-algorithms.html" class="nav-item">
                    Intro to Algorithms
                </a>
                <a href="insertion-sort.html" class="nav-item">
                    Insertion Sort
                </a>
                <a href="bubble-sort.html" class="nav-item">
                    Bubble Sort
                </a>
            </div>
        </div>
    </nav>
`;
document.getElementById("app-header").innerHTML = appHeader;




/* Mobile */

let mobileHeader = `
    <a href="index.html" class="mobile-title">CodePrepSchool</a>
    
    <nav class="mobile-nav">

    <div id="mobile-menu-icon">
        <i class="fa-solid fa-bars fa-xl"></i>

         <div id="full-mobile-dropdown">

            <div class="mobile-dropdown">
                <div class="mobile-dropdown-title mobile-odd-nav">
                    Time Complexity
                    <i class="fa-solid fa-caret-down"></i>
                </div>

                <div class="mobile-nav-links">
                    <a href="time-complexity-basics.html" class="mobile-nav-item">
                        Time Complexity Basics
                    </a>
                    <a href="built-in-methods.html" class="mobile-nav-item">
                        Built-In Methods
                    </a>
                    <a href="constant-time-complexity.html" class="mobile-nav-item">
                        Constant Time Complexity
                    </a>
                    <a href="linear-time-complexity.html" class="mobile-nav-item">
                        Linear Time Complexity
                    </a>
                    <a href="quadratic-time-complexity.html" class="mobile-nav-item">
                        Quadratic Time Complexity
                    </a>
                    <a href="time-complexity-quiz.html" class="mobile-nav-item">
                        Time Complexity Quiz
                    </a>
                </div>

            </div>

            <div class="mobile-dropdown" id="dropdown-algorithms">

                <div class="mobile-dropdown-title mobile-even-nav">
                    Algorithms
                    <i class="fa-solid fa-caret-down"></i>
                </div>

                <div class="mobile-nav-links">
                    <a href="intro-to-algorithms.html" class="mobile-nav-item">
                        Intro to Algorithms
                    </a>
                    <a href="insertion-sort.html" class="mobile-nav-item">
                        Insertion Sort
                    </a>
                    <a href="bubble-sort.html" class="mobile-nav-item">
                        Bubble Sort
                    </a>
                </div>
            </div>
        </div>
    </div>

    </nav>
`;

document.getElementById("mobile-header").innerHTML = mobileHeader;