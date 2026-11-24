import { test, expect } from "@playwright/test";

// ================================================
// บทที่ 04: คลิกปุ่ม
// ฝึก: locator.click(), เก็บ locator ไว้ในตัวแปร
//
// ใน Vitest ต้องสร้าง userEvent.setup() ก่อนคลิก แต่ Playwright คลิกได้เลยจาก locator
//   RTL:        const user = userEvent.setup(); await user.click(button);
//   Playwright: await button.click();
//
// Playwright รอให้ปุ่ม "พร้อมกด" ให้เอง (มองเห็น ไม่ถูก disable) จึงไม่ต้องใส่ sleep
//
// เก็บ locator ไว้ใช้ซ้ำได้:
//   const plus = page.getByRole("button", { name: "+1" });
//   await plus.click();
//   await plus.click();
//
// ตัวอย่าง:
//   await page.getByRole("button", { name: "+1" }).click();
//   await expect(page.getByText("Count: 1")).toBeVisible();
// ================================================

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/04-click");
});


// ------------------------------------------------
// ข้อ 1: เริ่มต้นต้องเห็น "Count: 0"
// แนวทาง: ยังไม่ต้องคลิกอะไร ตรวจด้วย getByText + toBeVisible
// ------------------------------------------------
test.fixme("เริ่มต้นต้องแสดง Count: 0", async ({ page }) => {});
// 👉 เขียน test ของข้อ 1 ตรงนี้


// ------------------------------------------------
// ข้อ 2: กด +1 สองครั้ง ต้องได้ "Count: 2"
// แนวทาง: เก็บปุ่มไว้ในตัวแปร แล้ว await plus.click() สองบรรทัด
// ------------------------------------------------
test.fixme("กด +1 สองครั้งต้องได้ Count: 2", async ({ page }) => {});
// 👉 เขียน test ของข้อ 2 ตรงนี้


// ------------------------------------------------
// ข้อ 3: กด +1 หนึ่งครั้ง แล้วกด "รีเซ็ต" ต้องกลับเป็น "Count: 0"
// ------------------------------------------------
test.fixme("กดรีเซ็ตต้องกลับเป็น Count: 0", async ({ page }) => {});
// 👉 เขียน test ของข้อ 3 ตรงนี้
