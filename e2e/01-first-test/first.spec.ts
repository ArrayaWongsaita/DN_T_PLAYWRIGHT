import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 01: test แรกของฉัน
// ฝึก: test, page.goto, toHaveTitle, toHaveURL, getByRole + toBeVisible
//
// Playwright เปิดเบราว์เซอร์จริงแล้วเข้าเว็บที่รันอยู่ (ต่างจาก Vitest ที่เรนเดอร์ใน jsdom)
// ไม่ต้องเปิดเซิร์ฟเวอร์เอง config จะเปิด Next.js ให้ตอนรัน pnpm test:e2e
//
//   test("ชื่อ", async ({ page }) => { ... });   page คือแท็บเบราว์เซอร์ใหม่ของ test นี้
//   await page.goto("/path");                     เปิดหน้า (ต่อท้าย baseURL ให้เอง)
//   await expect(page).toHaveTitle("...");        ตรวจ title ของหน้า
//   await expect(page).toHaveURL(/regex/);        ตรวจ URL
//   expect(locator).toBeVisible()                 ตรวจว่ามองเห็น
//
// หมายเหตุ: ทุกคำสั่งของ Playwright เป็น async ต้องใส่ await เสมอ
//
// ตัวอย่าง (ข้อมูลหน้า /lessons/01-first-test):
//   test("ตัวอย่าง", async ({ page }) => {
//     await page.goto("/lessons/01-first-test");
//     await expect(page.getByRole("link", { name: "กลับหน้าแรก" })).toBeVisible();
//   });
//
// วิธีทำ: เปลี่ยน test.fixme เป็น test แล้วเขียนเนื้อใน { } จากนั้นรัน
//   pnpm test:e2e e2e/01-first-test
// ================================================


// ------------------------------------------------
// ข้อ 1: เปิดหน้า /lessons/01-first-test แล้วตรวจว่า title คือ "Playwright 01 - First Test"
// แนวทาง: page.goto แล้ว expect(page).toHaveTitle(...)
// ------------------------------------------------
test.fixme("title ของหน้าต้องเป็น Playwright 01 - First Test", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: ตรวจว่า URL มีคำว่า 01-first-test
// แนวทาง: expect(page).toHaveURL(/01-first-test/)
// ------------------------------------------------
test.fixme("URL ต้องมี 01-first-test", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: ต้องเห็นหัวข้อ (heading) "สวัสดี Playwright"
// แนวทาง: page.getByRole("heading", { name: "..." }) แล้ว toBeVisible()
//         getByRole ใช้เหมือน React Testing Library ที่เคยเรียน
// ------------------------------------------------
test.fixme("ต้องเห็นหัวข้อ สวัสดี Playwright", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
