import fs from "node:fs/promises";

const textInput = await fs.readFile("input.txt", { encoding: "utf8" });

const [inputFirstPart, inputSecondPart] = textInput.split("\n\n");

// extracts the pages pairs in tuples and converts them to numbers
const orderingRules = inputFirstPart
  .split("\n")
  .map((pagePair) => pagePair.split("|").map((page) => parseInt(page)));

// extracts the pages in discrete arrays, converting them to numbers
const pagesToUpdate = inputSecondPart
  .split("\n")
  .map((pages) => pages.split(",").map((page) => parseInt(page)));

function isValidOrder(pages: number[], rules: number[][]): boolean {
  for (const [pageBefore, pageAfter] of rules) {
    // only check rules where both pages are present in the update
    if (pages.includes(pageBefore) && pages.includes(pageAfter)) {
      const beforeIndex = pages.indexOf(pageBefore);
      const afterIndex = pages.indexOf(pageAfter);

      // if page before is after, set is not valid
      if (beforeIndex > afterIndex) {
        return false;
      }
    }
  }
  return true;
}

const validPages = pagesToUpdate.map((pagesSet) => {
  if (isValidOrder(pagesSet, orderingRules)) return pagesSet;
  else return null;
});

let middleValueSumPart1 = 0;

for (const pagesSet of validPages) {
  if (!pagesSet) continue;
  const middleValueIndex = (pagesSet.length - 1) / 2;
  middleValueSumPart1 += pagesSet[middleValueIndex];
}

console.log(middleValueSumPart1);

// part 2

const pageSortFn = (a: number, b: number) => {
  // check rule that contains both pages
  for (const [pageBefore, pageAfter] of orderingRules) {
    if (a === pageBefore && b === pageAfter) return -1;
    if (a === pageAfter && b === pageBefore) return 1;
  }
  return 0;
};

const validPagesPart2 = pagesToUpdate.map((pagesSet) => {
  if (isValidOrder(pagesSet, orderingRules)) return null;
  else return [...pagesSet.sort(pageSortFn)];
});

let middleValueSumPart2 = 0;

for (const pagesSet of validPagesPart2) {
  if (!pagesSet) continue;
  const middleValueIndex = (pagesSet.length - 1) / 2;
  middleValueSumPart2 += pagesSet[middleValueIndex];
}

console.log(middleValueSumPart2);
