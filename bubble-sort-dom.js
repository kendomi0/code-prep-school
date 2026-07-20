import { parseNumberListInput, errorMessages, bubbleSort, pseudocodeSteps, setPseudocodeSteps } from "./bubble-sort-logic.js"

let invalidListMsg
let numberListInput
let arrValue
let playBtn
let nValue
let iValue
let jValue1
let jValue2
let jPlusOne
let ajValue
let ajPlusOne
let isGreaterThan
let doSwap
let nMinusI
let variableElements
let arrow1
let arrow2
let arrow3
let arrow4
let arrow5
let arrow6
let arrowsObject
let outerLoopTime
let innerLoopTime
let arrows
let lines
let loopTimes
let indices
let givenArray
let pauseBtn
let playNewBtn
let buttons
let resumeBtn
let cancelBtn
let completeBtn

let slowBtn
let mediumBtn
let fastBtn
let fastestBtn
let speedBtns
let speedBtnSection
let selectOrChange

export function init() {
  invalidListMsg = document.getElementById("invalid-list-msg");
  numberListInput = document.getElementById("number-list-input");
  arrValue = document.getElementById("arr-value");
  nValue = document.getElementById("n-value");

  playBtn = document.getElementById("play-btn");
  pauseBtn = document.getElementById("pause-btn");
  playNewBtn = document.getElementById("play-new-btn");
  resumeBtn = document.getElementById("resume-btn");
  cancelBtn = document.getElementById("cancel-btn");
  completeBtn = document.getElementById("complete-btn");

  slowBtn = document.getElementById("slow-btn");
  mediumBtn = document.getElementById("medium-btn");
  fastBtn = document.getElementById("fast-btn");
  fastestBtn = document.getElementById("fastest-btn");
  speedBtns = document.querySelectorAll(".speed-btns");
  speedBtnSection = document.getElementById("speed-btn-section");
  selectOrChange = document.getElementById("select-or-change");

  iValue = document.getElementById("i-value");
  jValue1 = document.getElementById("j-value-1");
  jValue2 = document.getElementById("j-value-2");
  jPlusOne = document.getElementById("j-plus-one");
  ajValue = document.getElementById("a-j-value");
  ajPlusOne = document.getElementById("a-j-plus-one");
  isGreaterThan = document.getElementById("is-greater-than");
  doSwap = document.getElementById("do-swap");
  nMinusI = document.getElementById("n-minus-i");
  outerLoopTime = document.getElementById("outer-loop-time");
  innerLoopTime = document.getElementById("inner-loop-time");
  lines = document.querySelectorAll(".lines");
  loopTimes = document.querySelectorAll(".loop-time");
  indices = document.querySelectorAll(".index");
  givenArray = document.getElementById("given-array");

  arrow1 = document.getElementById("arrow-1");
  arrow2 = document.getElementById("arrow-2");
  arrow3 = document.getElementById("arrow-3");
  arrow4 = document.getElementById("arrow-4");
  arrow5 = document.getElementById("arrow-5");
  arrow6 = document.getElementById("arrow-6");
  arrows = document.querySelectorAll(".arrows");

  variableElements = {
    arrValue, nValue, iValue, jValue1, nMinusI, jValue2, ajValue, jPlusOne, ajPlusOne, isGreaterThan, doSwap, outerLoopTime, innerLoopTime, playBtn, givenArray, pauseBtn, playNewBtn, resumeBtn, cancelBtn, completeBtn
  }

  buttons = { playBtn, pauseBtn, playNewBtn, resumeBtn, cancelBtn, completeBtn }

  arrowsObject = { arrow1, arrow2, arrow3, arrow4, arrow5, arrow6 };
}

init();

// Defining variables to be used in functions

export const ordinalNumbers = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
  7: "seventh",
  8: "eighth",
  9: "ninth",
  10: "tenth"
}

// Functions for Setting DOM elements

export function setErrorMessage(result) {
  invalidListMsg.textContent = result;
}

export function setGivenArray(arr) {
  if (!givenArray) {
    console.warn("givenArray element not found");
    return;
  }
  givenArray.textContent = `[${arr}]`;
}

