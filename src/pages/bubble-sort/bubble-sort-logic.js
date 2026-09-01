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
