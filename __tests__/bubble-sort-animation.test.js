import { BubbleSortAnimation } from "../src/pages/bubble-sort/bubble-sort-animation";

let testAnimation;

describe("Animation engine functions and variables", () => {
  beforeEach(() => {
  document.body.innerHTML = 
  `<div id="test-container">
    <button class="play-btn"></button>
    <button class="pause-btn"></button>
    <button class="resume-btn"></button>
    <button class="reset-btn"></button>
    <button class="complete-btn"></button>
    <button class="slow-btn"></button>
    <button class="medium-btn"></button>
    <button class="fast-btn"></button>
    <button class="fastest-btn"></button>
    <p>
      <span class="given-arr"></span>
      <span class="current-arr"></span>
    </p>
    <input class="animation-input">
  </div>`;

  testAnimation = new BubbleSortAnimation(document.getElementById("test-container"));
  })

    describe("parseInput()", () => {
        it("invalidates input of less than 2 numbers", () => {
            let input = "2";
            let output = testAnimation.parseInput(input);
            expect(output).toEqual(testAnimation.errorMessages["tooFewNumbers"]);
        });
        it("invalidates input of more than 10 numbers", () => {
            let input = "11,10,9,8,7,6,5,4,3,2,1";
            let output = testAnimation.parseInput(input);
            expect(output).toEqual(testAnimation.errorMessages["tooManyNumbers"]);
        });
        it("invalidates input with characters other than commas and numbers", () => {
            let input = "2k";
            let output = testAnimation.parseInput(input);
            expect(output).toEqual(testAnimation.errorMessages["invalidChar"]);
        });
        it("invalidates input with only commas", () => {
            let input = ",,,,";
            let output = testAnimation.parseInput(input);
            expect(output).toEqual(testAnimation.errorMessages["tooFewNumbers"]);
        });
    })
    
    describe("displayArray()", () => {
        it("correctly displays a static array", () => {
            let arr = [1,2,3,4];
            testAnimation.displayArray(arr);
            expect(testAnimation.currentArr.textContent).toBe("[1,2,3,4]")
        });
        it("correctly colors numbers that have changed", () => {
            let arr = [7,9,8,1];
            testAnimation.displayArray(arr, 0);
            expect(testAnimation.currentArr.innerHTML).toBe('[<span style="color:yellow;">7,9</span>,8,1]');
        })
    })

    describe("generateSteps()", () => {
        describe("correctly implements bubble sort", () => {
            it("sorts an array of 5 numbers", () => {
                let arr = [5, 1, 3, 2, 4];
                let sortedArr = testAnimation.generateSteps(arr);
                expect(sortedArr).toEqual(arr.sort((a, b) => a - b));
            })
            it("sorts an array of 2 numbers", () => {
                let arr = [10, 5];
                let sortedArr = testAnimation.generateSteps(arr);
                expect(sortedArr).toEqual(arr.sort((a, b) => a - b));
            })
            it("returns the original array for an already sorted array", () => {
                let arr = [1, 2, 3, 4]
                let sortedArr = testAnimation.generateSteps(arr);
                expect(arr).toEqual(sortedArr);
            })
        })
        it("generates steps", () => {
            let arr = [1, 3, 2, 1];
            testAnimation.generateSteps(arr);
            expect(testAnimation.animationSteps.length).not.toEqual(0);
        })
    })
})