import { reverseMap } from "../src/components/utils.js";

it("reverses a map", () => {
  let testMap = new Map([
    ["a", 1],
    ["b", 2],
  ]);
  let expectedMap = new Map([
    [1, "a"],
    [2, "b"],
  ]);
  let reversedTestMap = reverseMap(testMap);
  expect(reversedTestMap).toEqual(expectedMap);
});
