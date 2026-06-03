import { setErrorMessage } from "../bubble-sort-dom.js"
import { init } from "../bubble-sort-dom.js"
import { processInput } from "../bubble-sort-dom.js"
import { errorMessages } from "../bubble-sort-logic.js"
import * as bubbleSortDom from "../bubble-sort-dom.js"

describe("Functions for setting error messages", () => {
    beforeEach(() => {
        document.body.innerHTML = `<p id="invalid-list-msg"></p>`
        init();
    });

    describe('setErrorMessage()', () => {
        it("displays error message", () => {
            setErrorMessage("test");
            const invalidListMsg = document.getElementById("invalid-list-msg");
            expect(invalidListMsg).toHaveStyle("display: block");
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
})
