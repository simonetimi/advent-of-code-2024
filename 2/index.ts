import fs from "node:fs/promises";

const textInput = await fs.readFile("input.txt", { encoding: "utf8" });

const reports = textInput.split("\n");

function checkSafety(report: string) {
  const reportValues = report.split(" ").map(Number);
  const direction = reportValues[0] > reportValues[1] ? "asc" : "desc";

  for (let i = 1; i < reportValues.length; i++) {
    const diff = reportValues[i] - reportValues[i - 1];
    if (
      diff === 0 ||
      Math.abs(diff) > 3 ||
      (diff > 0 && direction === "asc") ||
      (diff < 0 && direction === "desc")
    ) {
      return false;
    }
  }
  return true;
}

const safeReports = reports.reduce((acc, report) => {
  if (checkSafety(report)) return acc + 1;
  return acc;
}, 0);

console.log(safeReports);

// part 2

function checkSafetyWithDampener(report: string) {
  if (checkSafety(report)) return true;

  // try removing one level and check safety without it (tolerance = 1 level)
  const reportValues = report.split(" ").map(Number);
  for (let i = 0; i < reportValues.length; i++) {
    const tempReportArray = reportValues.toSpliced(i, 1);
    const tempReportString = tempReportArray.join(" ");
    if (checkSafety(tempReportString)) return true;
  }
  return false;
}

const safeReportsWithProblemDampener = reports.reduce((acc, report) => {
  if (checkSafetyWithDampener(report)) return acc + 1;
  return acc;
}, 0);

console.log(safeReportsWithProblemDampener);
