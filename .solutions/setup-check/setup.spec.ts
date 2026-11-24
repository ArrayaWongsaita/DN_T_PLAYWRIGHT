import { test, expect } from "@playwright/test";

test("หน้าแรกเปิดได้", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Playwright + Next.js" })).toBeVisible();
});

test("หน้าแรกมีลิงก์ครบ 18 บท", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link").filter({ hasText: /^\d\d / })).toHaveCount(18);
});
