import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/03-labels-and-placeholders");
});

test("หาช่องอีเมลด้วย getByLabel", async ({ page }) => {
  await page.getByLabel("อีเมล").fill("a@b.com");
  await expect(page.getByLabel("อีเมล")).toHaveValue("a@b.com");
});

test("หาช่องด้วย getByPlaceholder", async ({ page }) => {
  await expect(page.getByPlaceholder("you@example.com")).toBeVisible();
});

test("ปุ่ม ลบ มี 2 ปุ่ม ต้องจำกัดขอบเขตให้เหลือปุ่มเดียว", async ({ page }) => {
  // getByRole("button", { name: "ลบ" }).click() จะ error: strict mode violation (เจอ 2 ปุ่ม)
  await expect(page.getByRole("button", { name: "ลบ" })).toHaveCount(2);
  const banana = page.getByRole("listitem").filter({ hasText: "กล้วย" });
  await banana.getByRole("button", { name: "ลบ" }).click();
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByText("แอปเปิล")).toBeVisible();
});
