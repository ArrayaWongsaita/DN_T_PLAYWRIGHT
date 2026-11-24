import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/05-fill-form");
});

test("กรอกชื่อแล้วกด ทักทาย ต้องเห็นคำทักทาย", async ({ page }) => {
  await page.getByLabel("ชื่อ").fill("สมชาย");
  await page.getByRole("button", { name: "ทักทาย" }).click();
  await expect(page.getByText("สวัสดี, สมชาย")).toBeVisible();
});

test("กด Enter ก็ส่งฟอร์มได้", async ({ page }) => {
  await page.getByLabel("ชื่อ").fill("สมหญิง");
  await page.getByLabel("ชื่อ").press("Enter");
  await expect(page.getByText("สวัสดี, สมหญิง")).toBeVisible();
});

test("ล้างช่องแล้วกด ทักทาย ต้องเห็นข้อความเตือน", async ({ page }) => {
  const name = page.getByLabel("ชื่อ");
  await name.fill("สมชาย");
  await name.clear();
  await page.getByRole("button", { name: "ทักทาย" }).click();
  await expect(page.getByText("กรุณากรอกชื่อ")).toBeVisible();
});
