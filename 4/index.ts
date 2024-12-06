import fs from "node:fs/promises";

const textInput = await fs.readFile("input.txt", { encoding: "utf8" });

const text = textInput.split("\n");

const target1 = "XMAS";

// traverse it: horizontally, vertically, backwards, diagnonally

function checkMatch(
  rowPosition: number,
  columnPosition: number,
  verticalDirection: number,
  horizontalDirection: number
) {
  for (let i = 0; i < target1.length; i++) {
    if (
      // check out of boundaries
      rowPosition + i * verticalDirection < 0 ||
      columnPosition + i * horizontalDirection < 0 ||
      rowPosition + i * verticalDirection >= text.length ||
      columnPosition + i * horizontalDirection >= text[rowPosition].length ||
      // check target
      text[rowPosition + i * verticalDirection][
        columnPosition + i * horizontalDirection
      ] !== target1[i]
    ) {
      return false;
    }
  }
  return true;
}

let result = 0;

for (let i = 0; i < text.length; i++) {
  for (let j = 0; j < text[i].length; j++) {
    if (checkMatch(i, j, 0, 1)) result++; // Horizontal right
    if (checkMatch(i, j, 0, -1)) result++; // Horizontal left
    if (checkMatch(i, j, 1, 0)) result++; // Vertical down
    if (checkMatch(i, j, -1, 0)) result++; // Vertical up
    if (checkMatch(i, j, 1, 1)) result++; // Diagonal down-right
    if (checkMatch(i, j, 1, -1)) result++; // Diagonal down-left
    if (checkMatch(i, j, -1, 1)) result++; // Diagonal up-right
    if (checkMatch(i, j, -1, -1)) result++; // Diagonal up-left
  }
}

console.log(result);

// part 2

// check if diagonal is "MAS" or "SAM"
function checkDiagonal(
  startRow: number,
  startCol: number,
  rowDirection: number,
  colDirection: number,
  text: string[]
): boolean {
  // get the 3 characters
  let diagonal = "";
  for (let i = 0; i < 3; i++) {
    const row = startRow + i * rowDirection;
    const col = startCol + i * colDirection;
    if (row < 0 || row >= text.length || col < 0 || col >= text[row].length) {
      return false;
    }
    diagonal += text[row][col];
  }

  return diagonal === "MAS" || diagonal === "SAM";
}

let resultPart2 = 0;

// check center point
for (let row = 1; row < text.length - 1; row++) {
  for (let col = 1; col < text[row].length - 1; col++) {
    // check if center is 'A'
    if (text[row][col] !== "A") continue;

    // check both diagonals
    const topLeftToBottomRight = checkDiagonal(row - 1, col - 1, 1, 1, text);
    const topRightToBottomLeft = checkDiagonal(row - 1, col + 1, 1, -1, text);

    if (topLeftToBottomRight && topRightToBottomLeft) {
      resultPart2++;
    }
  }
}

console.log(resultPart2);
