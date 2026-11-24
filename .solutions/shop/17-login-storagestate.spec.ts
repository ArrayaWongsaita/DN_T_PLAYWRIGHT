import { test, expect } from "@playwright/test";

test.describe("ใช้ session ที่ login ไว้แล้ว", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("เข้า checkout ได้เลยโดยไม่ถูกส่งไปหน้า login", async ({ page }) => {
    await page.goto("/shop/checkout");
    await expect(page).toHaveURL(/\/shop\/checkout$/);
    await expect(page.getByRole("heading", { name: "ชำระเงิน" })).toBeVisible();
  });
});

test.describe("ไม่ได้ login", () => {
  test("เข้า checkout ต้องถูกส่งไปหน้า login", async ({ page }) => {
    await page.goto("/shop/checkout");
    await expect(page).toHaveURL(/\/shop\/login/);
  });
});
