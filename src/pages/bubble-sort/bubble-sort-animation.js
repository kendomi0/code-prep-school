import { AnimationEngine } from "../../components/animation-engine.js";
import { convertBoolean } from "../../components/utils.js"

export class BubbleSortAnimation extends AnimationEngine {
    constructor(container) {
        super(container);

        this.outerLoopIteration = container.querySelector(".outer-loop-iteration");
        this.innerLoopIteration = container.querySelector(".inner-loop-iteration");

        this.errorMessages = {
            tooFewNumbers: "Enter at least 2 numbers.",
            tooManyNumbers: "Enter 10 or less numbers.",
            invalidChar: "The only accepted characters are numbers and commas.",
        }

        this.nValue = container.querySelector(".n-value");
        this.iValue = container.querySelector(".i-value");
        this.jValue1 = container.querySelector(".j-value-1");
        this.jValue2 = container.querySelector(".j-value-2");
        this.jPlusOne = container.querySelector(".j-plus-one");
        this.ajValue = container.querySelector(".a-j-value");
        this.ajPlusOne = container.querySelector(".a-j-plus-one");
        this.isGreaterThan = container.querySelector(".is-greater-than");
        this.doSwap = container.querySelector(".do-swap");
        this.nMinusI = container.querySelector(".n-minus-i");

        this.arrow1 = container.querySelector(".arrow-1");
        this.arrow2 = container.querySelector(".arrow-2");
        this.arrow3 = container.querySelector(".arrow-3");
        this.arrow4 = container.querySelector(".arrow-4");
        this.arrow5 = container.querySelector(".arrow-5");
        this.arrow6 = container.querySelector(".arrow-6");

        this.addElementGroupToLookupTable([
            ["iValue", this.iValue],
            ["jValue1", this.jValue1],
            ["jValue2", this.jValue2],
            ["jPlusOne", this.jPlusOne],
            ["ajValue", this.ajValue],
            ["ajPlusOne", this.ajPlusOne],
            ["isGreaterThan", this.isGreaterThan],
            ["doSwap", this.doSwap],
            ["nMinusI", this.nMinusI],
            ["arrow1", this.arrow1],
            ["arrow2", this.arrow2],
            ["arrow3", this.arrow3],
            ["arrow4", this.arrow4],
            ["arrow5", this.arrow5],
            ["arrow6", this.arrow6],
            ["nValue", this.nValue],
            ["outerLoopIteration", this.outerLoopIteration],
            ["innerLoopIteration", this.innerLoopIteration]
        ])
    }

    parseInput(input) {
        if (input.length > 0 && !/^[0-9,]+$/.test(input)) {
        return this.errorMessages["invalidChar"] ?? "";
        }
    
        const splitInput = input.split(",");
        const inputArr = splitInput.filter((element) => element.length > 0);
    
        if (inputArr.length < 2) {
        return this.errorMessages["tooFewNumbers"] ?? "";
        }
    
        if (inputArr.length > 10) {
        return this.errorMessages["tooManyNumbers"] ?? "";
        }
    
        return inputArr.map((num) => Number(num));
    }

    displayArray(arr, j) {
        if (!this.currentArr) {
            console.warn("currentArr element not found");
            return;
        }
        if (j !== undefined) {
            let unchangedNumbersPreceding = [];
            let swappedNumbers = [];
            let unchangedNumbersSucceeding = [];

            for (let i = 0; i < arr.length; i++) {
            if (i < j) {
                unchangedNumbersPreceding.push(arr[i]);
            } else if (i === j || i == j + 1) {
                swappedNumbers.push(arr[i]);
            } else {
                unchangedNumbersSucceeding.push(arr[i]);
            }
            }

            let precedingComma = "";
            let succeedingComma = "";

            if (j > 0) {
            precedingComma = ",";
            }
            if (j + 1 < arr.length - 1) {
            succeedingComma = ",";
            }

            this.currentArr.innerHTML = `[${unchangedNumbersPreceding}${precedingComma}<span style="color:yellow;">${swappedNumbers}</span>${succeedingComma}${unchangedNumbersSucceeding}]`;
        } 
        else {
            this.currentArr.textContent = `[${arr}]`;
        }
    }

    generateSteps(arr) {
        this.addStep(this.setGivenArray.bind(this), [...arr]);
        this.addStep(this.showArrow.bind(this), "arrow1");
        this.addStep(this.displayArray.bind(this), [...arr]);
        this.addStep(this.showArrow.bind(this), "arrow2");
        this.addStep(this.updateTextContent.bind(this), "nValue", arr.length);

        let outerLoopNumber = 0;

        for (let i = 0; i < arr.length - 1; i++) {
        let iOneBased = i + 1;
        this.addGroupedSteps([
            { fn: this.resetAndHideExcept.bind(this), args: ["nValue", "currentArr", "givenArr"] },
            { fn: this.showArrow.bind(this), args: ["arrow3"] },
        ]);
        let innerLoopNumber = 0;
        outerLoopNumber += 1;
        this.addStep(this.updateTextContent.bind(this), "iValue", iOneBased);
        this.addStep(this.displayLoopIteration.bind(this), this.outerLoopIteration, outerLoopNumber);

        for (let j = 0; j < arr.length - i - 1; j++) {
            let jOneBased = j + 1;
            this.addGroupedSteps([
            {
                fn: this.resetAndHideExcept.bind(this),
                args: [
                "iValue",
                "nValue",
                "nMinusI",
                "currentArr",
                "outerLoopIteration",
                "givenArr",
                ],
            },
            { fn: this.showArrow.bind(this), args: ["arrow4"] },
            ]);

            innerLoopNumber += 1;

            this.addStep(this.updateTextContent.bind(this), "jValue1", jOneBased);
            this.addStep(this.displayLoopIteration.bind(this), this.innerLoopIteration, innerLoopNumber);
            if (jOneBased === 1) {
            this.addStep(this.updateTextContent.bind(this), "nMinusI", arr.length - iOneBased);
            }
            this.addStep(this.showArrow.bind(this), "arrow5");
            this.addStep(this.updateTextContent.bind(this), "jValue2", jOneBased);
            this.addStep(this.updateTextContent.bind(this), "ajValue", arr[j]);
            this.addStep(this.updateTextContent.bind(this), "jPlusOne", jOneBased + 1);
            this.addStep(this.updateTextContent.bind(this), "ajPlusOne", arr[j + 1]);
            this.addStep(
            this.updateTextContent.bind(this),
            "isGreaterThan",
            convertBoolean(arr[j] > arr[j + 1]),
            );

            if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            this.addStep(this.showArrow.bind(this), "arrow6");
            this.addStep(this.updateTextContent.bind(this), "doSwap", convertBoolean(true));
            this.addStep(this.displayArray.bind(this), [...arr], j);
            this.addStep(this.displayArray.bind(this), [...arr]);
            } else {
            this.addStep(this.updateTextContent.bind(this), "doSwap", convertBoolean(false));
            }
        }
        }
        this.addStep(this.hideAllArrows.bind(this));
        this.addStep(this.setAnimationToComplete.bind(this));
        return arr;
    }
}