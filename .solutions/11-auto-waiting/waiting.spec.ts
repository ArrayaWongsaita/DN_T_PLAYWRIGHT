import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/lessons/11-auto-waiting");
});

test("ข้อความต้องมาหลังโหลดเสร็จ โดยไม่ต้อง sleep", async ({ page }) => {
  // API ตอบช้า 1.5 วินาที แต่ expect รอให้เองสูงสุด 5 วินาที
  await expect(page.getByText("ข้อมูลมาแล้ว")).toBeVisible();
});

test("ข้อความ กำลังโหลด ต้องหายไปเมื่อข้อมูลมา", async ({ page }) => {
  await expect(page.getByText("กำลังโหลด...")).toBeVisible();
  await expect(page.getByText("กำลังโหลด...")).toBeHidden();
  await expect(page.getByText("ข้อมูลมาแล้ว")).toBeVisible();
});
