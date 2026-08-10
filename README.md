# bhasha (भाषा)

A language-learning app. First language: **Marathi** — but the architecture
treats Marathi as the first instance of a general "language pack", so any
language can be added later. *bhasha* is the Marathi word for "language".

**Status:** project setup — awaiting the requirements document
(`docs/00-requirements.md`). The full plan and GitHub issue set are derived
from it.

## How this repo works

- Every change is tracked by a **GitHub issue**; one PR per issue; squash-merge.
- `main` is always deployable; verify on the running instance before closing an issue.
- Issues are grouped into **milestones** (e.g. data + backend → frontend →
  integration) and written so a junior developer can pick any ready ticket and
  implement it without follow-up questions.
- To pick your next ticket: take any issue in the current milestone whose
  "Depends on" issues are all closed.

## Layout

| Path | Purpose |
|---|---|
| `docs/00-requirements.md` | Product requirements (source of truth) |
| `docs/01-plan.md` | Architecture + milestone plan (written after requirements land) |
