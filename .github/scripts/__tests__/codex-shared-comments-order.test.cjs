const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("codex-shared prompt ends with trigger thread comments", () => {
  const workflowPath = path.join(
    __dirname,
    "..",
    "..",
    "workflows",
    "codex-shared.yml"
  );
  const workflow = fs.readFileSync(workflowPath, "utf8");

  const linkedNeedle = "formatThreadCommentsSection(linkedContext, linkedComments)";
  const primaryNeedle =
    "formatThreadCommentsSection(primaryContext, primaryComments)";

  assert.ok(
    workflow.includes(linkedNeedle),
    "Expected workflow to format linked context comment sections."
  );
  assert.ok(
    workflow.includes(primaryNeedle),
    "Expected workflow to format thread context comment sections."
  );
  assert.ok(
    workflow.indexOf(linkedNeedle) < workflow.indexOf(primaryNeedle),
    "Expected codex prompt to list linked context comments before the triggering thread so the prompt ends with the trigger thread."
  );
});

