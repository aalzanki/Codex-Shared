# Codex

Reusable GitHub workflow(s) used to run the `codex` CLI against issues/PRs.

## Reusable Workflow: `codex-shared.yml`

File: `.github/workflows/codex-shared.yml`

### Inputs

- `trigger_phrase` (string, required): e.g. `@codex` or `@chat`
- `runner_group` (string, required): self-hosted runner group name (this workflow assumes Codex is installed on your runners)
- `model` (string, required): model name passed to `codex exec --model`

### Secrets

- `CODEX_GITHUB_APP_ID` (required)
- `CODEX_GITHUB_APP_PRIVATE_KEY` (required)
- `CODEX_GH_TOKEN` (required)

### Runner Requirements

This workflow expects a self-hosted runner (in `runner_group`) with:

- `codex` available on `PATH` (or installed at a common location the workflow checks)
- whatever auth/environment `codex exec` needs (for example API keys)

### Example Usage

```yaml
jobs:
  codex:
    uses: aalzanki/Codex/.github/workflows/codex-shared.yml@main
    secrets: inherit
    with:
      trigger_phrase: '@codex'
      runner_group: 'ci-prod'
      model: 'gpt-5.2'
```

### Optional Repo Variables

- `CODEX_GIT_USER_NAME`
- `CODEX_GIT_USER_EMAIL`
