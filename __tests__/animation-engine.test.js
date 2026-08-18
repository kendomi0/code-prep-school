import { test } from "vitest";
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
    <button class="slow-btn"></button>
    <button class="medium-btn"></button>
    <button class="fast-btn"></button>
    <button class="fastest-btn"></button>
    <p>
      <span class="given-arr"></span>
      <span class="current-arr"></span>
      <span class="i-value"></span>
      <span class="j-value"></span>
    </p>
    <input class="animation-input">
  </div>`;
  testEngine = new AnimationEngine(document.getElementById("test-container"));
  })

  describe("it correctly sets state buttons and enables/disables animation input", () => {
      it("shows and hides correct state buttons", () => {
        testEngine.currentState = "playing";
        testEngine.setStateButtons();
        [testEngine.pauseBtn, testEngine.resetBtn].forEach(btn => expect(btn).toHaveStyle("display: inline"));
        [testEngine.playBtn, testEngine.resumeBtn, testEngine.completeBtn].forEach(btn => expect(btn).toHaveStyle("display: none"));
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

  it("sets correct speed", () => {
      testEngine.setSpeed(testEngine.slowBtn);
      expect(testEngine.currentSpeed).toBe("slow");
  })

  it("sets correct delay", () => {
    testEngine.setSpeed(testEngine.fastBtn);
    testEngine.setDelay();
    expect(testEngine.delay).toBe(500);
  })

  it("enables/disables and sets speed buttons accordingly ", () => {
    testEngine.setSpeed(testEngine.fastBtn);
    testEngine.setSpeedButtons();
    expect(testEngine.fastBtn.disabled).toBe(true);
    expect(testEngine.fastBtn.classList).not.toContain("inactive");
    expect([testEngine.slowBtn.disabled, testEngine.mediumBtn.disabled, testEngine.fastestBtn.disabled]).toEqual([false, false, false]);
    expect([testEngine.slowBtn, testEngine.mediumBtn, testEngine.fastestBtn].map(btn => btn.classList.contains("inactive"))).toEqual([true, true, true]);
  })

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