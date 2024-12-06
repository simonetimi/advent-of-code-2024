import fs from "node:fs/promises";

const textInput = await fs.readFile("input.txt", { encoding: "utf8" });

// matches mul(x, y)
const operations = Array.from(
  textInput.matchAll(/mul\(\d+,\d+\)/g),
  (match) => match[0]
);

const operands = operations.map((op) => {
  op = op.replace("mul(", "").replace(")", "");
  return op.split(",");
});

const result = operands.reduce((acc, val) => {
  return acc + parseInt(val[0]) * parseInt(val[1]);
}, 0);

console.log(result);

// part 2

// matches mul(x, y) | do() | don't()
const operationsPart2 = Array.from(
  textInput.matchAll(/(?:mul\(\d+,\d+\)|do\(\)|don't\(\))/g),
  (match) => match[0]
);

let allowOp = true;
const allowedOps = operationsPart2.map((op) => {
  if (op === "do()") {
    allowOp = true;
    return;
  } else if (op === "don't()") {
    allowOp = false;
    return;
  }
  if (allowOp) return op;
});

const operandsPart2 = allowedOps.map((op) => {
  if (!op) return;
  op = op.replace("mul(", "").replace(")", "");
  return op.split(",");
});

const resultPart2 = operandsPart2.reduce((acc, val) => {
  if (!val) return acc;
  return acc + parseInt(val[0]) * parseInt(val[1]);
}, 0);

console.log(resultPart2);
