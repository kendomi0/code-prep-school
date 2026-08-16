export function removeElement(el) {
    el.style.display = "none";
}

export function showInlineElement(el) {
    el.style.display = "inline";
}

export function showBlockElement(el) {
    el.style.display = "block";
    if (el.classList.contains("hidden-responsive")) {
        el.classList.remove("hidden-responsive");
    }
}

export function resetElement() {
    element.innerHTML = "&nbsp;";
}

export function reverseMap(originalMap) {
    return new Map([...originalMap].map(([key, value]) => [value, key]));
}

export function convertBoolean(boolean) {
  if (boolean) {
    return "Yes";
  }
  return "No";
}

export const ordinalNumbersList = {
  1: "first",
  2: "second",
  3: "third",
  4: "fourth",
  5: "fifth",
  6: "sixth",
  7: "seventh",
  8: "eighth",
  9: "ninth",
  10: "tenth",
};