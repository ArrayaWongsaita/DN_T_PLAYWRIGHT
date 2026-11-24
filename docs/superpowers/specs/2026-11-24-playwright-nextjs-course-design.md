# Design: Playwright + Next.js E2E practice repo

## Intent and why
The author teaches testing with `DN_T_REACT_VITEST` (17 lessons; each has a small component plus a `.test.tsx` full of `test.todo` exercises). This repo is the next step: same teaching format, but for end-to-end testing a Next.js app with Playwright.

Learners already know React/Next.js and have done the Vitest repo (so `test/expect/describe/beforeEach/mock` and RTL queries like `getByRole` are familiar). They have never written Playwright. The course must build confidence gradually, never feel too hard, explain every command it uses, and teach how to watch test results in a real browser.

## Goals
- 18 lessons in 5 phases taking a learner from "first `page.goto`" to a full flow test with Page Object, fixtures and login reuse.
- Next.js app where each lesson is its own small page (`/lessons/NN-name`) in phases 1-4; phase 5 uses one mini shop app.
- Teach the tools for viewing results in the browser early (phase 3): `--headed`, `--ui`, `show-report`, trace viewer, `codegen`, `--debug`.
- Each lesson introduces 1-2 new commands, says what they do, and has 2-3 exercises.
- Bridge from RTL: show that Playwright locators (`getByRole`, `getByLabel`, `getByText`) mirror what learners know.

## Non-goals
- Not teaching React or Next.js themselves.
- No CI/GitHub Actions, parallel/sharding, retries tuning, visual snapshot tests, component testing, or Browser Mode (author chose scope "B", not "C"). A short "what next" section in README may mention them.
- No real database or real auth provider; the shop backend is in-memory/fake.
- Server Components are not tested separately; E2E exercises them implicitly through the browser.

## Anti-goals (failure even if tests pass)
- A lesson that introduces many new commands at once.
- Pages in phases 1-4 that are cluttered so learners can't tell what is app vs Playwright.
- Setup friction before the first green test (browser download, port conflicts, two terminals).
- Teaching CSS/XPath selectors or `getByTestId` first; role/label/text locators come first, `data-testid` only as a last resort lesson-note.
- Flaky exercises (arbitrary `waitForTimeout`, shared mutable server state between tests).

