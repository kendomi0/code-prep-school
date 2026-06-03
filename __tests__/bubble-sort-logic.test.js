import { parseNumberListInput } from '../bubble-sort-logic.js';
import { errorMessages } from '../bubble-sort-logic.js'
import { bubbleSort } from '../bubble-sort-logic.js'

describe('parseNumberListInput', () => {

  describe('invalid characters', () => {
    it('rejects input with letters', () => {
        let result = parseNumberListInput('1,2,abc');
        expect(result).toBe(errorMessages["invalidChar"])
    });

    it('rejects input with special characters', () => {
        let result = parseNumberListInput('1,2,3!');
        expect(result).toBe(errorMessages["invalidChar"]);
    });
  });

  describe('too few numbers', () => {
    it('rejects a single number with no comma', () => {
        let result = parseNumberListInput('5');
        expect(result).toBe(errorMessages["tooFewNumbers"]);
    });

    it('rejects empty string', () => {
        let result = parseNumberListInput('');
        expect(result).toBe(errorMessages["tooFewNumbers"]);
    });
  });

  describe('too many numbers', () => {
    it('rejects more than 10 comma-separated values', () => {
        let result = parseNumberListInput('1,2,3,4,5,6,7,8,9,10,11');
        expect(result).toBe(errorMessages["tooManyNumbers"]);
    });
  });

  describe('valid input', () => {
    it('accepts exactly 2 numbers', () => {
        let result = parseNumberListInput('3,7');
        expect(result).toStrictEqual([3, 7]);
    });

    it('accepts exactly 10 numbers', () => {
        let result = parseNumberListInput('1,2,3,4,5,6,7,8,9,10');
        expect(result).toStrictEqual([1,2,3,4,5,6,7,8,9,10]);
    });

    it('accepts numbers in the middle of the range', () => {
        let result = parseNumberListInput('10,20,30,40,50');
        expect(result).toStrictEqual([10,20,30,40,50]);
    });
  });
});

describe("bubbleSort()", () => {
    it("sorts a list of 2 numbers", () => {
        let result = bubbleSort([3, 2]);
        expect(result).toStrictEqual([2, 3]);
    });

    it("sorts a list of 3 numbers", () => {
        let result = bubbleSort([4,8,3]);
        expect(result).toStrictEqual([3,4,8]);
    });

    it("sorts a list of 10 numbers", () => {
        let result = bubbleSort([1, 4, 3, 2, 9, 8, 5, 6, 10, 7]);
        expect(result).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it("sorts lists with duplicates", () =>  {
        let result = bubbleSort([4, 4, 5, 2, 2, 3]);
        expect(result).toStrictEqual([2, 2, 3, 4, 4, 5]);
    })

    it("returns input when list is already sorted", () =>  {
        let result = bubbleSort([1, 2, 3, 4]);
        expect(result).toStrictEqual([1, 2, 3, 4]);
    })
})
