import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 02: หา element ด้วย role และข้อความ
// ฝึก: getByRole (+ name, exact), getByText, toHaveAttribute
//
// Locator ของ Playwright หน้าตาเหมือน RTL ที่เคยใช้
//   RTL:        screen.getByRole("button", { name: "..." })
//   Playwright: page.getByRole("button", { name: "..." })
// ต่างกันที่ Playwright ใช้กับ page และ "ยังไม่ไปหา" จนกว่าจะมีคำสั่งใช้งานจริง
//
//   page.getByRole("button", { name: "เพิ่ม" })               ชื่อแบบมีคำนี้อยู่ก็เจอ (ไม่ exact)
//   page.getByRole("button", { name: "เพิ่ม", exact: true })  ต้องตรงทั้งชื่อเท่านั้น
//   page.getByText("ข้อความ")                                  หาจากข้อความที่เห็น
//   expect(locator).toHaveCount(2)                             นับจำนวนที่เจอ
//
// ตัวอย่าง:
//   await expect(page.getByRole("heading", { name: "สินค้าแนะนำ" })).toBeVisible();
// ================================================

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/02-role-and-text");
});


// ------------------------------------------------
// ข้อ 1: หน้านี้มีปุ่ม "เพิ่มลงตะกร้า" และ "เพิ่ม" ตรวจว่า
//        - getByRole("button", { name: "เพิ่ม" }) เจอ 2 ปุ่ม (เพราะ "เพิ่มลงตะกร้า" ก็มีคำว่า เพิ่ม)
//        - ใส่ exact: true แล้วเจอ 1 ปุ่ม
// แนวทาง: toHaveCount(2) กับ toHaveCount(1)
// ------------------------------------------------
test.fixme("หาปุ่ม เพิ่ม แบบ exact", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: ต้องเห็นข้อความ "ราคา 250 บาท"
// แนวทาง: page.getByText("...") แล้ว toBeVisible()
// ------------------------------------------------
test.fixme("หาราคาด้วย getByText", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: ลิงก์ "ดูรายละเอียด" ต้องมี href เป็น "/"
// แนวทาง: getByRole("link", { name: "..." }) แล้ว toHaveAttribute("href", "/")
// ------------------------------------------------
test.fixme("ลิงก์ ดูรายละเอียด ชี้ไปหน้าแรก", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
