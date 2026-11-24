# Playwright + Next.js Course Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Thai-language, 18-lesson Playwright practice repo on a Next.js app, in the same teaching format as `DN_T_REACT_VITEST`.

**Architecture:** One Next.js app (`app/lessons/NN-name` tiny pages for lessons 1-13, `app/shop` + `app/api/shop` mini shop for 14-18). Exercise specs (`e2e/`) contain `test.fixme` stubs; full working solutions are authored in a mirror tree `.solutions/` and verified with `pnpm test:solutions`. At release, `main` ships without `.solutions/` and a `solutions` branch has the solutions copied over `e2e/`.

**Tech Stack:** `@playwright/test` 1.65.1, `next` 16.4.6, `react` 19.3.1, TypeScript, pnpm, Node >= 20, Chromium only.

**Spec:** `docs/superpowers/specs/2026-11-24-playwright-nextjs-course-design.md` (reference format: https://github.com/ArrayaWongsaita/DN_T_REACT_VITEST, readable with `gh api repos/ArrayaWongsaita/DN_T_REACT_VITEST/contents/<path>`).

## Global Constraints

- Explanations, comments, README, UI labels in Thai; code identifiers in English; docs under `docs/` in English.
- Exercise file anatomy: boxed header comment (`// ====`) with lesson title, commands practised, worked example; then `// ---- ข้อ N: ...` blocks with `แนวทาง:` hint, `test.fixme("...", async ({ page }) => {});`, and `// 👉 เขียน test ของข้อ N ตรงนี้`. 2-3 exercises per lesson (guideline).
- Each exercise file starts with `import { test, expect } from "@playwright/test";` (explicit import).
- Locators taught in order: role/label/text first; `data-testid` and CSS are never used in exercises.
- Chromium only; `webServer` starts Next.js; `pnpm test:e2e` is green (all skipped) on `main`.
- No shared mutable server state; cart in `localStorage`, login as `session` cookie; no `waitForTimeout` anywhere; no randomness or timestamps in asserted text.
- Versions pinned exactly as listed in Tech Stack.
- `.solutions/**` mirrors `e2e/**` paths and relative imports exactly so `apply-solutions` is a plain copy.

## Review Focus

1. Chromium not installed -> `setup-check` must fail with a Thai message naming `pnpm setup:browsers` (test in Task 1).
2. Port 3000 already used -> config reads `PORT` env and sets `reuseExistingServer: true` outside CI (verified in Task 1).
3. `test.fixme` stubs must not fail or hang the run, including stubs with an unused `page` fixture (verified in Task 8 on a clean `main` checkout).
4. Shop tests run fully parallel: cart/login isolation per browser context (tested in Task 6 with two contexts).
5. Thai accessible names: `getByRole("button", { name: "เพิ่มลงตะกร้า" })` matches exactly and not substrings of neighbours (e.g. "เพิ่ม" vs "เพิ่มลงตะกร้า"); lesson 03 intentionally has duplicate "ลบ" buttons (tested in Task 2).
6. Delayed endpoint (lesson 11) must pass on slow machines: delay 1500 ms, expect timeout 5000 ms (Task 4).

---

### Task 1: Scaffold, config, landing page, setup-check

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `playwright.config.ts`, `.gitignore`, `app/layout.tsx`, `app/page.tsx`, `lib/lessons.ts`, `e2e/setup-check/setup.spec.ts`, `.solutions/.gitkeep`
- Modify: `README.md`

**Interfaces:**
- Produces: `lib/lessons.ts` exports `type Lesson = { id: string; title: string; phase: number }` and `const lessons: Lesson[]` (18 entries, ids `01-first-test`... per spec table, ids are the route/folder names); landing page links each to `/lessons/<id>` (lessons 14-18 link to `/shop`).
- Produces: scripts `dev`, `test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `report` (`playwright show-report`), `test:solutions` (sets `PW_SOLUTIONS=1`), `setup:browsers` (`playwright install chromium`).
- Produces: `playwright.config.ts` — `testDir` is `./e2e`, or `./.solutions` when `PW_SOLUTIONS=1`; project `chromium`; `use: { baseURL, trace: "retain-on-failure", screenshot: "only-on-failure" }`; `webServer: { command: "pnpm dev", url: baseURL, reuseExistingServer: !process.env.CI }`; port from `PORT` (default 3000); reporter `html` with `open: "never"`.

- [ ] **Step 1: Write the failing test** `e2e/setup-check/setup.spec.ts`: test "หน้าแรกเปิดได้" expects `page.goto("/")` then `getByRole("heading", { name: "Playwright + Next.js" })` visible; test "หน้าแรกมีลิงก์ครบ 18 บท" expects `getByRole("link")` filtered by `/^\d\d /` to have count 18. Copy to `.solutions/setup-check/setup.spec.ts` unchanged (setup-check is not an exercise).
- [ ] **Step 2: Run** `pnpm test:e2e setup-check` -> FAIL (no app yet). Run `pnpm install` first; expected failure is the `webServer`/404.
- [ ] **Step 3: Implement** the Next.js app shell, the config above, `lib/lessons.ts` and the landing page (heading "Playwright + Next.js", list grouped by 5 phases, link text `"NN ชื่อบท"`). Add a custom Chromium check in the config: if `chromium.executablePath()` does not exist, throw `Error("ยังไม่ได้ติดตั้ง Chromium รัน: pnpm setup:browsers")`.
- [ ] **Step 4: Run** `pnpm setup:browsers && pnpm test:e2e setup-check` -> 2 passed. Then rename `chromium` binary temporarily (or set `PLAYWRIGHT_BROWSERS_PATH` to an empty dir) and confirm the Thai message appears; also run with `PORT=3100` and with a dev server already running on 3000 -> still passes.
- [ ] **Step 5: Commit** `chore: scaffold Next.js + Playwright, landing page, setup-check`.

### Task 2: Phase 1 — lessons 01-03

**Files:**
- Create: `app/lessons/01-first-test/page.tsx`, `app/lessons/02-role-and-text/page.tsx`, `app/lessons/03-labels-and-placeholders/page.tsx`, `e2e/01-first-test/first.spec.ts`, `e2e/02-role-and-text/role.spec.ts`, `e2e/03-labels-and-placeholders/labels.spec.ts`, and the same three under `.solutions/`

**Interfaces:**
- Consumes: `lessons` list from Task 1 (ids must match folder names).
- Page contents (all Thai, each page also has a "กลับหน้าแรก" link to `/`): 
  - 01: `<title>` "Playwright 01 - First Test", `h1` "สวัสดี Playwright". Exercises: `toHaveTitle`, `toHaveURL(/01-first-test/)`, heading visible.
  - 02: `h1` "สินค้าแนะนำ", `button` "เพิ่มลงตะกร้า", a second button "เพิ่ม" (to test exact names), `a` "ดูรายละเอียด" (href `/`), `p` "ราคา 250 บาท". Exercises: getByRole button with `exact: true`, getByText price, link role.
  - 03: form with label "อีเมล" (placeholder `you@example.com`) and label "รหัสผ่าน"; list of two items "แอปเปิล" and "กล้วย" each with a button "ลบ". Exercises: `getByLabel`, `getByPlaceholder`, the duplicate "ลบ" buttons: first use `getByRole(...)` alone and read the strict mode error in the hint, then fix with `.first()` / `.filter({ hasText })` scoped to the list item.

- [ ] **Step 1:** Write the solution specs first in `.solutions/` with the assertions above (exact strings). **Step 2:** `pnpm test:solutions 0[1-3]` -> FAIL (pages missing). **Step 3:** Implement the three pages. **Step 4:** `pnpm test:solutions 0[1-3]` -> all pass; also check lesson 02/03 specs include an assertion that a non-exact role query throws strict mode (via `await expect(locator).toHaveCount(2)` for the non-exact query) so Review Focus 5 is pinned.
- [ ] **Step 5:** Write the exercise versions in `e2e/` from the solutions: Thai header comment (with RTL comparison line, e.g. "`getByRole` เหมือน RTL ที่เคยใช้"), worked example, `test.fixme` blocks. Lesson 03's header includes a short "อ่าน error: strict mode violation" box. `pnpm test:e2e 0[1-3]` -> all skipped, exit 0.
- [ ] **Step 6: Commit** `feat: phase 1 lessons 01-03`.

### Task 3: Phase 2 — lessons 04-07

**Files:** `app/lessons/04-click`, `05-fill-form`, `06-checkbox-radio-select`, `07-assertions` pages (`page.tsx`, client components where state is needed); `e2e/<id>/*.spec.ts` and `.solutions/<id>/*.spec.ts` for each.

**Interfaces:**
- 04: button "+1", button "รีเซ็ต", text "Count: 0". Exercises: initial text, click twice -> "Count: 2", reset.
- 05: label "ชื่อ" input, button "ทักทาย", result `p` "สวัสดี, {name}" shown only after submit (form `onSubmit`, so Enter works). Exercises: `fill` + click, `press("Enter")`, `clear` then empty-name shows "กรุณากรอกชื่อ".
- 06: checkbox "ยอมรับเงื่อนไข" gating button "สมัคร" (disabled until checked), radios "ส่งด่วน"/"ส่งปกติ" (default ส่งปกติ), select label "จังหวัด" options กรุงเทพ/เชียงใหม่/ภูเก็ต. Exercises: `check` + enabled, `check` radio, `selectOption` + `toHaveValue`.
- 07: button "แสดงรายละเอียด" toggles panel "รายละเอียดสินค้า"; `ul` of 3 `li`; disabled button "ซื้อเลย". Exercises: `toBeVisible/toBeHidden`, `toHaveCount(3)`, `toBeDisabled`, `.not`.

- [ ] **Step 1:** Write solution specs (exact strings above). **Step 2:** `pnpm test:solutions 0[4-7]` -> FAIL. **Step 3:** Implement pages. **Step 4:** run again -> PASS. **Step 5:** Write exercise stubs with Thai headers (04 introduces `locator.click()`, 05 `fill/press/clear`, 06 `check/selectOption`, 07 the assertion list + a note that Playwright assertions auto-retry, linking forward to lesson 11); run `pnpm test:e2e 0[4-7]` -> skipped. **Step 6: Commit** `feat: phase 2 lessons 04-07`.

### Task 4: Phase 3 + Phase 4 — lessons 08-13

**Files:** pages `app/lessons/08-headed-and-ui-mode`, `09-report-and-trace`, `10-codegen-and-debug`, `11-auto-waiting`, `12-mock-api`, `13-error-empty-loading`; route handlers `app/api/lessons/11-auto-waiting/message/route.ts`, `app/api/lessons/12-mock-api/products/route.ts` (also used by 13 via `?mode=` is NOT allowed — 13 uses the same `/api/lessons/12-mock-api/products` path, mocked); specs and solutions for each.

**Interfaces:**
- 08: page with `h1` "ผลไม้", `ul` of 3 items, button "เพิ่มผลไม้" (appends "ส้ม"). Exercises are small tests plus run-commands in the header (`--headed`, `--ui`, `-g "ชื่อ test"`, `--project=chromium`); learner writes 2 tests and runs each with a different flag.
- 09: button "โหลด" -> text "พร้อมแล้ว". Exercise 1: write the test; exercise 2: break an assertion on purpose, run, open `pnpm report`; exercise 3: `test.use({ trace: "on" })` then `npx playwright show-trace <path>` (header explains where `test-results/` puts `trace.zip`).
- 10: signup form (label "ชื่อ", label "อีเมล", checkbox "รับข่าวสาร", button "สมัคร" -> `p` "สมัครสำเร็จ"). Exercises: run `pnpm exec playwright codegen localhost:3000/lessons/10-codegen-and-debug`, paste recording and clean up; `--debug`; `await page.pause()` (remove after).
- 11: client component fetching `GET /api/lessons/11-auto-waiting/message` (handler waits 1500 ms then returns `{ "message": "ข้อมูลมาแล้ว" }`); shows "กำลังโหลด..." then message. Exercises: `await expect(getByText("ข้อมูลมาแล้ว")).toBeVisible()` without sleep; `toBeHidden` on loading text; explain default 5000 ms expect timeout.
- 12: `GET /api/lessons/12-mock-api/products` returns `[{id:1,name:"ชา"},{id:2,name:"กาแฟ"}]` and page lists names. Exercises: `page.route` + `route.fulfill({ json })` to return 1 item named "นม" (set the route BEFORE `goto`); `toHaveCount`; assert request URL via `page.waitForRequest`.
- 13: same page component behavior as 12 plus states "เกิดข้อผิดพลาด" on non-2xx and "ไม่มีสินค้า" on `[]`, "กำลังโหลด..." while pending (hits the same endpoint, own page path `/lessons/13-error-empty-loading`). Exercises: `route.fulfill({ status: 500 })`, empty `[]`, delayed fulfil with `new Promise(r => setTimeout(r, 500))` inside the route handler then loading text seen.

- [ ] **Step 1:** Write solution specs. **Step 2:** `pnpm test:solutions 08` ... `13` -> FAIL. **Step 3:** Implement pages/handlers; page for 13 imports a shared `components/ProductList.tsx` taking `endpoint: string` (also used by 12). **Step 4:** run each -> PASS; run `pnpm test:solutions 11 --repeat-each=5 --workers=4` to confirm no flake (Review Focus 6). **Step 5:** Write exercise stubs and Thai headers; lesson 08/09/10 headers each contain a boxed "คำสั่งที่ใช้" list with the exact commands; `pnpm test:e2e` -> skipped. **Step 6: Commit** `feat: phases 3-4 lessons 08-13`.

### Task 5: Shop app (pages and fake API)

**Files:** `app/shop/page.tsx` (product list), `app/shop/cart/page.tsx`, `app/shop/login/page.tsx`, `app/shop/checkout/page.tsx`, `app/api/shop/products/route.ts`, `app/api/shop/login/route.ts`, `lib/shop.ts`, `e2e/shop/smoke.spec.ts` (+ `.solutions/` copy; internal-only, not a lesson).

**Interfaces:**
- Produces: `lib/shop.ts` — `type Product = { id: number; name: string; price: number }`, `products: Product[]` (4 static items: ชา 50, กาแฟ 80, นม 40, ขนมปัง 30), `cart` helpers `readCart(): CartItem[]`, `addToCart(id: number): void`, `clearCart(): void` over `localStorage` key `cart`; `type CartItem = { id: number; qty: number }`.
- `/shop`: `h1` "ร้านค้า", each product card has name, "฿{price}", button "เพิ่ม {name} ลงตะกร้า"; header link "ตะกร้า (N)".
- `/shop/cart`: lists items with qty and line total, "รวม ฿{total}", button "ไปชำระเงิน" -> `/shop/checkout`; empty state "ตะกร้าว่างเปล่า".
- `/shop/login`: labels "ชื่อผู้ใช้", "รหัสผ่าน", button "เข้าสู่ระบบ"; valid credentials `demo` / `1234` -> `POST /api/shop/login` sets `session=demo` cookie, redirects to `next` query param or `/shop`; invalid shows "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง".
- `/shop/checkout`: without `session` cookie redirects (middleware or server component) to `/shop/login?next=/shop/checkout`; with cookie shows summary and button "ยืนยันการสั่งซื้อ" -> text "สั่งซื้อสำเร็จ" and cart cleared.
- `GET /api/shop/products` returns `products`; `/shop` fetches it.

- [ ] **Step 1:** Write `e2e/shop/smoke.spec.ts` (solution copy in `.solutions/`): add two products, cart shows "รวม ฿130" for ชา+กาแฟ; unauthenticated checkout redirects to login; login then checkout shows "สั่งซื้อสำเร็จ"; **isolation test:** two `browser.newContext()` instances, add to cart in one, the other's cart reads "ตะกร้าว่างเปล่า" (Review Focus 4). **Step 2:** `pnpm test:solutions shop` -> FAIL. **Step 3:** Implement. **Step 4:** run with `--repeat-each=3 --fully-parallel` -> PASS. **Step 5:** keep `smoke.spec.ts` in both trees as a regression guard (not listed in the landing page). **Step 6: Commit** `feat: shop app and fake API`.

### Task 6: Phase 5 — lessons 14-18

**Files:** `e2e/shop/14-describe-and-hooks.spec.ts`, `15-page-object.spec.ts`, `16-fixtures.spec.ts`, `17-login-storagestate.spec.ts`, `18-full-flow.spec.ts`, `e2e/shop/pages/ProductListPage.ts`, `e2e/shop/pages/CartPage.ts`, `e2e/shop/pages/LoginPage.ts`, `e2e/shop/fixtures.ts`, `e2e/shop/auth.setup.ts`; solution mirrors in `.solutions/`; modify `playwright.config.ts` to add project `setup` (`testMatch: /auth\.setup\.ts/`) and make `chromium` depend on it; `.gitignore` adds `playwright/.auth`.

**Interfaces:**
- `ProductListPage`: `constructor(page: Page)`, `goto(): Promise<void>`, `add(name: string): Promise<void>`, `cartLink: Locator`. `CartPage`: `goto()`, `total: Locator`, `items: Locator`, `checkout(): Promise<void>`. `LoginPage`: `goto(next?: string)`, `login(user: string, pass: string)`, `error: Locator`.
- `fixtures.ts`: `export const test = base.extend<{ productList: ProductListPage; cart: CartPage; loginPage: LoginPage }>(...)` and re-export `expect`.
- `auth.setup.ts`: logs in as demo/1234 and saves `playwright/.auth/user.json` via `page.context().storageState`; specs needing login use `test.use({ storageState: "playwright/.auth/user.json" })`.
- **Exercise vs skeleton rule:** in `e2e/`, 14 is `test.fixme` stubs; 15 ships page-object files with method signatures and `// 👉` bodies empty (`throw new Error("TODO")` is NOT used; bodies are empty) and a fixme spec; 16 ships `fixtures.ts` skeleton with the `extend` call and empty fixture bodies; 17 ships `auth.setup.ts` skeleton; 18 is a fixme spec that uses the learner's pages/fixtures. Because stubs with empty bodies must not break the run, `chromium` project depends on `setup` only through `dependencies: ["setup"]` and `auth.setup.ts` in `e2e/` is itself a `test.fixme`.
- Solutions: 14 uses `test.describe`, `beforeEach` (goto `/shop`), `test.step`; 15 asserts through page objects; 16 imports `test` from `./fixtures`; 17 asserts `/shop/checkout` opens without redirect; 18 browse -> add ชา+กาแฟ -> cart total "รวม ฿130" -> checkout redirected to login -> login -> confirm -> "สั่งซื้อสำเร็จ".

- [ ] **Step 1:** Write all solution files in `.solutions/`. **Step 2:** `pnpm test:solutions shop` -> FAIL on missing page objects/fixtures. **Step 3:** Implement page objects, fixtures, setup project in solutions tree and config. **Step 4:** `pnpm test:solutions` (full) -> all pass, then `--repeat-each=3 --fully-parallel` -> pass (Review Focus 4). **Step 5:** Derive `e2e/` skeleton/stub versions with Thai headers following the rule above; `pnpm test:e2e` -> all skipped, exit code 0. **Step 6: Commit** `feat: phase 5 lessons 14-18`.

### Task 7: Docs — README and cheatsheet

**Files:** `README.md` (replace stub), `docs/cheatsheet.md`.

- [ ] **Step 1:** README in Thai following the reference repo's sections: intro, install (`pnpm install`, `pnpm setup:browsers`, `pnpm test:e2e setup-check` -> "2 passed"), how to do exercises (replace `test.fixme` with `test`), run commands (`pnpm test:e2e`, `... e2e/04-click`, `-g`, `--headed`, `--ui`, `pnpm report`), how to read results (`skipped` = ยังไม่ทำ, `passed`, `failed` with Expected/Received, Timeout meaning "หา element ไม่เจอ"), TOC tables per 5 phases, a short "ต่อยอด" note (CI, visual snapshot, parallel/sharding are not covered), solutions link to the `solutions` branch.
- [ ] **Step 2:** `docs/cheatsheet.md` in Thai: table RTL <-> Playwright (`getByRole` same, `userEvent.click` -> `locator.click`, `findBy` -> auto-waiting `expect`, `vi.fn`/mock fetch -> `page.route`), locator list, action list, assertion list, CLI flags list, "อ่าน error" section (strict mode violation, Timeout, `waitForTimeout` anti-pattern).
- [ ] **Step 3:** Verify every command in README/cheatsheet by running it once (copy-run each fenced command in order on a clean clone, see Task 8). **Step 4: Commit** `docs: README and cheatsheet`.

### Task 8: Release branches and clean-clone verification

**Files:** `scripts/apply-solutions.mjs`; modify `package.json` (script `solutions:apply`); `.gitignore`.

**Interfaces:** `scripts/apply-solutions.mjs` copies every file under `.solutions/` over the same relative path under `e2e/`, then removes `.solutions/`; exits non-zero if a `.solutions` file has no counterpart path in `e2e/` unless it is new under `e2e/`-mirrored dirs (new files such as completed `auth.setup.ts` are allowed).

- [ ] **Step 1:** Run `pnpm test:solutions` on the dev branch -> 100% pass, no skipped. **Step 2:** Create branch `solutions` from dev, run `node scripts/apply-solutions.mjs`, run `pnpm test:e2e` -> all pass, no skipped; commit `chore: apply solutions`. **Step 3:** On `main`, remove `.solutions/` and the `test:solutions`/`solutions:apply` scripts only if the author wants them hidden — default: keep `.solutions/` out of `main` (delete with `git rm -r`), keep it on a third branch `dev-solutions-src` for maintenance; commit. **Step 4:** Fresh `git clone` of `main` into a new empty directory (scratchpad): `pnpm install`, `pnpm setup:browsers`, `pnpm test:e2e` -> setup-check passes, all lessons skipped, exit 0 (Review Focus 3); run every README command once. **Step 5:** Report branch names and what to push; do not push without the author's say-so.

---

## Self-review notes

- Spec coverage: 18 lessons (Tasks 2-4, 6), phase-3 viewing tools (Task 4), `webServer`/Chromium/`setup-check` (Task 1), `test.fixme` exercises and skeletons (Tasks 2-6), solutions branch (Task 8), README/cheatsheet (Task 7), determinism/parallel (Tasks 5-6), browser download script (Task 1), `--project` note (Task 4), `setup` project (Task 6).
- Types: `ProductListPage`, `CartPage`, `LoginPage`, `fixtures.ts` names are consistent across Tasks 6; `lessons` ids match folder names (Task 1 produces, Tasks 2-4 consume).
- Left to executor (spec says so): precise page markup/styling, exercise wording, hints, header text, tsconfig/.gitignore details.
