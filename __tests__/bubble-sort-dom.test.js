import { setErrorMessage, init, processInput, displayArray, updateTextContent, showArrow, resetAndHideExcept } from "../bubble-sort-dom.js"
import { errorMessages } from "../bubble-sort-logic.js"
import * as bubbleSortDom from "../bubble-sort-dom.js"

describe("Functions for updating DOM elements", () => {
    beforeEach(() => {
        document.body.innerHTML = 
        `<div>
            <p id="invalid-list-msg"></p>
            <p id="arr-value"></p>
            <p id="n-value"></p>
            <p id="i-value"></p>
            <p id="j-value-1"></p>
            <p id="n-minus-i"></p>
            <p id="j-value-2"></p>
            <p id="a-j-value"></p>
            <p id="j-plus-one"></p>
            <p id="a-j-plus-one"></p>
            <p id="is-greater-than"></p>
            <p id="do-swap"></p>
            <p id="outer-loop-time"></p>
            <p id="inner-loop-time"></p>
            <p id="arrow-1"></p>
        </div>`
        init();
    });

    describe('setErrorMessage()', () => {
        it("displays error message", () => {
            setErrorMessage("test");
            const invalidListMsg = document.getElementById("invalid-list-msg");
            expect(invalidListMsg.textContent).toBe("test");
        }
        )
    });

    describe("processInput()", () => {
        it("sets error message if argument is in errorMessages", () => {
            const spySetErrorMessage = vi.spyOn(bubbleSortDom, "setErrorMessage");
            processInput(errorMessages["invalidChar"]);
            expect(spySetErrorMessage).toHaveBeenCalled;
        })
    })

    describe("displayArray()", () => {
        it("sets text content to inputted array", () => {
            displayArray([1,5,3]);
            const arrValue = document.getElementById("arr-value");
            expect(arrValue.textContent).toBe("[1,5,3]")
        })

        it("correctly separates swapped numbers from preceding and succeeding ones", () => {
            displayArray([2,4,1,5,7], 2);
            const arrValue = document.getElementById("arr-value");
        })
    })

    describe("updateTextContent()", () => {
        it("correctly accesses variable name and updates content", () =>  {
            updateTextContent("nValue", 4);
            const nValue = document.getElementById("n-value");
            expect(nValue.textContent).toBe("4")
        })
    })

    describe("showArrow()", () => {
        it("makes given arrow visible", () =>  {
            showArrow("arrow1");
            const arrow1 = document.getElementById("arrow-1");
            expect(arrow1).toHaveStyle("visibility: visible");
        })
    })

    describe("resetAndHideExcept()", () => {
        it("only resets given lines", () =>  {
            const nValue = document.getElementById("n-value");
            const iValue = document.getElementById("i-value");
            const jValue1 = document.getElementById("j-value-1");
            nValue.textContent = "4";
            iValue.textContent = "6";
            jValue1.textContent = "1";
            resetAndHideExcept("nValue");
            expect(nValue.textContent).toBe("4");
            expect(iValue.innerHTML).toBe("&nbsp;");
            expect(jValue1.innerHTML).toBe("&nbsp;");
        })
    })
})
