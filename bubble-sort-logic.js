import { displayArray, displayOuterLoopIteration, displayInnerLoopIteration, updateTextContent, showArrow, resetAndHideExcept, setGivenArray, hideAllArrows } from "./bubble-sort-dom.js"

const oneBasedIndexCode = document.getElementById("one-based-index-code");
const zeroBasedIndexCode = document.getElementById("zero-based-index-code");
const indexBase = document.getElementById("index-base");
const zeroBasedBtn = document.querySelector(".zero-based-btn");
const oneBasedBtn = document.querySelector(".one-based-btn");

const indexingToggle = document.getElementById("indexing-toggle");

if (indexingToggle) {
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
}

// Bubble sort input

export const errorMessages = {
  tooFewNumbers: "Enter at least 2 numbers.",
  tooManyNumbers: "Enter 10 or less numbers.",
  invalidChar: "The only accepted characters are numbers and commas."
}

export function parseNumberListInput(numberList) {
  if (numberList.length > 0 && (!(/^[0-9,]+$/.test(numberList)))) {
    return errorMessages["invalidChar"] ?? '';
    }

  const numberArray = numberList.split(",");
  if (numberArray.length < 2) {
    return errorMessages["tooFewNumbers"] ?? '';
  }

  if (numberArray.length > 10) {
    return errorMessages["tooManyNumbers"] ?? '';
  }

  return numberArray.map(num => Number(num))
  }

export function convertBooleanToYesNo(boolean) {
  if (boolean) {
    return "Yes"
  }
  return "No"
}

const step = (fn, ...args) => pseudocodeSteps.push({ fn, args });

function stepGroup(fnArr) {
  pseudocodeSteps.push(fnArr);
}

export let pseudocodeSteps = [];

export function bubbleSort(arr) {
  step(setGivenArray, [...arr]);
  step(showArrow, "arrow1");
  step(displayArray, [...arr]);
  step(showArrow, "arrow2");
  step(updateTextContent, "nValue", arr.length);

  let outerLoopIteration = 0;
  let innerLoopIteration = 0;

  for (let i = 0; i < arr.length - 1; i++) {
    let iOneBased = i + 1;
    stepGroup(
      [
        { fn: resetAndHideExcept, args: ["nValue", "arrValue"]},
        { fn: showArrow, args: ["arrow3"]}
      ]
    )
    innerLoopIteration = 0;
    outerLoopIteration += 1;
    step(displayOuterLoopIteration, outerLoopIteration);
    step(updateTextContent, "iValue", iOneBased);

    for (let j = 0; j < arr.length - i - 1; j++) {
      let jOneBased = j + 1;
      stepGroup([
        { fn: resetAndHideExcept, args: ["iValue", "nValue", "arrValue", "outerLoopTime"] },
        { fn: showArrow, args: ["arrow4"] }
      ]);

      innerLoopIteration += 1;
      step(displayInnerLoopIteration, innerLoopIteration);

      step(updateTextContent, "jValue1", jOneBased);
      step(updateTextContent, "nMinusI", arr.length-iOneBased);
      step(showArrow, "arrow5");
      step(updateTextContent, "jValue2", jOneBased);
      step(updateTextContent, "ajValue", arr[j]);
      step(updateTextContent, "jPlusOne", jOneBased+1);
      step(updateTextContent, "ajPlusOne", arr[j+1]);
      step(updateTextContent, "isGreaterThan", convertBooleanToYesNo(arr[j] > arr[j + 1]));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
        step(showArrow, "arrow6");
        step(updateTextContent, "doSwap", convertBooleanToYesNo(true));
        step(displayArray, [...arr], j);
        step(displayArray, [...arr]);
      }
      else {
        step(updateTextContent, "doSwap", convertBooleanToYesNo(false));
      }
    }
  }
  step(hideAllArrows);
  return arr
}

function bubbleSortAnimation() {
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

