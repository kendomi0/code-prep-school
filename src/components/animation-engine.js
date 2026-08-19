import { removeElement, showInlineElement, showBlockElement, resetElement, makeVisible, makeInvisible, ordinalNumbersList } from "./utils.js";

export class AnimationEngine {
    constructor(container) {
        this.container = container;
        this.animationSteps = [];
        this.currentDelay = 0;
        this.currentSpeed = null;
        this.isInputValid = null;

        this.currentState = "inactive";

        this.errorMessages = Object.freeze({
        });

        this.playBtn = container.querySelector(".play-btn");
        this.pauseBtn = container.querySelector(".pause-btn");
        this.resumeBtn = container.querySelector(".resume-btn");
        this.resetBtn = container.querySelector(".reset-btn");
        this.completeBtn = container.querySelector(".complete-btn");

        this.slowBtn = container.querySelector(".slow-btn");
        this.mediumBtn = container.querySelector(".medium-btn");
        this.fastBtn = container.querySelector(".fast-btn");
        this.fastestBtn = container.querySelector(".fastest-btn");
        this.speedBtnSection = container.querySelector(".speed-btn-section");

        this.invalidListMsg = container.querySelector(".invalid-input-msg");

        this.animationInput = container.querySelector(".animation-input");

        this.selectOrChange = container.querySelector(".select-or-change");

        this.givenArr = container.querySelector(".given-arr");
        this.currentArr = container.querySelector(".current-arr");

        this.arrows = container.querySelectorAll(".arrows");

        this.animatedElements = {
            givenArr: this.givenArr,
            currentArr: this.currentArr,
        }

        this.speeds = new Map([
            [this.slowBtn, "slow"],
            [this.mediumBtn, "medium"],
            [this.fastBtn, "fast"],
            [this.fastestBtn, "fastest"]
        ])

        this.speedBtns = this.speeds.keys();

        this.delays = {
            "slow": 2000,
            "medium": 1000,
            "fast": 500,
            "fastest": 200
        }

        this.states = new Map([
            [this.playBtn, "playing"],
            [this.pauseBtn, "paused"],
            [this.resumeBtn, "resumed"],
            [this.resetBtn, "inactive"],
            [this.completeBtn, "completed"]
        ]);

        this.stateFns = new Map([
            [this.playBtn, this.requestRun.bind(this)],
            [this.pauseBtn, this.pauseAnimation.bind(this)],
            [this.resumeBtn, this.resumeAnimation.bind(this)],
            [this.resetBtn, this.resetAnimation.bind(this)],
        ])

        this.visibleStateButtons = {
            "inactive": [this.playBtn],
            "playing": [this.pauseBtn, this.resetBtn],
            "paused": [this.resumeBtn, this.resetBtn],
            "resumed": [this.pauseBtn, this.resetBtn],
            "completed": [this.completeBtn, this.resetBtn]
        }

        this.speeds.keys().forEach((speedBtn) => {
            if (speedBtn) {
                speedBtn.addEventListener("click", () => this.editSpeed(speedBtn));
            }
        });

        this.stateFns.forEach((fn, btn) => {
            if (btn) {
                btn.addEventListener("click", () => fn());
            }
        })
    }

    // Setting/changing animation state

    setStateButtons() {
        this.states.keys().forEach((btn) => {
            if (this.visibleStateButtons[this.currentState].includes(btn)) {
                showInlineElement(btn);
            }
            else {
                removeElement(btn);
            }
        })
        if (this.currentState == "inactive") {
            this.animationInput.disabled = false;
        }
        else {
            this.animationInput.disabled = true;
        }
    }

    // Setting/changing speed

    setSpeedButtons() {
        this.speeds.forEach((key, value) => {
            if (this.currentSpeed === key) {
                value.disabled = true;
                value.classList.toggle("inactive", false);
            }
            else {
                value.classList.add("inactive");
                value.disabled = false;
            }
        })
    }

    setSpeed(btn) {
        this.currentSpeed = this.speeds.get(btn);
    }

    setDelay() {
        this.delay = this.delays[this.currentSpeed];
    }

    setSpeedAndButtons(btn) {
        this.setSpeed(btn);
        this.setDelay();
        this.setSpeedButtons();
    }

    selectSpeed(btn) {
        this.setSpeedAndButtons(btn);
        this.selectOrChange.textContent = "Change";
    }

    changeSpeed(btn) {
        this.pauseAnimation();
        this.setSpeedAndButtons(btn);
        this.resumeAnimation();
    }

    hideSpeedButtons() {
        this.speedBtnSection.classList.add("hidden-responsive");
    }

    editSpeed(btn) {
        if (this.currentSpeed == null) {
            this.playAnimation(btn);
        }
        else {
            this.changeSpeed(btn);
        }
    }

    // Animation steps

    addStep(fn, ...args) {
        this.animationSteps.push({ fn, args });
    }

