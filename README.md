# Codex Shared Workflow

This repo provides a reusable GitHub Actions workflow (`.github/workflows/codex-shared.yml`) that runs the `codex` CLI on a self-hosted runner.

## Usage

Create a workflow in your repo that triggers on the events you want, then call the reusable workflow from this repo:

```yaml
name: Codex

on:
  issue_comment:
    types: [created]
  pull_request_review_comment:
    types: [created]
  pull_request_review:
    types: [submitted]
  issues:
    types: [opened, edited]

jobs:
  codex:
    uses: <owner>/<this-repo>/.github/workflows/codex-shared.yml@<ref>
    with:
      trigger_phrase: "@codex"
      runner_group: "<your-self-hosted-runner-group>"
      model: "<model>"
      extra_instructions: ""
      extra_common_instructions: ""

      # Optional: non-secret env vars injected into the Codex process.
      extra_env: |
        FOO=bar

      # Optional: map secrets into environment variables for the Codex process.
      extra_secret_env_1_name: "SERVICE_API_TOKEN"
    secrets:
      CODEX_GITHUB_APP_ID: ${{ secrets.CODEX_GITHUB_APP_ID }}
      CODEX_GITHUB_APP_PRIVATE_KEY: ${{ secrets.CODEX_GITHUB_APP_PRIVATE_KEY }}
      CODEX_GH_TOKEN: ${{ secrets.CODEX_GH_TOKEN }}
      EXTRA_SECRET_ENV_1: ${{ secrets.SERVICE_API_TOKEN }}
```

## Injecting Environment Variables

The workflow is intentionally generic: it does not hardcode vendor-specific secret names. Instead, you can inject arbitrary env vars for your own tools/tasks.

- `with.extra_env`
  - Newline-separated `KEY=VALUE` pairs.
  - Intended for non-secret values only (inputs can be visible in workflow metadata/logs).
- `with.extra_secret_env_N_name` + `secrets.EXTRA_SECRET_ENV_N` (N = 1..5)
  - Exports the secret value into the environment variable name you provide, for the `codex` process only.

Constraints:

- Env var names must match `^[A-Za-z_][A-Za-z0-9_]*$`.
- If a name is provided without a matching secret (or vice versa), the workflow fails fast.
