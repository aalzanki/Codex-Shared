const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("codex-shared checkout does not persist tokenized origin URLs", () => {
  const workflowPath = path.join(
    __dirname,
    "..",
    "..",
    "workflows",
    "codex-shared.yml"
  );
  const workflow = fs.readFileSync(workflowPath, "utf8");

  assert.equal(
    workflow.includes("https://x-access-token:"),
    false,
    "Workflow should not embed tokens in https origin URLs."
  );
});

test("codex-shared checkout uses ephemeral extraheader git auth", () => {
  const workflowPath = path.join(
    __dirname,
    "..",
    "..",
    "workflows",
    "codex-shared.yml"
  );
  const workflow = fs.readFileSync(workflowPath, "utf8");

  assert.ok(
    workflow.includes("GIT_CONFIG_KEY_0=\"http.https://github.com/.extraheader\""),
    "Expected workflow to export an ephemeral http extraheader for git auth."
  );
  assert.ok(
    workflow.includes("git remote set-url origin \"$repo_no_auth\""),
    "Expected workflow to keep origin as a non-auth URL."
  );
});

