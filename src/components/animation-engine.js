import { removeElement, showInlineElement, showBlockElement, resetElement } from "./utils.js";

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

        this.animationLines = container.querySelector(".animation-lines");

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
            "completed": [this.completeBtn, this.playBtn]
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
        this.animationSteps.forEach((step) => 
            resetElement(step)
        );
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

    async runInSteps(steps) {
      steps = await steps;
      for (const [index, step] of steps.entries()) {
        if (step == undefined) {
          continue;
        }
        if (this.currentState = "paused") {
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

    generateSteps() {

    }

    // Input/output

    parseInput() {
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

    displayArray() {

    }

    setGivenArray() {

    }

    resetAndHideExcept(...elements) {

    }

    showArrow() {

    }

    hideAllArrows() {

    }

    updateTextContent() {

    }

    // Animation states

    pauseAnimation() {
        this.currentState = "paused";
        let remainingSteps = [...this.animationSteps];
        this.resetSteps(this.animationSteps);
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
        //this.runInSteps(pseudocodeSteps);
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
            //this.generateSteps(parsedOutput);
        }
    }

    playAnimation(btn) {
        this.currentState = "playing";
        this.selectSpeed(btn);
        this.setStateButtons();
        //this.runInSteps();
    }

}
