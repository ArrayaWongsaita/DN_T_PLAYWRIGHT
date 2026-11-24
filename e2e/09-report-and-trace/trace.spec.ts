import { test, expect } from "@playwright/test";

test.use({ trace: "on" });

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/09-report-and-trace");
});

test("กด โหลด แล้วต้องเห็น พร้อมแล้ว", async ({ page }) => {
  await page.getByRole("button", { name: "โหลด" }).click();
  await expect(page.getByText("พร้อมแล้ว")).toBeVisible();
});

test("ก่อนกดต้องยังไม่เห็น พร้อมแล้ว", async ({ page }) => {
  await expect(page.getByText("พร้อมแล้ว")).toBeHidden();
});
