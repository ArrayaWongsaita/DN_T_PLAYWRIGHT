import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/07-assertions");
});

test("กดปุ่มแล้วรายละเอียดต้องแสดง กดอีกครั้งต้องซ่อน", async ({ page }) => {
  const panel = page.getByText("รายละเอียดสินค้า");
  await expect(panel).toBeHidden();
  await page.getByRole("button", { name: "แสดงรายละเอียด" }).click();
  await expect(panel).toBeVisible();
  await page.getByRole("button", { name: "ซ่อนรายละเอียด" }).click();
  await expect(panel).toBeHidden();
});

test("รายการต้องมี 3 อัน และอันแรกคือ ชา", async ({ page }) => {
  const items = page.getByRole("listitem");
  await expect(items).toHaveCount(3);
  await expect(items.first()).toHaveText("ชา");
});

test("ปุ่ม ซื้อเลย ต้องกดไม่ได้ และปุ่มแสดงรายละเอียดต้องกดได้", async ({ page }) => {
  await expect(page.getByRole("button", { name: "ซื้อเลย" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "แสดงรายละเอียด" })).not.toBeDisabled();
});
