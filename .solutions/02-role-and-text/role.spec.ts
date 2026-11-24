import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/02-role-and-text");
});

test("หาปุ่ม เพิ่มลงตะกร้า ด้วย role แบบ exact", async ({ page }) => {
  // name: "เพิ่ม" แบบไม่ exact จะเจอ 2 ปุ่ม (เพราะ "เพิ่มลงตะกร้า" ก็มีคำว่า "เพิ่ม")
  await expect(page.getByRole("button", { name: "เพิ่ม" })).toHaveCount(2);
  await expect(page.getByRole("button", { name: "เพิ่ม", exact: true })).toHaveCount(1);
  await expect(page.getByRole("button", { name: "เพิ่มลงตะกร้า" })).toBeVisible();
});

test("หาราคาด้วย getByText", async ({ page }) => {
  await expect(page.getByText("ราคา 250 บาท")).toBeVisible();
});

test("ลิงก์ ดูรายละเอียด ชี้ไปหน้าแรก", async ({ page }) => {
  await expect(page.getByRole("link", { name: "ดูรายละเอียด" })).toHaveAttribute("href", "/");
});
