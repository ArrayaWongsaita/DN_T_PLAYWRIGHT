import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 03: หาช่องฟอร์มด้วย label และ placeholder
// ฝึก: getByLabel, getByPlaceholder, fill, filter, strict mode
//
//   page.getByLabel("อีเมล")                 หาช่องจากป้ายชื่อ (เหมือน getByLabelText ของ RTL)
//   page.getByPlaceholder("you@example.com") หาช่องจากข้อความจางๆ ในช่อง
//   await locator.fill("ข้อความ")            พิมพ์ใส่ช่อง
//   expect(locator).toHaveValue("...")       ตรวจค่าในช่อง
//
// อ่าน error ให้เป็น: "strict mode violation"
//   ถ้า locator เจอมากกว่า 1 element แล้วสั่ง action (เช่น click) Playwright จะไม่เดาให้
//   แต่จะ error ว่า strict mode violation: getByRole(...) resolved to 2 elements
//   วิธีแก้: ทำให้ locator เจาะจงขึ้น เช่น
//     page.getByRole("listitem").filter({ hasText: "กล้วย" }).getByRole("button", { name: "ลบ" })
// ================================================

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/03-labels-and-placeholders");
});


// ------------------------------------------------
// ข้อ 1: กรอกช่อง "อีเมล" ด้วย "a@b.com" แล้วตรวจว่าค่าในช่องเป็น "a@b.com"
// แนวทาง: getByLabel("อีเมล").fill(...) แล้ว expect(...).toHaveValue(...)
// ------------------------------------------------
test.fixme("หาช่องอีเมลด้วย getByLabel", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: หาช่องที่มี placeholder "you@example.com" แล้วตรวจว่ามองเห็น
// แนวทาง: getByPlaceholder + toBeVisible
// ------------------------------------------------
test.fixme("หาช่องด้วย getByPlaceholder", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: รายการมีปุ่ม "ลบ" 2 ปุ่ม (แอปเปิลกับกล้วย)
//        ตรวจว่าเจอ 2 ปุ่ม จากนั้นกดลบของ "กล้วย" ให้เหลือ 1 รายการ และยังเห็น "แอปเปิล"
// แนวทาง: ลองกด getByRole("button", { name: "ลบ" }) ตรงๆ ดูก่อน จะเจอ strict mode violation
//         แล้วแก้ด้วย getByRole("listitem").filter({ hasText: "กล้วย" })
// ------------------------------------------------
test.fixme("ลบรายการกล้วย", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