## Constraints
- Same layout and voice as the Vitest repo: Thai explanations in comments and README; code identifiers in English; exercise files with numbered exercises, hint, a skipped test, and a 👉 marker; solutions on a `solutions` branch, exercises on `main`.
- Stack (verified on npm 2026-11-24): `@playwright/test` 1.65.1, `next` 16.4.6, `react` 19.3.1, TypeScript, pnpm. Node >= 20 (author's machine runs Node 26).
- Playwright has no `test.todo`. Exercises use `test.fixme("...", async ({ page }) => {})`, which reports as skipped and does not fail the run. Learners replace `test.fixme` with `test`.
- `playwright.config.ts` uses `webServer` to start the Next.js app automatically, so one command (`pnpm test:e2e`) is enough. Chromium only (smaller download, less confusion).
- Next.js app must be deterministic: no randomness, no real network, no timestamps in asserted text.

## Approaches considered
- **A. Small pages per topic only:** easiest, but pages are toys and phase-5 topics (Page Object, fixtures, login) lack a reason to exist.
- **B. One growing app (shop) from lesson 1:** realistic, but beginners meet a complex UI at once and can't separate app from Playwright.
- **C. Hybrid (chosen by the author):** phases 1-4 use tiny single-purpose pages to build confidence; phase 5 uses one mini shop app (product list, cart, login, checkout) so advanced patterns have a real reason.

Scope: the author chose "B" (basics plus real-project patterns: Page Object, fixtures, `storageState`, whole-flow tests), without CI.

## Curriculum (the author chose the hybrid; exact page designs are the builder's call)
| Phase | Lesson | Practise |
|---|---|---|
| 1 Start | 01 first-test | `test`, `page.goto`, `expect(page).toHaveTitle`, `toHaveURL`; install + run |
| | 02 role-and-text | `getByRole` (+ `name`), `getByText` |
| | 03 labels-and-placeholders | `getByLabel`, `getByPlaceholder`, locator strictness (why "strict mode violation" appears) |
| 2 Act | 04 click | `locator.click()`, asserting result text |
| | 05 fill-form | `fill`, `clear`, `press`, submit |
| | 06 checkbox-radio-select | `check`, `uncheck`, `selectOption`, `toBeChecked`, `toHaveValue` |
| | 07 assertions | `toBeVisible`, `toBeHidden`, `toHaveText`, `toHaveCount`, `toBeEnabled/Disabled`, `.not` |
| 3 See results | 08 headed-and-ui-mode | `--headed`, `--ui`, `--project`, running one file/test (`-g`) |
| | 09 report-and-trace | `show-report`, `trace: "on"`, Trace Viewer, screenshot on failure |
| | 10 codegen-and-debug | `playwright codegen`, `--debug`, `page.pause()` |
| 4 Async and API | 11 auto-waiting | why no `sleep`; page that loads data after a delay; web-first assertions |
| | 12 mock-api | `page.route`, `route.fulfill` |
| | 13 error-empty-loading | mock failure (status 500), empty list, loading state |
| 5 Real project (shop app) | 14 describe-and-hooks | `test.describe`, `beforeEach`, `test.step` |
| | 15 page-object | Page Object Model for product list/cart |
| | 16 fixtures | `test.extend` to inject page objects |
| | 17 login-storagestate | log in once in a setup project, reuse `storageState` |
| | 18 full-flow | browse → add to cart → login → checkout, one end-to-end test |

Lesson file anatomy (mirrors the Vitest repo): header comment in Thai (title, commands practised, what each does, tiny worked example), then numbered exercises each with hint, `test.fixme`, and a 👉 marker. 2-3 exercises per lesson; phase 5 may have more.

## Repo layout (author's call: single app, builder may refine)
- `app/lessons/NN-name/page.tsx` for phases 1-4; `app/shop/...` plus fake API route handlers under `app/api/...` for phase 5 (the same API is mocked with `page.route` in lesson 12-13 against a lesson-specific endpoint).
- `e2e/NN-name/*.spec.ts` for exercises, `e2e/shop/` for phase 5, `e2e/auth.setup.ts` for lesson 17.
- `playwright.config.ts` (webServer, chromium, trace/screenshot config), `package.json` scripts: `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `report`.
- Landing page `/` lists all lessons as links; `docs/cheatsheet.md` for commands/locators/assertions; Thai README (install, how to do exercises, how to read results, TOC per phase, solutions link).
- A `setup-check` spec that must pass after install.

## Decided by the author
- Next.js app with one page per lesson; lessons get progressively harder, start very easy.
- Learners know Vitest; Playwright is new.
- Include commands for viewing test results in the browser.
- Scope B (no CI); hybrid structure; multiple lessons, not tied to 17.

## My calls (author to check)
- Mini app theme is a small shop.
- 18 lessons, with phase 3 (viewing results) placed early so learners see the browser quickly.
- `test.fixme` as the exercise placeholder; solutions on `solutions` branch.
- Chromium only; `webServer` starts the app; pnpm, matching the Vitest repo.
- Explicit `import { test, expect } from "@playwright/test"` in each exercise file.
- Phase 5 uses fake in-memory API route handlers; lesson 17's login is a fake credentials check.
- Because of in-memory state, tests in phase 5 must not depend on each other; each test starts from a reset (e.g. a reset endpoint or per-test data via API mocking).

## Reference format and calls added after the builder check
- **Reference repo:** https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST (public; `gh` can read it). Copy its lesson-file anatomy: boxed Thai header comment (`// ====` lines) naming the commands practised, a worked example, then `// ---- ข้อ N: ...` blocks with `แนวทาง:` hint, the placeholder test, and `// 👉 เขียน test ของข้อ N ตรงนี้`. Also copy its README structure (install, how to do exercises, how to read results, TOC tables per phase, solutions link) and `docs/cheatsheet.md`.
- **Exercises vs solutions:** `main` ships the full Next.js app and every spec file with `test.fixme` stubs plus a worked example in the header comment. `pnpm test:e2e` on `main` is green with skipped tests. Solutions live on the `solutions` branch, like the Vitest repo. In lessons 14-18 the learner-written helpers (Page Object class, fixtures file, `auth.setup.ts`) ship as skeleton files with a 👉 marker where the learner fills in the body; learners do not start from an empty file.
- **Determinism and parallelism:** the shop backend holds no shared mutable server state. Product data is static; the cart lives client-side (per browser context, e.g. localStorage); fake login sets a cookie. Tests are therefore isolated per context and safe under Playwright's default parallelism, so no reset endpoint and no `workers: 1`.
- **Lessons 11-13:** each lesson page fetches its own route handler under `app/api/lessons/...` that works unmocked (lesson 11 uses a deliberately delayed response). Lessons 12-13 intercept that same endpoint with `page.route`. The shop in phase 5 has its own `app/api/shop/...`.
- **Browser download:** README step plus a `pnpm setup:browsers` script (`playwright install chromium`); `setup-check` fails with a clear Thai message pointing to that script if Chromium is missing.
- **`--project` in lesson 08:** there is one project (`chromium`); the lesson shows `--project=chromium` as a flag to recognise, not something with visible effect. Lesson 17 adds a `setup` project that `chromium` depends on.
- **Exercise counts:** 2-3 per lesson is a guideline, not a hard rule. Lesson 01 can use three small checks (title, URL, a heading is visible).

## Left to the builder
Exact page and shop designs, exercise wording, cheatsheet content, per-lesson hints, verifying every solution passes on the pinned versions (and that skipped exercises don't fail the run), `.gitignore`/tsconfig details, and how the reset/determinism mechanism works.
