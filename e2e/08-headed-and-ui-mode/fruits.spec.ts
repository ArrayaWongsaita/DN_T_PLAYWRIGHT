import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/08-headed-and-ui-mode");
});

test("เริ่มต้นมีผลไม้ 3 อย่าง", async ({ page }) => {
  await expect(page.getByRole("listitem")).toHaveCount(3);
});

test("กด เพิ่มผลไม้ แล้วต้องมี ส้ม เป็นอันที่ 4", async ({ page }) => {
  await page.getByRole("button", { name: "เพิ่มผลไม้" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(4);
  await expect(page.getByRole("listitem").last()).toHaveText("ส้ม");
});