export function processInput(result) {
    if (Object.values(errorMessages).includes(result)) {
      setErrorMessage(result);
    }
}

export function displayOuterLoopIteration(num) {
  if (!outerLoopTime) {
    console.warn("outerLoopTime element not found");
    return;
  }
  outerLoopTime.textContent = `${ordinalNumbers[num]}`;
  outerLoopTime.style.textTransform = "capitalize";
}

export function displayInnerLoopIteration(num) {
  if (!innerLoopTime) {
    console.warn("innerLoopTime element not found");
    return;
  }
  innerLoopTime.textContent = `${ordinalNumbers[num]}`
  innerLoopTime.style.textTransform = "capitalize";
}

function reset(element) {
  element.innerHTML = "&nbsp;";
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

export function hideAllArrows() {
  arrows.forEach(
    (arrow) => arrow.style.visibility = "hidden"
  );
}

export function showArrow(numberArrow) {
  if (!arrowsObject[numberArrow]) {
    console.warn(`${numberArrow} element not found`);
    return;
  }
  hideAllArrows();
  arrowsObject[numberArrow].style.visibility = "visible";
}

export function updateTextContent(element, newContent) {
  if (!variableElements[element]) {
    console.warn(`No element found for "${element}"`);
    return;
  }
  variableElements[element].textContent = `${newContent}`;
}

export function disableInput(element) {
  element.disabled = true;
}

export function enableInput(element) {
  element.disabled = false;
}

export function hideBtn(btn) {
  btn.style.display = "none";
}

export function showBtn(btn) {
  btn.style.display = "inline";
}

export function checkInputValidity() {
  return invalidListMsg.innerHTML == "&nbsp;"
}

// Bubble sort functions

export function getBubbleSortResults() {
  invalidListMsg.innerHTML = "&nbsp;"
  const result = parseNumberListInput(numberListInput.value);
  processInput(result);
  return result;
}

export function displayArray(arr, j) {
  if (!arrValue) {
    console.warn("arrValue element not found");
    return;
  }
  if (j !== undefined) {
    let unchangedNumbersPreceding = [];
    let swappedNumbers = [];
    let unchangedNumbersSucceeding = [];

    for (let i = 0; i < arr.length; i++) {
      if (i < j) {
        unchangedNumbersPreceding.push(arr[i])
      }
      else if (i===j || i==j+1) {
        swappedNumbers.push(arr[i])
      }
      else {
        unchangedNumbersSucceeding.push(arr[i])
      }
    }

    let precedingComma = "";
    let succeedingComma = "";

    if (j>0) {
      precedingComma = ",";
    }
    if (j+1<arr.length-1) {
      succeedingComma = ",";
    }

    arrValue.innerHTML = `[${unchangedNumbersPreceding}${precedingComma}<span style="color:yellow;">${swappedNumbers}</span>${succeedingComma}${unchangedNumbersSucceeding}]`;
  }
  else {
    arrValue.textContent = `[${arr}]`;
  }
}

function clearAll() {
  resetLines();
  hideAllArrows();
  reset(nValue);
  reset(arrValue);
  reset(givenArray);
}

export function resetAndHideExcept(...elements) {
  hideAllArrows();
  const linesToKeep = elements.map(element => variableElements[element]);
  let linesToReset = Object.values(variableElements).filter(line => !linesToKeep.includes(line) && !Object.values(buttons).includes(line));
  linesToReset.forEach(reset);
}

export let isPaused = false;

export function setToComplete() {
  [pauseBtn, cancelBtn].forEach(hideBtn);
  [playNewBtn, completeBtn].forEach(showBtn);
  
  enableInput(numberListInput);
  pseudocodeSteps.length = 0;
  speedBtnSection.classList.add("hidden-responsive");
}

const wait = ms => new Promise(res => setTimeout(res, ms));

let delay = 1000;

let isCurrentlyPlaying = false;

export async function runInSteps(steps) {
  steps = await steps;
  for (const [index, step] of steps.entries()) {
    if (step == undefined) {
      continue;
    }
    if (isPaused) {
      break;
    }
    if (Array.isArray(step)) {
      step.forEach(({ fn, args }) => fn(...args));
    } else {
      step.fn(...step.args);
    }
    await wait(delay);
    steps[index] = undefined;
  }
}

export function enableStopButton() {
  disableInput(numberListInput);
  hideBtn(playBtn);
  [pauseBtn, cancelBtn].forEach(showBtn);
}

export function stopBubbleSort() {
  pseudocodeSteps.length = 0;
  clearAll();
}

export function clearBubbleSort(steps) {
  steps.length = 0;
}

export function getStepsLeft(steps) {
  setPseudocodeSteps(pseudocodeSteps.filter(pStep => pStep !== undefined));
}

// Button states

export function getSpeed(btn) {
  const speeds = { "slow-btn": 2000, "medium-btn": 1000, "fast-btn": 500, "fastest-btn": 200 };
  return speeds[btn.id]
}

export function setSpeedButtonState(btn) {
  btn.disabled = true;
  for (const currentElement of speedBtns) {
    currentElement.disabled = currentElement === btn;
    if (currentElement === btn) {
      currentElement.classList.toggle('inactive', false);
    }
    else {
      currentElement.classList.add('inactive');
    }
  }
}

let isSpeedSelected = false;
let isNewRun = false;

export function changeSpeed(btn) {
  console.log("Speed changed function called");
  pauseBubbleSort();
  setSpeedButtonState(btn);
  delay = getSpeed(btn);
  resumeBubbleSort();
}

export function selectSpeed(btn) {
  console.log("Speed selected function called");
  setSpeedButtonState(btn);
  delay = getSpeed(btn);
  isSpeedSelected = true;
  selectOrChange.textContent = "Change";
}

export function initiateRun(btn) {
  selectSpeed(btn);
  [playNewBtn, pauseBtn, resumeBtn, completeBtn].forEach(hideBtn);
  enableStopButton();
  let stepsLeft = runInSteps(pseudocodeSteps);
  isNewRun = false;
}

export function editSpeed(btn) {
  console.log('clicked', event.currentTarget);
  if (isNewRun) {
    initiateRun(btn);
  }
  else {
    changeSpeed(btn);
  }
}

// Animation states
export function pauseBubbleSort() {
  isPaused = true;
  let remainingSteps = [...pseudocodeSteps];
  clearBubbleSort(pseudocodeSteps);
  setPseudocodeSteps(remainingSteps);
  hideBtn(pauseBtn);
  showBtn(resumeBtn);
}

export function cancelBubbleSort() {
  stopBubbleSort();
  [pauseBtn, resumeBtn, cancelBtn].forEach(hideBtn);
  showBtn(playNewBtn);
  isPaused = false;
  enableInput(numberListInput);
  speedBtnSection.classList.add("hidden-responsive");
}

export function resumeBubbleSort() {
  isCurrentlyPlaying = true;
  isPaused = false;
  runInSteps(pseudocodeSteps);
  [resumeBtn, playNewBtn].forEach(hideBtn);
  showBtn(pauseBtn);
}

export function playBubbleSort() {
  selectOrChange.textContent = "Select";
  completeBtn.style.display = "none";
  isCurrentlyPlaying = true;
  clearAll();
  const results = getBubbleSortResults();
  const isInputValid = checkInputValidity();
  if (isInputValid) {
    isNewRun = true;
    speedBtnSection.classList.remove("hidden-responsive");
    speedBtns.forEach(
      (speedBtn) => {
        speedBtn.disabled = false;
        speedBtn.classList.add("inactive");
      }
    );
    bubbleSort(results);
  }
}

// Event listeners

const buttonFns = [
  [playBtn, playBubbleSort],
  [pauseBtn, pauseBubbleSort],
  [playNewBtn, playBubbleSort],
  [resumeBtn, resumeBubbleSort],
  [cancelBtn, cancelBubbleSort]
]

buttonFns.forEach(
  ([btn, fn]) => 
   {
    if (btn) {
      btn.addEventListener('click', fn)
    }
  } 
);

speedBtns.forEach(
  (speedBtn) => {
    if (speedBtn) {
      speedBtn.addEventListener('click', () => editSpeed(speedBtn));
    }
  }
);