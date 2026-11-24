import { test, expect } from "@playwright/test";

test.describe("หน้าร้านค้า", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/shop");
  });

  test("ต้องมีสินค้า 4 อย่าง", async ({ page }) => {
    await expect(page.getByRole("article")).toHaveCount(4);
  });

  test("เพิ่มชาแล้วลิงก์ตะกร้าต้องเป็น (1)", async ({ page }) => {
    await page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click();
    await expect(page.getByRole("link", { name: "ตะกร้า (1)" })).toBeVisible();
  });

  test("เพิ่มสินค้าสองอย่าง ตะกร้ารวม ฿130", async ({ page }) => {
    await test.step("เพิ่มชา", async () => {
      await page.getByRole("button", { name: "เพิ่ม ชา ลงตะกร้า" }).click();
    });
    await test.step("เพิ่มกาแฟ", async () => {
      await page.getByRole("button", { name: "เพิ่ม กาแฟ ลงตะกร้า" }).click();
    });
    await test.step("เปิดตะกร้าและตรวจยอดรวม", async () => {
      await page.getByRole("link", { name: /^ตะกร้า/ }).click();
      await expect(page.getByText("รวม ฿130")).toBeVisible();
    });
  });
});
