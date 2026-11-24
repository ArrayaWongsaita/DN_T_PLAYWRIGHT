import { test, expect } from "@playwright/test";

test("สมัครสมาชิกสำเร็จ", async ({ page }) => {
  await page.goto("/lessons/10-codegen-and-debug");
  await page.getByLabel("ชื่อ").fill("สมชาย");
  await page.getByLabel("อีเมล").fill("somchai@example.com");
  await page.getByLabel("รับข่าวสาร").check();
  await page.getByRole("button", { name: "สมัคร" }).click();
  await expect(page.getByText("สมัครสำเร็จ")).toBeVisible();
});

test("ไม่กรอกชื่อต้องเห็นข้อความเตือน", async ({ page }) => {
  await page.goto("/lessons/10-codegen-and-debug");
  await page.getByRole("button", { name: "สมัคร" }).click();
  await expect(page.getByText("กรุณากรอกชื่อ")).toBeVisible();
});
