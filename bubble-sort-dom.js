import { parseNumberListInput, errorMessages, bubbleSort, pseudocodeSteps, step } from "./bubble-sort-logic.js"

let invalidListMsg
let inputNumberList
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

export function init() {
  invalidListMsg = document.getElementById("invalid-list-msg");
  inputNumberList = document.getElementById("input-number-list");
  arrValue = document.getElementById("arr-value");
  nValue = document.getElementById("n-value");
  playBtn = document.getElementById("play-btn");
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
    arrValue, nValue, iValue, jValue1, nMinusI, jValue2, ajValue, jPlusOne, ajPlusOne, isGreaterThan, doSwap, outerLoopTime, innerLoopTime
  }

  arrowsObject = { arrow1, arrow2, arrow3, arrow4, arrow5, arrow6 };
}

export function setErrorMessage(result) {
  invalidListMsg.textContent = result;
}

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

export function processInput(result) {
    if (Object.values(errorMessages).includes(result)) {
      setErrorMessage(result);
    }
}

export function getBubbleSortResults() {
  invalidListMsg.innerHTML = "&nbsp;"
  const result = parseNumberListInput(inputNumberList.value);
  processInput(result);
  return result;
}

init();

export function setGivenArray(arr) {
  if (!givenArray) {
    console.warn("givenArray element not found");
    return;
  }
  givenArray.textContent = `[${arr}]`;
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

export function displayOuterLoopIteration(num) {
  if (!outerLoopTime) {
    console.warn("outerLoopTime element not found");
    return;
  }
  outerLoopTime.textContent = `${ordinalNumbers[num]}`;
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


function resetAndHide(clearEverything = null) {
  resetLines();
  hideAllArrows();
  if (clearEverything) {
    reset(nValue);
    reset(arrValue);
  }
}

export function resetAndHideExcept(...elements) {
  hideAllArrows();
  const linesToKeep = elements.map(element => variableElements[element]);
  const linesToReset = Object.values(variableElements).filter(line => !linesToKeep.includes(line));
  linesToReset.forEach(reset);
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

const wait = ms => new Promise(res => setTimeout(res, ms));

async function runInSteps(steps, delay = 500) {
  for (const step of steps) {
    if (Array.isArray(step)) {
      step.forEach(({ fn, args }) => fn(...args));
    } else {
      step.fn(...step.args);
    }
    await wait(delay);
  }
}

if (playBtn) {
  playBtn.addEventListener("click", function () {
    resetAndHide("clear");
    const results = getBubbleSortResults();
    const isInputValid = invalidListMsg.innerHTML == "&nbsp;"
    if (isInputValid) {
      playBtn.textContent = "Playing..."
      bubbleSort(results);
      step(() => playBtn.textContent = "Complete!");
      runInSteps(pseudocodeSteps);
    }
  });
}