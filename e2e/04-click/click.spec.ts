import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/04-click");
});

test("เริ่มต้นต้องแสดง Count: 0", async ({ page }) => {
  await expect(page.getByText("Count: 0")).toBeVisible();
});

test("กด +1 สองครั้งต้องได้ Count: 2", async ({ page }) => {
  const plus = page.getByRole("button", { name: "+1" });
  await plus.click();
  await plus.click();
  await expect(page.getByText("Count: 2")).toBeVisible();
});

test("กดรีเซ็ตต้องกลับเป็น Count: 0", async ({ page }) => {
  await page.getByRole("button", { name: "+1" }).click();
  await page.getByRole("button", { name: "รีเซ็ต" }).click();
  await expect(page.getByText("Count: 0")).toBeVisible();
});
