import { test, expect } from "@playwright/test";

const api = "**/api/lessons/12-mock-api/products";
const url = "/lessons/13-error-empty-loading";

test("API ล้มเหลว (500) ต้องเห็น เกิดข้อผิดพลาด", async ({ page }) => {
  await page.route(api, (route) => route.fulfill({ status: 500 }));
  await page.goto(url);
  await expect(page.getByText("เกิดข้อผิดพลาด")).toBeVisible();
});

test("API คืนรายการว่าง ต้องเห็น ไม่มีสินค้า", async ({ page }) => {
  await page.route(api, (route) => route.fulfill({ json: [] }));
  await page.goto(url);
  await expect(page.getByText("ไม่มีสินค้า")).toBeVisible();
});

test("ระหว่างรอ API ต้องเห็น กำลังโหลด... แล้วค่อยเห็นสินค้า", async ({ page }) => {
  await page.route(api, async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    await route.fulfill({ json: [{ id: 1, name: "ชา" }] });
  });
  await page.goto(url);
  await expect(page.getByText("กำลังโหลด...")).toBeVisible();
  await expect(page.getByText("ชา")).toBeVisible();
});
