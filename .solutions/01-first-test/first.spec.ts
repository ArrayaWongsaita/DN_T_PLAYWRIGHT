import { test, expect } from "@playwright/test";

test("title ของหน้าต้องเป็น Playwright 01 - First Test", async ({ page }) => {
  await page.goto("/lessons/01-first-test");
  await expect(page).toHaveTitle("Playwright 01 - First Test");
});

test("URL ต้องมี 01-first-test", async ({ page }) => {
  await page.goto("/lessons/01-first-test");
  await expect(page).toHaveURL(/01-first-test/);
});

test("ต้องเห็นหัวข้อ สวัสดี Playwright", async ({ page }) => {
  await page.goto("/lessons/01-first-test");
  await expect(page.getByRole("heading", { name: "สวัสดี Playwright" })).toBeVisible();
});
