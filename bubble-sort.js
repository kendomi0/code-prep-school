hljs.highlightAll();

const oneBasedIndexCode = document.getElementById("one-based-index-code");
const zeroBasedIndexCode = document.getElementById("zero-based-index-code");
const indexBase = document.getElementById("index-base");
const zeroBasedBtn = document.querySelector(".zero-based-btn");
const oneBasedBtn = document.querySelector(".one-based-btn");

zeroBasedIndexCode.style.display = "none";

const indexingToggle = document.getElementById("indexing-toggle");

indexingToggle.addEventListener("click", function () {
  if (zeroBasedIndexCode.style.display === "none") {
    zeroBasedIndexCode.style.display = "block";
    oneBasedIndexCode.style.display = "none";

    indexingToggle.classList.remove("one-based-btn");
    indexingToggle.classList.add("zero-based-btn");

    indexBase.textContent = "1";
  } else {
    zeroBasedIndexCode.style.display = "none";
    oneBasedIndexCode.style.display = "block";

    indexingToggle.classList.remove("zero-based-btn");
    indexingToggle.classList.add("one-based-btn");

    indexBase.textContent = "0";
  }
});

// Bubble sort animation

const outerLoopTime = document.getElementById("outer-loop-time");
const innerLoopTime = document.getElementById("inner-loop-time");
const nValue = document.getElementById("n-value");
const iValue = document.getElementById("i-value");
const playBtn = document.getElementById("play-btn");
const jValue1 = document.getElementById("j-value-1");
const jValue2 = document.getElementById("j-value-2");
const jPlusOne = document.getElementById("j-plus-one");
const arrValue = document.getElementById("arr-value");
const ajValue = document.getElementById("a-j-value");
const ajPlusOne = document.getElementById("a-j-plus-one");
const isGreaterThan = document.getElementById("is-greater-than");
const doSwap = document.getElementById("do-swap");
const lines = document.querySelectorAll(".lines");
const loopTimes = document.querySelectorAll(".loop-time");
let nMinusI = document.getElementById("n-minus-i");
let indices = document.querySelectorAll(".index");

const arrow1 = document.getElementById("arrow-1");
const arrow2 = document.getElementById("arrow-2");
const arrow3 = document.getElementById("arrow-3");
const arrow4 = document.getElementById("arrow-4");
const arrow5 = document.getElementById("arrow-5");
const arrow6 = document.getElementById("arrow-6");
const arrows = document.querySelectorAll(".arrows");

function reset(element) {
  element.textContent = "";
}

function resetLines() {
  lines.forEach(reset);

  loopTimes.forEach((loopTime) => {
    loopTime.innerHTML = "&nbsp;";
  });

  indices.forEach((index) => {
    index.innerHTML = "&nbsp;";
  });
}

function hide(element) {
  element.style.visibility = "hidden";
}

function resetAndHide(clearEverything = null) {
  resetLines();
  hideAllArrows();
  if (clearEverything) {
    reset(nValue);
    reset(arrValue);
  }
}

function hideAllArrows() {
  arrows.forEach(hide);
}

function showArrow(numberArrow) {
  numberArrow.style.visibility = "visible";
}

function hideAndShow(numberArrow) {
  hideAllArrows();
  showArrow(numberArrow);
}

function bubbleSortAnimation() {
  playBtn.disabled = true;
  const steps = [
    // First step
    () => showArrow(arrow1),

    () => (arrValue.textContent = "[4, 8, 3]"),
    () => (innerLoopTime.textContent = "First"),
    () => (outerLoopTime.textContent = "first"),

    () => hideAndShow(arrow2),
    () => (nValue.textContent = "3"),

    () => hideAndShow(arrow3),
    () => (iValue.textContent = "1"),

    () => hideAndShow(arrow4),
    () => (jValue1.textContent = "1"),
    () => (nMinusI.textContent = "2"),

    () => hideAndShow(arrow5),
    () => (jValue2.textContent = "1"),
    () => (ajValue.textContent = "4"),
    () => (jPlusOne.textContent = "2"),
    () => (ajPlusOne.textContent = "8"),
    () => (isGreaterThan.textContent = "No"),

    () => hideAndShow(arrow6),
    () => (doSwap.textContent = "No"),

    // Second step

    () => {
      (resetAndHide(), (iValue.textContent = "1"));
      nMinusI.textContent = "2";
      outerLoopTime.textContent = "first";
    },

    () => (innerLoopTime.textContent = "Second"),

    () => hideAndShow(arrow4),
    () => (jValue1.textContent = "2"),

    () => hideAndShow(arrow5),
    () => (jValue2.textContent = "2"),
    () => (ajValue.textContent = "8"),
    () => (jPlusOne.textContent = "3"),
    () => (ajPlusOne.textContent = "3"),
    () => (isGreaterThan.textContent = "Yes"),

    () => hideAndShow(arrow6),
    () => (doSwap.textContent = "Yes"),
    () => (arrValue.innerHTML = "[4, <span class='swapped'>3, 8</span>]"),

    // Third step

    () => {
      resetAndHide();
      arrValue.innerHTML = "[4, 3, 8]";
    },

    () => (innerLoopTime.textContent = "First"),
    () => (outerLoopTime.textContent = "second"),

    () => showArrow(arrow3),
    () => (iValue.textContent = "2"),

    () => hideAndShow(arrow4),
    () => (jValue1.textContent = "1"),
    () => (nMinusI.textContent = "1"),

    () => hideAndShow(arrow5),
    () => (jValue2.textContent = "1"),
    () => (ajValue.textContent = "4"),
    () => (jPlusOne.textContent = "2"),
    () => (ajPlusOne.textContent = "3"),
    () => (isGreaterThan.textContent = "Yes"),

    () => hideAndShow(arrow6),
    () => (doSwap.textContent = "Yes"),
    () => (arrValue.innerHTML = "[<span class='swapped'>3, 4,</span> 8]"),

    () => {
      arrValue.innerHTML = "[3, 4, 8]";
      hideAllArrows();
      playBtn.textContent = "Complete!";
    },

    () => {
      playBtn.innerHTML = '<i class="fa-solid fa-play"></i> Play again';
      playBtn.disabled = false;
    },
  ];

  steps.forEach((fn, i) => setTimeout(fn, (i + 1) * 2000));
}

playBtn.addEventListener("click", () => {
  resetAndHide(true);
  playBtn.textContent = "Playing...";
  bubbleSortAnimation();
});
