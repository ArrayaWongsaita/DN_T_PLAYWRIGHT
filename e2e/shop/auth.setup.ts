import { test as setup, expect } from "@playwright/test";

export const authFile = "playwright/.auth/user.json";

setup("login แล้วเก็บ storageState", async ({ page }) => {
  await page.goto("/shop/login");
  await page.getByLabel("ชื่อผู้ใช้").fill("demo");
  await page.getByLabel("รหัสผ่าน").fill("1234");
  await page.getByRole("button", { name: "เข้าสู่ระบบ" }).click();
  await expect(page).toHaveURL(/\/shop$/);
  await page.context().storageState({ path: authFile });
});
