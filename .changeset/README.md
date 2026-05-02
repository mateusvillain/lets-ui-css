# Changesets

This folder is managed by [@changesets/cli](https://github.com/changesets/changesets).

## Day-to-day flow

**1. Make your changes and open a PR.**

**2. Before merging, create a changeset:**

```bash
pnpm changeset
```

The CLI will ask:

- Which packages changed (select with spacebar)
- Type of bump: `major`, `minor`, or `patch`
- A short description of the change (appears in the CHANGELOG)

Because versioning is **fixed**, selecting any one of the three packages is enough — all of them (`@lets-ui/tokens`, `@lets-ui/styles`, `@lets-ui/components`) are always bumped together.

**3. A file is created in `.changeset/` (e.g. `.changeset/fuzzy-lions-eat.md`):**

```md
---
"@lets-ui/styles": minor
---

Add `outline` variant to Button component
```

**4. Commit that file alongside your PR and merge.**

## What CI does automatically

After a merge into `main`, the GitHub Action detects pending changeset files and opens a **"chore: version packages"** PR containing:

- Bumped versions in each package's `package.json`
- Updated `CHANGELOG.md` files with the changeset descriptions

Reviewing and merging that PR triggers automatic publishing to npm.

## Bump rules

| What changed | Type |
|---|---|
| Breaking change (public API) | `major` |
| New feature, no breaking change | `minor` |
| Bug fix, style tweak, patch | `patch` |

## Useful commands

```bash
pnpm changeset         # create a changeset (run once per PR)
pnpm changeset status  # list pending changesets and preview the next bump
```
