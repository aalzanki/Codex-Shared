const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("codex-shared prompt wording stays consistent with Issue/PR labels", () => {
  const workflowPath = path.join(
    __dirname,
    "..",
    "..",
    "workflows",
    "codex-shared.yml"
  );
  const workflow = fs.readFileSync(workflowPath, "utf8");

  assert.equal(
    workflow.includes("\t"),
    false,
    "Workflow should not contain tab characters (YAML indentation must be spaces)."
  );

  assert.ok(
    workflow.includes("PR's latest comments"),
    "Expected workflow to label PR comment sections as \"PR's latest comments\"."
  );
  assert.ok(
    workflow.includes("Issue's latest comments"),
    "Expected workflow to label issue comment sections as \"Issue's latest comments\"."
  );

  const bannedPhrases = [
    "Primary thread:",
    "Associated thread:",
    "🧩 Primary context:",
    "🧩 Associated context:",
  ];

  for (const phrase of bannedPhrases) {
    assert.ok(
      !workflow.includes(phrase),
      `Expected workflow to avoid phrase: ${JSON.stringify(phrase)}`
    );
  }
});