    addGroupedSteps(fnArr) {
        this.animationSteps.push(fnArr);
    }

    resetSteps() {
        this.animationSteps.length = 0;
    }

    resetStepsAndLines() {
        this.resetSteps();
        Object.values(this.animatedElements).forEach((el) => 
        {
            if (el.classList.contains("arrows")) {
                makeInvisible(el);
            }
            else {
                resetElement(el);
            }
        });
    }

    populateSteps(steps) {
        this.animationSteps = [...steps];
    }
    
    resetProperties() {
        this.currentState = "inactive";
        this.currentSpeed = null;
        this.currentDelay = 0;
        this.isInputValid = null;
    }

    wait = (ms) => new Promise((res) => setTimeout(res, ms));

    async runInSteps(steps) {
      steps = await steps;
      for (const [index, step] of steps.entries()) {
        if (step == undefined) {
            continue;
        }
        if (this.currentState == "paused") {
            break;
        }
        if (Array.isArray(step)) {
            step.forEach(({ fn, args }) => fn(...args));
        } else {
            step.fn(...step.args);
        }
        await this.wait(this.delay);
        steps[index] = undefined;
      }
    }

    generateSteps(_arr) {
        throw new Error("generateSteps() must be implemented by subclass");
    }

    // Input/output

    parseInput(_input) {
        throw new Error("parseInput() must be implemented by subclass");
    };

    setErrorMessage(parsedOutput) {
        showBlockElement(this.invalidListMsg);
        this.invalidListMsg.textContent = parsedOutput;
    };


    validateInput(parsedOutput) {
        if (Object.values(this.errorMessages).includes(parsedOutput)) {
            this.setErrorMessage(parsedOutput);
            this.isInputValid = false;
        }
        else {
            this.isInputValid = true;
        }
    };

    processOutput(input) {
        let parsedOutput = this.parseInput(input);
        this.validateInput(parsedOutput);
    };

    // Updating DOM elements

    addElementToLookupTable(name, el) {
        this.animatedElements[name] = el;
    }

    addElementGroupToLookupTable(group) {
        group.forEach((subgroup) => {
            this.animatedElements[subgroup[0]] = subgroup[1];
        })
    }

    displayArray() {
        throw new Error("displayArray() must be implemented by subclass");
    }

    setGivenArray(arr) {
        this.givenArr.textContent = `[${arr}]`;
    }

    resetAndHideExcept(...elements) {
        const elementsToKeep = elements.map((element) => this.animatedElements[element]);
        let elementsToReset = Object.values(this.animatedElements).filter((el) => !elementsToKeep.includes(el));
        elementsToReset.forEach((el) => 
        {
            if (el.classList.contains('arrows')) {
                makeInvisible(el);
            }
            else {
                resetElement(el);
            }
        }
        );
    }

    showArrow(arrow) {
        if (!arrow) {
            console.warn(`${arrow} not found`);
            return;
        }
        this.hideAllArrows();
        makeVisible(this.animatedElements[arrow]);
    }

    hideAllArrows() {
        this.arrows.forEach((arrow) => (arrow.style.visibility = "hidden"));
    }

    updateTextContent(element, newContent) {
        if (!(element in this.animatedElements)) {
            console.warn("Element not found in animatedElements");
            return;
        }
        this.animatedElements[element].textContent = `${newContent}`
    }

    displayLoopIteration(element, iteration) {
        element.textContent = `${ordinalNumbersList[iteration]}`;
        element.style.textTransform = "capitalize";
    }

    // Animation states

    pauseAnimation() {
        this.currentState = "paused";
        let remainingSteps = [...this.animationSteps];
        this.resetSteps();
        this.populateSteps(remainingSteps);
        this.setStateButtons();
    }

    resetAnimation() {
        this.resetStepsAndLines();
        this.resetProperties();
        this.setStateButtons();
        this.setSpeedButtons();
        this.hideSpeedButtons();
    }

    setAnimationToComplete() {
        this.currentState = "completed";
        this.setStateButtons();
        this.hideSpeedButtons();
        this.resetSteps();
    }

    resumeAnimation() {
        this.currentState = "resumed";
        this.setStateButtons();
        this.runInSteps(this.animationSteps);
    }

    requestRun() {
        let input = this.animationInput.value;
        let parsedOutput = this.parseInput(input);
        this.validateInput(parsedOutput);
        if (this.isInputValid) {
            if (this.invalidListMsg.style.display == "block") {
                removeElement(this.invalidListMsg);
            }
            this.speedBtnSection.classList.remove("hidden-responsive");
            this.selectOrChange.textContent = "Select";
            this.generateSteps(parsedOutput);
        }
    }

    playAnimation(btn) {
        this.currentState = "playing";
        this.selectSpeed(btn);
        this.setStateButtons();
        this.runInSteps(this.animationSteps);
    }

}
