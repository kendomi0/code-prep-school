import { setLinks } from "../lib/links.js"

let appHeader = `
        <a data-link="home" class="title">CodePrepSchool</a>
        <nav class="nav-dropdown">
            <div class="dropdown" id="dropdown-time-complexity">
                <div class="dropdown-title">
                    Time Complexity
                    <i class="fa-solid fa-caret-down"></i>
                </div>
                <div class="nav-links">
                    <a data-link="time-complexity-basics" class="nav-item">
                        Time Complexity Basics
                    </a>
                    <a data-link="built-in-methods" class="nav-item">
                        Built-In Methods
                    </a>
                    <a data-link="constant-time-complexity" class="nav-item">
                        Constant Time Complexity
                    </a>
                    <a data-link="linear-time-complexity" class="nav-item">
                        Linear Time Complexity
                    </a>
                    <a data-link="quadratic-time-complexity" class="nav-item">
                        Quadratic Time Complexity
                    </a>
                    <a data-link="time-complexity-quiz" class="nav-item">
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
                    <a data-link="intro-to-algorithms" class="nav-item">
                        Intro to Algorithms
                    </a>
                    <a data-link="insertion-sort" class="nav-item">
                        Insertion Sort
                    </a>
                    <a data-link="bubble-sort" class="nav-item">
                        Bubble Sort
                    </a>
                </div>
            </div>
        </nav>
    `;

if (document.getElementById("app-header")) {
  document.getElementById("app-header").innerHTML = appHeader;
}

/* Mobile */

let mobileHeader = `
    <a data-link="home" class="mobile-title">CodePrepSchool</a>
    
    <nav class="mobile-nav">

    <div id="mobile-menu-icon">
        <i id="hamburger-menu" class="fa-solid fa-bars fa-xl"></i>

         <div id="full-mobile-dropdown">

            <div class="mobile-dropdown">
                <div id="time-complexity-title" class="mobile-dropdown-title mobile-odd-nav">
                    Time Complexity
                    <i class="fa-solid fa-caret-down"></i>
                </div>

                <div id="time-complexity-links" class="mobile-nav-links">
                    <a data-link="time-complexity-basics" class="mobile-nav-item">
                        Time Complexity Basics
                    </a>
                    <a data-link="built-in-methods" class="mobile-nav-item">
                        Built-In Methods
                    </a>
                    <a data-link="constant-time-complexity" class="mobile-nav-item">
                        Constant Time Complexity
                    </a>
                    <a data-link="linear-time-complexity" class="mobile-nav-item">
                        Linear Time Complexity
                    </a>
                    <a data-link="quadratic-time-complexity" class="mobile-nav-item">
                        Quadratic Time Complexity
                    </a>
                    <a data-link="time-complexity-quiz" class="mobile-nav-item">
                        Time Complexity Quiz
                    </a>
                </div>

            </div>

            <div class="mobile-dropdown" id="dropdown-algorithms">

                <div id="algorithm-title" class="mobile-dropdown-title mobile-even-nav">
                    Algorithms
                    <i class="fa-solid fa-caret-down"></i>
                </div>

                <div id="algorithm-links" class="mobile-nav-links">
                    <a data-link="intro-to-algorithms" class="mobile-nav-item">
                        Intro to Algorithms
                    </a>
                    <a data-link="insertion-sort" class="mobile-nav-item">
                        Insertion Sort
                    </a>
                    <a data-link="bubble-sort" class="mobile-nav-item">
                        Bubble Sort
                    </a>
                </div>
            </div>
        </div>
    </div>

    </nav>
`;
if (document.getElementById("mobile-header")) {
  document.getElementById("mobile-header").innerHTML = mobileHeader;
}

// Open the dropdown by clicking menu icon

const dropdown = document.getElementById("full-mobile-dropdown");

if (document.getElementById("hamburger-menu")) {
  document
    .getElementById("hamburger-menu")
    .addEventListener("click", function (e) {
      e.stopPropagation();
      dropdown.style.visibility =
        dropdown.style.visibility === "visible" ? "hidden" : "visible";
    });
}

// Open the subdropdowns

const mobileDropdownTitles = document.querySelectorAll(
  ".mobile-dropdown-title",
);
const mobileDropdowns = document.querySelectorAll(".mobile-dropdown");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-links");

function resetDropdownLinks(index) {
  mobileNavLinks.forEach((mnl) => {
    if (mnl == mobileNavLinks[index]) return;
    mnl.style.display = "none";
  });
}

mobileDropdownTitles.forEach((title, index) => {
  title.addEventListener("click", () => {
    resetDropdownLinks(index);
    mobileNavLinks[index].style.display =
      mobileNavLinks[index].style.display === "block" ? "none" : "block";
  });
});

// Set links
setLinks();