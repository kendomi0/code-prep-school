import { AnimationEngine } from "../src/components/animation-engine.js";

let testEngine;

describe("Animation engine functions and variables", () => {
  beforeEach(() => {
  document.body.innerHTML = 
  `<div id="test-container">
    <button class="play-btn"></button>
    <button class="pause-btn"></button>
    <button class="resume-btn"></button>
    <button class="reset-btn"></button>
    <button class="complete-btn"></button>
    <div class="speed-btn-section">
      <button class="slow-btn"></button>
      <button class="medium-btn"></button>
      <button class="fast-btn"></button>
      <button class="fastest-btn"></button>
    </div>
    <p class="invalid-input-msg"></p>
    <p class="loop"></p>
    <p class="select-or-change"></p>
    <p>
      <span class="given-arr"></span>
      <span class="current-arr"></span>
      <span class="i-value"></span>
      <span class="j-value"></span>
      <span class="arrow-1 arrows"></span>
      <span class="arrow-2 arrows"></span>
    </p>
    <input class="animation-input">
  </div>`;
  testEngine = new AnimationEngine(document.getElementById("test-container"));
  })

  describe("setStateButtons()", () => {
      it("shows and hides correct state buttons", () => {
        testEngine.currentState = "playing";
        testEngine.setStateButtons();
        
        expect(testEngine.pauseBtn.style.display).toBe("inline");
        expect(testEngine.resetBtn.style.display).toBe("inline");
        
        expect(testEngine.playBtn.style.display).toBe("none");
        expect(testEngine.resumeBtn.style.display).toBe("none");
        expect(testEngine.completeBtn.style.display).toBe("none");

        expect(testEngine.animationInput.disabled).toBe(true);
      })

      it("enables animation input when state is inactive", () => {
        testEngine.animationInput.disabled = true;
        testEngine.currentState = "inactive";
        testEngine.setStateButtons();
        expect(testEngine.animationInput.disabled).toBe(false);
      })

      it("disables animation input when state is not inactive", () => {
        testEngine.animationInput.disabled = false;
        testEngine.currentState = "paused";
        testEngine.setStateButtons();
        expect(testEngine.animationInput.disabled).toBe(true);
      })
  })

  describe("setSpeed()", () => {
    it("sets correct speed given button", () => {
      testEngine.setSpeed(testEngine.slowBtn);
      expect(testEngine.currentSpeed).toBe("slow");
    });
  })

  describe("setDelay()", () => {
    it("sets correct delay", () => {
      testEngine.setSpeed(testEngine.fastBtn);
      testEngine.setDelay();
      expect(testEngine.delay).toBe(500);
    })
  });

  describe("setSpeedButtons()", () => {
    it("enables/disables and sets speed buttons accordingly ", () => {
      testEngine.setSpeed(testEngine.fastBtn);
      testEngine.setSpeedButtons();
      expect(testEngine.fastBtn.disabled).toBe(true);
      expect(testEngine.fastBtn.classList).not.toContain("inactive");
      expect([testEngine.slowBtn.disabled, testEngine.mediumBtn.disabled, testEngine.fastestBtn.disabled]).toEqual([false, false, false]);
      expect([testEngine.slowBtn, testEngine.mediumBtn, testEngine.fastestBtn].map(btn => btn.classList.contains("inactive"))).toEqual([true, true, true]);
    })
  })

  describe("addElementToLookupTable()", () => {
    it("adds an element to animatedElements", () => {
      let iValue = testEngine.container.querySelector("i-value");
      testEngine.addElementToLookupTable("iValue", iValue)
      expect(testEngine.animatedElements).toHaveProperty("iValue");
    })
  })

  describe("addElementGroupToLookupTable()", () => {
    it("adds element group to animatedElements", () => {
      testEngine.addElementGroupToLookupTable(
        [
          ["slowBtn", testEngine.slowBtn],
          ["mediumBtn", testEngine.mediumBtn]
        ]
      )
      let newAnimatedElements = {
        givenArr: testEngine.givenArr,
        currentArr: testEngine.currentArr,
        slowBtn: testEngine.slowBtn,
        mediumBtn: testEngine.mediumBtn
      }
      expect(testEngine.animatedElements).toEqual(newAnimatedElements);
    })
  });

  describe("populateSteps()", () => {
    it("populates steps", () => {
      let arr = [1,2,3,4]
      let steps = [
        {fn: testEngine.setGivenArray, args: [arr]},
        {fn: testEngine.updateTextContent, args: [testEngine.currentArr, "[1,2,3]"]}
      ]
      testEngine.populateSteps(steps);
      expect(testEngine.animationSteps).toEqual(steps);
    });
  })

  describe("addStep()", () => {
    it("adds step", () => {
      let arr = [1,3,2,4]
      testEngine.addStep(testEngine.setGivenArray, arr);
      let expectedSteps = [
        { fn: testEngine.setGivenArray, args: [arr]}
      ]
      expect(testEngine.animationSteps).toEqual(expectedSteps);
    })
  })

  describe("addGroupedSteps()", () => {
    it("adds grouped steps", () => {
      let arr = [4,1,3,2];
      let steps = [
        { fn: testEngine.setGivenArray, args: [arr]},
        { fn: testEngine.displayArray, args: [arr]}
      ]
      testEngine.addGroupedSteps(steps);
      expect(testEngine.animationSteps[0]).toEqual(steps);
    })
  })

  describe("resetSteps()", () => {
    it("resets steps", () => {
      let arr = [1,3,2,4]
      testEngine.addStep(testEngine.setGivenArray, arr);
      let originalStepLength = testEngine.animationSteps.length;
      expect(originalStepLength).toEqual(1);
      testEngine.resetSteps();
      expect(testEngine.animationSteps.length).toBe(0);
    })
  })

  describe("setErrorMessage()", () => {
    it("sets correct error message", () => {
      testEngine.setErrorMessage("test");
      expect(testEngine.invalidInputMsg.textContent).toBe("test");
    })
  })

  describe("updateTextContent", () => {
    it("updates text content", () => {
      testEngine.updateTextContent("currentArr", "[4]");
      expect(testEngine.currentArr.textContent).toEqual("[4]");
    })
  })

  describe("displayLoopIteration()", () => {
    it("displays correct loop iteration", () => {;
      let loop = testEngine.container.querySelector(".loop");
      testEngine.displayLoopIteration(loop, 2);
      expect(loop.textContent).toBe("second");
      expect(loop.style.textTransform).toBe("capitalize");
    })
  });

  describe("setGivenArray()", () => {
    it("sets given array", () => {;
      testEngine.setGivenArray([1,2,3,4]);
      expect(testEngine.givenArr.textContent).toBe("[1,2,3,4]")
    })
  });

  describe("resetAndHideExcept()", () => {
    it("hides all animated elements except given ones", () => {;
      testEngine.currentArr.textContent = "[1,2,3,4]";
      testEngine.givenArr.textContent = "[4,3,2,1]"
      testEngine.resetAndHideExcept("givenArr");
      expect(testEngine.givenArr.textContent).toBe("[4,3,2,1]");
      expect(testEngine.currentArr.innerHTML).toBe("&nbsp;");
    });

    it("makes arrows invisible", () => {
      let arrow1 = testEngine.container.querySelector(".arrow-1");
      testEngine.addElementToLookupTable("arrow1", arrow1);
      testEngine.resetAndHideExcept("arrow1");
      expect(arrow1).not.toBeVisible;
    })
  });

  describe("Arrow functions", () => {
    let arrow1;
    let arrow2;

    beforeEach(() => {
      arrow1 = testEngine.container.querySelector(".arrow-1");
      arrow2 = testEngine.container.querySelector(".arrow-2");
      testEngine.addElementGroupToLookupTable([
        ["arrow1", arrow1], 
        ["arrow2", arrow2]
      ]);
    })

    describe("showArrow()", () => {
      it("shows correct arrow", () => {
        arrow1.style.visibility = "hidden";
        testEngine.showArrow("arrow1");
        expect(arrow1).toBeVisible;
      });

      it("hides other arrows", () => {
        arrow1.style.visbility = "visible";
        arrow2.style.visibility = "hidden";
        testEngine.showArrow("arrow2");
        expect(arrow1).not.toBeVisible;
      })
    });

    describe("hideAllArrows()", () => {
      it("hides all arrows", () => {
        arrow1.style.visibility = "visible";
        arrow2.style.visibility = "visible";
        testEngine.hideAllArrows();
        expect(arrow1).not.toBeVisible;
        expect(arrow2).not.toBeVisible;
      })
    })
  })

  describe("validateInput()", () => {
    it("validates valid input", () => {
      testEngine.validateInput("1,2,3,4");
      expect(testEngine.isInputValid).toBe(true);
    });

    it("invalidates invalid input", () => {
      testEngine.errorMessages = {
      "test": "testing"
      };
      testEngine.validateInput("testing");
      expect(testEngine.invalidInputMsg.textContent).toBe("testing");
      expect(testEngine.isInputValid).toBe(false);
    });
  })

  describe("hideSpeedButtons()", () => {
    it("hides speed buttons", () => {
      testEngine.hideSpeedButtons();
      expect(testEngine.speedBtnSection.classList).toContain("hidden-responsive");
    })
  })

  describe("selectSpeed()", () => {
    it("changes text from 'select' to 'change' after speed is selected", () => {
      testEngine.selectSpeed("mediumBtn");
      expect(testEngine.selectOrChange.textContent).toBe("Change");
    })
  })

  describe("editSpeed()", () => {
    it("calls playAnimation() if this.currentSpeed is null", () => {
      const spyPlayAnimation = vi.spyOn(testEngine, 'playAnimation').mockImplementation(() => {});
      testEngine.editSpeed(testEngine.mediumBtn);
      expect(spyPlayAnimation).toHaveBeenCalled;
    })

    it("calls changeSpeed() if this.currentSpeed is not null", () => {
      testEngine.currentSpeed = "medium";
      const spyChangeSpeed = vi.spyOn(testEngine, 'changeSpeed').mockImplementation(() => {});
      testEngine.editSpeed(testEngine.mediumBtn);
      expect(spyChangeSpeed).toHaveBeenCalled;
    })
  })

  describe("clearOrHideElement", () => {
    it("makes element invisible if it belongs to arrow class", () => {
      let arrow1 = testEngine.container.querySelector(".arrow-1");
      testEngine.clearOrHideElement(arrow1);
      expect(arrow1.style.visibility).toBe("hidden");
    })

    it("resets element if it does not belong to arrow class", () => {
      testEngine.givenArr.textContent = "[4,3,2,1]";
      testEngine.clearOrHideElement(testEngine.givenArr);
      expect(testEngine.givenArr.innerHTML).toBe("&nbsp;");
    })
  })
});