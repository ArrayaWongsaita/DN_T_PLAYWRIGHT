import { test, expect } from "@playwright/test";

const url = "/lessons/12-mock-api";

test("ไม่ mock ต้องเห็นสินค้าจาก API จริง", async ({ page }) => {
  await page.goto(url);
  await expect(page.getByRole("listitem")).toHaveCount(2);
  await expect(page.getByText("กาแฟ")).toBeVisible();
});

test("mock API ให้คืนสินค้า นม ชิ้นเดียว", async ({ page }) => {
  await page.route("**/api/lessons/12-mock-api/products", (route) =>
    route.fulfill({ json: [{ id: 9, name: "นม" }] }),
  );
  await page.goto(url);
  await expect(page.getByRole("listitem")).toHaveCount(1);
  await expect(page.getByText("นม")).toBeVisible();
});

test("หน้าเว็บต้องเรียก API products", async ({ page }) => {
  const request = page.waitForRequest("**/api/lessons/12-mock-api/products");
  await page.goto(url);
  expect((await request).method()).toBe("GET");
});
