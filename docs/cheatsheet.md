# Cheatsheet: Playwright (เทียบกับ Vitest + RTL)

## เทียบของที่เคยรู้

| เดิม (Vitest + RTL) | Playwright |
|---|---|
| `render(<X />)` | `await page.goto("/path")` |
| `screen.getByRole("button", { name })` | `page.getByRole("button", { name })` (เหมือนกัน) |
| `getByLabelText` | `page.getByLabel` |
| `getByPlaceholderText` | `page.getByPlaceholder` |
| `getByText` | `page.getByText` |
| `queryBy... + not.toBeInTheDocument()` | `await expect(locator).toBeHidden()` |
| `getAllBy... + toHaveLength(n)` | `await expect(locator).toHaveCount(n)` |
| `await user.click(el)` | `await locator.click()` |
| `await user.type(el, "x")` | `await locator.fill("x")` |
| `findBy...` / `waitFor` | `await expect(locator).toBeVisible()` (รอเองอัตโนมัติ) |
| `vi.spyOn(fetch)` / mock | `await page.route(url, (route) => route.fulfill({ json }))` |
| `describe` / `beforeEach` | `test.describe` / `test.beforeEach` |
| `test.todo` | `test.fixme` |

ที่ต่างสำคัญ: Playwright ทุกคำสั่งต้อง `await` และ assertion ของ `expect(locator)` ลองซ้ำเองจนผ่านหรือหมดเวลา (5 วินาที)

## Locator (หา element)

```ts
page.getByRole("button", { name: "ชื่อ" })           // ชื่อแบบมีคำนี้
page.getByRole("button", { name: "ชื่อ", exact: true }) // ต้องตรงทั้งชื่อ
page.getByLabel("อีเมล")
page.getByPlaceholder("you@example.com")
page.getByText("ข้อความ")
locator.first() / locator.last() / locator.nth(1)
locator.filter({ hasText: "กล้วย" })
parent.getByRole("button", { name: "ลบ" })            // หาต่อภายใน parent
```

## Action

```ts
await page.goto("/shop");
await locator.click();
await locator.fill("ข้อความ");
await locator.clear();
await locator.press("Enter");
await locator.check();            // checkbox / radio
await locator.selectOption("ค่า");
```

## Assertion

```ts
await expect(locator).toBeVisible();
await expect(locator).toBeHidden();
await expect(locator).toHaveText("ข้อความ");
await expect(locator).toHaveCount(3);
await expect(locator).toHaveValue("ค่า");
await expect(locator).toBeChecked();
await expect(locator).toBeEnabled();      // toBeDisabled คือตรงข้าม
await expect(locator).toHaveAttribute("href", "/");
await expect(page).toHaveTitle("...");
await expect(page).toHaveURL(/regex/);
await expect(locator).not.toBeVisible();  // .not กลับความหมาย
```

## Mock API

```ts
await page.route("**/api/xxx", (route) => route.fulfill({ json: [] }));
await page.route("**/api/xxx", (route) => route.fulfill({ status: 500 }));
// ต้องตั้ง route ก่อน page.goto
```

## จัดโครง test

```ts
test.describe("กลุ่ม", () => {
  test.beforeEach(async ({ page }) => { await page.goto("/shop"); });
  test("ชื่อ", async ({ page }) => {
    await test.step("ขั้นที่ 1", async () => { /* ... */ });
  });
});
test.use({ storageState: "playwright/.auth/user.json" });
```

## คำสั่ง terminal

| คำสั่ง | ทำอะไร |
|---|---|
| `pnpm test:e2e` | รันทุก test |
| `pnpm test:e2e e2e/04-click` | รันเฉพาะโฟลเดอร์/ไฟล์ |
| `pnpm test:e2e -g "คำ"` | รันเฉพาะ test ที่ชื่อมีคำนี้ |
| `pnpm test:e2e:headed` | เปิดหน้าต่างเบราว์เซอร์ให้ดู |
| `pnpm test:e2e:ui` | UI mode (กดรันทีละ test ดูภาพย้อนหลัง) |
| `pnpm test:e2e --debug` | Inspector ไล่ทีละขั้น |
| `pnpm report` | เปิดรายงาน HTML ล่าสุด |
| `pnpm exec playwright show-trace <trace.zip>` | เปิด Trace Viewer |
| `pnpm exec playwright codegen localhost:3000/...` | อัดการใช้งานเป็นโค้ด (ต้องมีเซิร์ฟเวอร์รันอยู่ เช่น `pnpm dev`) |

## อ่าน error

| ข้อความ | แปลว่า | แก้ |
|---|---|---|
| `strict mode violation: ... resolved to 2 elements` | locator เจอหลายตัว | ทำให้เจาะจงขึ้น: `exact: true`, `filter`, หาต่อภายใน parent |
| `Timeout ... waiting for locator` | รอครบเวลาแล้วไม่เจอ/ไม่พร้อม | ตรวจชื่อ role/ข้อความ ดูภาพใน `pnpm report` |
| `expect(locator).toBeVisible() failed` | หา element ไม่เจอหรือมองไม่เห็น | เช่นเดียวกับข้างบน |
| test ผ่านบางครั้งล้มบางครั้ง (flaky) | ใช้ `waitForTimeout` หรือไม่ได้รอสถานะ | ใช้ `await expect(...)` แทน อย่าเดาเวลา |
