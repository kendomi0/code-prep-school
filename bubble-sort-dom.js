import { parseNumberListInput } from "./bubble-sort-logic.js"
import { errorMessages } from "./bubble-sort-logic.js"

let invalidListMsg
let getNumberListBtn
let inputNumberList

export function init() {
    invalidListMsg = document.getElementById("invalid-list-msg");
    getNumberListBtn = document.getElementById("get-number-list-btn");
    inputNumberList = document.getElementById("input-number-list");
}

export function setErrorMessage(result) {
    invalidListMsg.textContent = result;
    invalidListMsg.style.display = "block";
}

export function processInput(result) {
    if (Object.values(errorMessages).includes(result)) {
      setErrorMessage(result);
    }
}

export function getBubbleSortResults() {
  invalidListMsg.style.display = "none";
  const result = parseNumberListInput(inputNumberList.value);
  processInput(result);
}

init();

if (getNumberListBtn) {
  getNumberListBtn.addEventListener("click", function () {
    getBubbleSortResults();
  });
}