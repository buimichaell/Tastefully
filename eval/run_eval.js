import fs from "fs";
import fetch from "node-fetch";

const tests = JSON.parse(
  fs.readFileSync("./test_cases.json", "utf-8")
);

const BASE_URL = "http://localhost:3001/recommend";

let passed = 0;

function checkOutput(output, test) {
  const text = output.toLowerCase();

  for (const must of test.must_include) {
    if (!text.includes(must.toLowerCase())) {
      return false;
    }
  }

  for (const bad of test.must_not_include) {
    if (text.includes(bad.toLowerCase())) {
      return false;
    }
  }

  return true;
}

async function runTest(test) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: test.input }),
  });

  const data = await res.json();

  return data.output || "";
}

console.log("Running evaluation...\n");

for (const test of tests) {
  try {
    const output = await runTest(test);

    const ok = checkOutput(output, test);

    console.log(`Test ${test.id}: ${ok ? "PASS" : "FAIL"}`);

    if (ok) passed++;
} catch (err) {
  console.log(`Test ${test.id}: ERROR`);
  console.log("Reason:", err.message);
}
}

console.log("\n=================");
console.log(`FINAL SCORE: ${passed}/${tests.length}`);
console.log("=================");