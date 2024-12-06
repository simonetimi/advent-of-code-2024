import fs from "node:fs/promises";

const textInput = await fs.readFile("input.txt", { encoding: "utf8" });

const listOfLocations = textInput
  .split("\n")
  .flatMap((val) => val.split("   "));

const [list1, list2] = listOfLocations.reduce<[number[], number[]]>(
  (acc, value, idx) => {
    idx % 2 === 0
      ? acc[0].push(parseInt(value.trim()))
      : acc[1].push(parseInt(value.trim()));
    return acc;
  },
  [[], []]
);

list1.sort();
list2.sort();

const resultPartOne = list1.reduce(
  (acc, value, idx) => acc + Math.abs(value - list2[idx]),
  0
);

console.log(resultPartOne);

// part 2

const frequencyMapList2 = new Map();

list2.forEach((location) => {
  frequencyMapList2.set(location, (frequencyMapList2.get(location) || 0) + 1);
});

let resultPartTwo = 0;

list1.forEach((location) => {
  const frequency = frequencyMapList2.get(location) || 0;
  resultPartTwo += location * frequency;
});

console.log(resultPartTwo);
