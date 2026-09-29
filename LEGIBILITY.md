## What this is

A read-only legibility pass. **No existing file is modified** — this PR only adds
`LEGIBILITY.md`, and it is trivially deletable. Close it and nothing else changes.

### Why

A census of 100 fleet repos (`SuperInstance/quilt-research-canons/projects/fleet-legend/`)
graded every repo against five obligations. This one already passes entry (L1, L2); it
fails the two that only cost something once a reader is already inside:

- **L4 — what this does NOT do.** Missing in 55 of 100 repos.
- **L5 — what to do when it fails.** Missing in 59 of 100 repos.

### What is in here, and where each line came from

4 finding(s), each read out of the repository and each carrying its evidence. Nothing
is inferred from the README, because the README is the thing being fixed.

| finding | evidence |
|---|---|
| There is no CI configuration in this repository, so nothing here is checked automatically on push | file listing: no path matches `.github/workflows/`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/`, `.travis.yml` or `azure-pipelines.yml` |
| It ships no automated tests, so nothing here is verified automatically | file listing: no path matches `tests/`, `test_*.py`, `*_test.{go,py,ts}`, or `*.test.*js` |
| It carries no LICENSE file, so there is no stated grant to copy from, modify or redistribute it | file listing: no path matches `LICENSE*` or `COPYING*` |
| There is no error surface anywhere in its source: no `raise`, `throw`, `panic!`, `log.Fatal` or `process.exit` call appears in any of the 1 source file. A failing call therefore reports nothing — it stops without saying why | read all 1 source file(s) in the tree; grep: no `raise|throw|panic!|log.Fatal|process.exit` |

### What we deliberately did NOT write

- **Failure modes (L5).** This repository has no error surface to teach from, so this file cannot tell you what to do when a call goes wrong. Write the two or three failures that actually happen and the fix for each. A human has to supply these; they cannot be derived from a file listing.

A completer that invents a receipt or a failure mode produces a confident lie, and a
confident lie is worse than a blank space, because a reader cannot tell it from a real
limitation. Where a fact was not derivable, this file says so instead of filling the gap.

### If you want to accept part of this

Take the table and ignore the rest. Every row is a predicate over the file listing or over
named source lines, so disagreeing with a row costs you one `ls` or one `grep` — say so in
a review comment and the line gets corrected or dropped.

Reviewed with tooling from `SuperInstance/quilt-research-canons/projects/fleet-legend/`.
