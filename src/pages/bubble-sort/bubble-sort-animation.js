import { AnimationEngine } from "../../components/animation-engine.js";

export class BubbleSortAnimation extends AnimationEngine {
    constructor(container) {
        super(container);

        this.errorMessages = {
            tooFewNumbers: "Enter at least 2 numbers.",
            tooManyNumbers: "Enter 10 or less numbers.",
            invalidChar: "The only accepted characters are numbers and commas.",
        }
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

    displayArray() {

    }

    generateSteps() {

    }
}